# `apps/admin` — Codebase Weakness Analysis

> **Scope:** `apps/admin` in relation to `packages/`
> **Stack:** Next.js 16 App Router · TanStack Form · Zustand · FSD architecture
> **Date:** 2025

---

## Table of Contents

1. [Critical Bugs](#1-critical-bugs)
2. [Architecture Weaknesses](#2-architecture-weaknesses)
3. [Type Safety Gaps](#3-type-safety-gaps)
4. [Missing & Incomplete Features](#4-missing--incomplete-features)
5. [Code Quality Issues](#5-code-quality-issues)
6. [Missing Infrastructure](#6-missing-infrastructure)
7. [Summary Table](#7-summary-table)

---

## 1. Critical Bugs

### 1.1 `httpOnly` Cookie Blindness in Client Token Helpers

**File:** `src/shared/lib/auth/helpers/client-token.ts`

```ts
export function getClientAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  const name = TOKEN_COOKIE_NAME + '=';
  const decodedCookie = decodeURIComponent(document.cookie); // always empty for httpOnly
  // ...
}
```

The server-side code in `server-token.ts` sets both the access token and refresh token with `httpOnly: true`. By browser specification, `httpOnly` cookies are **completely invisible** to `document.cookie`. This means `getClientAccessToken()` and `getClientRefreshToken()` **always return `null`** — permanently and silently. Any client-side feature that relies on them fails without any error.

**Fix:** Remove the client-token helpers entirely, or redesign the auth flow so that a non-`httpOnly` value (e.g. a boolean "is-authenticated" flag) is used for client-side checks while the actual token stays server-only.

---

### 1.2 Delete Confirmation Modal — Inverted Success Logic

**File:** `src/views/market-services/ui/MarketServiceDetailsView.tsx`

```tsx
const handleDelete = React.useCallback(async () => {
  const result = await deleteServiceAction(service.id);
  setIsModalOpen(result.success); // BUG: should be !result.success or navigate away
}, [service.id, setIsModalOpen]);
```

When deletion **succeeds** (`result.success === true`), `setIsModalOpen(true)` keeps the confirmation modal open indefinitely. When deletion **fails** (`result.success === false`), the modal closes silently. The logic is completely inverted.

**Fix:** On success, close the modal and navigate back to the list. On failure, keep the modal open and surface an error message.

---

### 1.3 `redirect()` Called Inside a Client-Side `useEffect`

**File:** `app/(auth)/logout/page.tsx`

```tsx
export default function Page() {
  useEffect(() => {
    (async () => {
      // ...
      // if (canRedirect) {  ← guard was commented out
      redirect(routePaths.LOGIN); // ← server-only function used in client useEffect
      // }
    })();
  }, []);
}
```

`redirect` from `next/navigation` is designed exclusively for **Server Components and Server Actions** — it throws a special `NEXT_REDIRECT` error that the Next.js runtime catches at the server boundary. Inside a client-side `useEffect`, it throws an uncaught exception. Additionally, the `canRedirect` guard that previously conditioned the redirect on a successful API call is commented out, so the page always redirects unconditionally, even if the logout API call failed.

**Fix:** Replace `redirect` with `useRouter().replace(routePaths.LOGIN)` from the client-side router, and restore the `canRedirect` guard.

---

### 1.4 `imageIds` Passed as `[null]` on Single-Image Product Creation

**File:** `src/features/products/lib/create-product-action.ts`

```ts
const _payload: CreateProductPayload = {
  mainImageId: uploadedPictures[0]?.id as string,
  imageIds: uploadedPictures.length > 1 ? uploadedPictures.slice(1).map((p) => p?.id) : [null], // ← sends [null] to the API when only one image exists
};
```

When only one image is uploaded, the `imageIds` field is explicitly set to `[null]` instead of an empty array or `undefined`. This sends a null entry inside an array to an API that almost certainly expects an array of valid UUID strings, which will likely cause a backend validation error or persist corrupted data.

**Fix:** Replace `[null]` with `[]` or `undefined`.

---

### 1.5 Hardcoded `12` in Grouped Table Count Badge

**File:** `src/shared/ui/organisms/app-table/AppTable.tsx`

```tsx
{
  group.count && (
    <div className="h-6 w-6 content-center rounded-full border ...">
      {12} {/* ← literal number, not group.count */}
    </div>
  );
}
```

The grouped table row conditionally renders a count badge when `group.count` is truthy, but the badge always displays the hardcoded literal `12` instead of the actual `group.count` value. This feature has never worked correctly.

**Fix:** Replace `{12}` with `{group.count}`.

---

## 2. Architecture Weaknesses

### 2.1 Feature-Sliced Design (FSD) Layer Violations

The project declares FSD but breaks its own layering rules in several places:

**`app/(global)/layout.tsx` calls the API layer directly:**

```tsx
// Routing layer reaching into shared/api — should be in a middleware or auth guard
const response = await callAction('/api/me', 'GET')();
if (!response.success && [401, 403].includes(response.error.status)) {
  redirect('/logout');
}
```

Business logic (session verification) belongs in `shared/lib/auth` or a Next.js middleware file, not inside a layout component.

**`ProductDetailsView.tsx` (views layer) reaches into `shared/api`:**

```tsx
import { deleteImageMediaAction, uploadImageAction } from '@/shared/api';
```

Image operations for a product belong in the `features/products` layer. The view should call a feature-level action, not the shared API layer directly.

**`views/auth/api/actions.ts` handles token storage:**
The login server action is placed in the `views` layer but performs auth token persistence (`setAuthTokens`) — a concern that belongs in `shared/lib/auth`.

---

### 2.2 Two Conflicting URL Path Template Formats

**Route paths** use the `:param` colon format:

```ts
// src/shared/routes/index.ts
PRODUCTS_OVERVIEW: '/products/:id',
MARKET_SERVICES_DETAILS: '/market-services/:id',
```

**API path helpers** use the `{param}` brace format:

```ts
// src/entities/product/api/product.ts
export const getProduct = callActionWithId<...>('/api/product/{id}', 'get');
```

Two completely separate template-replacement utilities run in parallel (`buildRoute` handles `:id`, `callActionWithId` handles `{id}`). Any developer must memorize which format belongs to which system. Mixing them up causes silent failures — the placeholder stays unreplaced in the final URL, and the request is made to a wrong endpoint without any compile-time or runtime error.

---

### 2.3 Three Competing Sidebar State Management Systems

Three independent mechanisms manage sidebar state simultaneously, only one of which is actually wired to the UI:

| #   | Location                                              | Mechanism                                  | Actually Used? |
| --- | ----------------------------------------------------- | ------------------------------------------ | -------------- |
| 1   | `src/app/layouts/lib/layout-store.ts`                 | Zustand + `localStorage` persist           | ❌ No          |
| 2   | `src/app/layouts/api/local-storage/index.ts`          | Manual `localStorage` read/write           | ❌ No          |
| 3   | `src/shared/ui/molecules/sidebar/SidebarProvider.tsx` | Cookie state from server (`sidebar:state`) | ✅ Yes         |

Systems #1 and #2 are dead code that will mislead any developer trying to understand or modify sidebar behaviour.

---

### 2.4 `@repo/core` Shared Package Is Hollow and Miscategorised

**File:** `packages/ui/package.json`, `apps/admin/package.json`

The `packages/ui` shared package contains only 5 files: `button.tsx`, `card.tsx`, `code.tsx`, `event-provider.tsx`, and `use-events.ts`. The `Button` and `Card` components it exports are **never imported by `apps/admin`** — the admin has its own parallel component library in `src/shared/ui/atoms/` which is entirely self-contained and makes no use of the monorepo package.

The only files from `@repo/core` actually consumed by the admin are `event-provider.tsx` and `use-events.ts` (the Sonner toast wrapper). Despite these being used in production runtime code inside `AppContextProvider`, `@repo/core` is listed as a **`devDependency`** in `apps/admin/package.json`:

```json
"devDependencies": {
  "@repo/core": "workspace:*",  // ← used in production code, should be in "dependencies"
}
```

This miscategorisation can cause the package to be excluded in certain production build or deployment configurations.

---

### 2.5 Right Panel State Persists Across Page Navigation

**File:** `src/widgets/container/model/right-panel-store.ts`

`useRightPanelStore` is a Zustand module-level singleton with no reset on navigation. If a user opens the `PRODUCT_FORM` panel on the Products page and then navigates to the Market Services page, the store still holds `{ open: true, panelType: 'PRODUCT_FORM' }`. The Market Services page renders `DesktopPageContainer`, which reads that state and attempts to display a product form inside the market services layout.

**Fix:** Call `closePanel()` in a navigation event or in the `useEffect` cleanup of `DesktopPageContainer`.

---

### 2.6 Login Validation Schema Is Duplicated

The same Zod schema is defined twice in the auth flow:

```ts
// src/views/auth/api/actions.ts (server action)
const loginSchema = z.object({ email: z.email(), password: z.string().min(6) });

// src/views/auth/config/shared.ts (form options)
export const formOpts = formOptions({
  validators: {
    onSubmit: z.object({ email: z.email(), password: z.string().min(6) }),
  },
});
```

If the validation rules need to change (e.g. minimum password length), they must be updated in two places. These should reference a single shared schema definition.

---

## 3. Type Safety Gaps

### 3.1 `any` Types in Core Domain Models

Date fields on the two primary entities are typed as `any`, bypassing type checking for a field that is read and rendered throughout the UI:

```ts
// src/entities/product/model/product.ts
export type Product = {
  createdAt?: any; // should be Date | string
  updatedAt?: any; // should be Date | string
};

// src/entities/product/model/product-package.ts
export type ProductPackage = {
  createdAt?: any;
  updatedAt?: any;
};
```

---

### 3.2 Pervasive `any` in the Form System

The form organism layer is filled with `any`, eliminating any type-checking benefit for the most complex part of the UI:

```ts
// src/shared/ui/organisms/form/types.ts
export interface BuilderInputProps {
  defaultValue?: any;
  defaultChecked?: any;
  validator?: any;
  onChange?: any;
}
```

```tsx
// src/shared/ui/organisms/form/withFieldContext.tsx
onChange={(value: any) => {
  field.handleChange(value);
}}
// error rendering:
field.state.meta.errors.map((err: any) => err?.message)
```

---

### 3.3 Type-Unsafe Panel Props Contract

```tsx
// src/widgets/container/model/panel-registry.tsx
export type PanelComponentProps = {
  panelProps: Record<string, unknown>; // all type info is erased here
};

// src/views/product/ui/panels/ProductFormPanel.tsx
export function ProductFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as ProductFormPanelProps; // cast 1
  return <ProductForm initialValues={initialValues as any} />; // cast 2
}
```

The entire right-panel system has no type safety. Any component can be opened with any props, and TypeScript will not catch mismatches. Passing wrong data to a panel fails silently at runtime.

---

### 3.4 `MarketService.images` Typed but Never Populated

```ts
// src/entities/market-service/model/market-service.ts
export interface MarketService {
  images: Array<string>; // ← field exists in type but is never used in any view
}
```

The `images` field on `MarketService` is part of the type contract but is never rendered or managed anywhere in the UI. It is likely either dead type weight from the API schema, or a planned gallery feature that was never completed.

---

### 3.5 `callActionSafe` Default `any` Type Parameter

```ts
// src/shared/api/client/helpers.ts
export function callActionSafe<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
  TData extends object = any,  // ← default any defeats type inference
>(...)
```

The default `any` on `TData` means callers who do not explicitly annotate the payload type get no type checking on what they send to the API.

---

## 4. Missing & Incomplete Features

### 4.1 No i18n Library — Translation Keys Render as Literal Strings

The entire UI is built using i18n keys as string literals:

```tsx
// src/views/auth/ui/LoginView.tsx
<h1 className="text-3xl font-bold ...">login.pageTitle</h1>
<FormField.Email placeholder="common.emailAddress" ... />
<span>login.rememberMe</span>
<FormComponent.SubmitButton label="action.submit" ... />
```

```tsx
// src/views/market-services/ui/MarketServiceListView.tsx
title: 'marketService.pageTitle',
title: 'common.designation',
title: 'common.shortDescription',
```

There is **no i18n library installed** (`next-intl`, `react-i18next`, `i18next` are all absent from `package.json`). Every key in the UI renders as a raw string. This affects labels, page titles, table column headers, placeholders, and button text throughout the entire application.

---

### 4.2 Dashboard Page Is an Empty Stub

```tsx
// app/(global)/dashboard/page.tsx
export default async function Page() {
  return <div>DASHBOARD</div>;
}
```

The primary landing page of the admin panel after login has no content. The `DashboardView` component that exists under `src/views/dashboard/ui/DashboardView.tsx` is never imported or rendered.

---

### 4.3 Multiple Dead Routes Defined but Not Implemented

The following routes are declared in `src/shared/routes/index.ts` but have no corresponding page files in the `app/` directory:

| Route Key           | Path                  | Status     |
| ------------------- | --------------------- | ---------- |
| `REGISTER`          | `/register`           | ❌ No page |
| `FORGOT_PASSWORD`   | `/forgot-password`    | ❌ No page |
| `PRODUCTS_EDIT`     | `/products/:id/edit`  | ❌ No page |
| `USERS`             | `/users`              | ❌ No page |
| `USERS_ADD`         | `/users/add`          | ❌ No page |
| `USERS_VIEW`        | `/users/view/:id`     | ❌ No page |
| `USERS_PROFILE`     | `/users/profile`      | ❌ No page |
| `USERS_SETTINGS`    | `/users/settings`     | ❌ No page |
| `USERS_PERMISSIONS` | `/users/permissions`  | ❌ No page |
| `LOCATIONS_ADD`     | `/locations/add`      | ❌ No page |
| `LOCATIONS_VIEW`    | `/locations/view/:id` | ❌ No page |

Navigating to any of these routes returns a 404. The entire **Users** module is absent.

---

### 4.4 `refreshPageCache` Always Invalidates the Wrong Path

**File:** `src/shared/lib/cache/refresh-page-cache.ts`

```ts
export async function refreshPageCache() {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/'; // fallback is always used
  revalidatePath(pathname);
}
```

This utility relies on a custom `x-current-path` HTTP header that **no middleware in the project sets**. The header is always absent, so `pathname` is always `'/'`, and `revalidatePath('/')` invalidates the root layout instead of the current page. The function never performs its intended purpose.

---

### 4.5 `NEXT_PUBLIC_COOKIE_MAX_AGE` Validated but Never Applied

**File:** `src/shared/config/env.ts`, `src/shared/lib/auth/helpers/server-token.ts`

`NEXT_PUBLIC_COOKIE_MAX_AGE` is parsed from the environment and validated at startup, but the cookie-setting functions never use it:

```ts
// server-token.ts — maxAge is never passed
cookieStore.set(TOKEN_COOKIE_NAME, token, {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  // maxAge is missing — sessions rely on browser session lifetime only
});
```

Auth cookies have no expiry, so they persist indefinitely until the browser session ends (or until a new login overwrites them). The configured `NEXT_PUBLIC_COOKIE_MAX_AGE` value is completely ignored.

---

## 5. Code Quality Issues

### 5.1 `console.log` Statements Left in Production Code

Multiple debugging statements were never removed:

| File                                                    | Statement                                                |
| ------------------------------------------------------- | -------------------------------------------------------- |
| `src/shared/ui/organisms/form/FormWrapper.tsx`          | `console.log('SUBMITTED', { value })`                    |
| `src/shared/ui/organisms/form/FormWrapper.tsx`          | `console.log({ evt })`                                   |
| `src/shared/ui/molecules/inputs/SearchInput.tsx`        | `console.log({ option })` in `handleSelect`              |
| `src/features/market-services/ui/MarketServiceForm.tsx` | `onError={(error) => console.log('FORM_ERRORS', error)}` |
| `app/(auth)/logout/page.tsx`                            | `console.log(response)`                                  |

The `MarketServiceForm` case is particularly poor: the `onError` callback does nothing but log, meaning form submission errors are invisible to the user.

---

### 5.2 Undeclared `lodash` Dependency

**File:** `src/views/market-services/ui/MarketServiceListView.tsx`

```ts
import _ from 'lodash';
// used as: _.truncate(record.shortDescription, { length: 50 })
```

`lodash` is imported and used but is **not listed** in `apps/admin/package.json`. It resolves only because it happens to be a transitive dependency of something else in the tree. This is fragile: any change to the dependency tree can silently break this import, and `pnpm`'s strict mode would already flag it as an invalid import.

**Fix:** Add `lodash` and `@types/lodash` to `dependencies`, or replace the single `_.truncate` call with a native alternative to avoid adding a heavy dependency for one utility call.

---

### 5.3 Spurious Unused Imports

```ts
// src/views/product/ui/ProductDetailsView.tsx
import { set } from 'zod'; // never used

// src/shared/ui/molecules/inputs/SearchInput.tsx
import { se } from 'date-fns/locale'; // never used — 'se' is the Swedish locale

// src/views/product/ui/ProductCollectionView.tsx
import { CollectionResponseType, Result } from '@/shared/api'; // Result unused
```

These are indicators that the code has not been through a systematic cleanup.

---

### 5.4 HTTP Method Casing Is Inconsistent

```ts
// src/entities/product/api/product.ts — lowercase
export const productCollection = callActionSafe<...>('/api/product', 'get');

// src/entities/market-service/api/index.ts — uppercase
export const marketServiceCollection = callActionSafe<...>('/api/market-services', 'GET');
```

Axios normalises the method internally, so this does not cause runtime failures, but the inconsistency across the codebase signals a lack of a coding standard. All methods should follow a single convention.

---

### 5.5 `module.exports` in an ESM Project

**File:** `apps/admin/next.config.ts`

```ts
module.exports = nextConfig; // CommonJS export
```

`apps/admin/package.json` declares `"type": "module"`, which makes all `.ts`/`.js` files ESM by default. Using `module.exports` is a CommonJS pattern that conflicts with this. The config file should use:

```ts
export default nextConfig;
```

---

### 5.6 Commented-Out Code Left in Production Files

Multiple blocks of commented-out code were left in shipped files, creating noise and ambiguity about whether the code is intended to return:

```tsx
// src/widgets/container/ui/DesktopPageContainer.tsx
{
  /*{pageHeader?.title && (
  <h1 className="font-semibold text-gray-900 xl:text-xl dark:text-gray-400">
    {pageHeader.title}
  </h1>
)}*/
}
```

```tsx
// src/views/auth/ui/LoginView.tsx
{
  /*<div className="pl-7">*/
}
{
  /*  <p className="text-center text-sm text-gray-400 dark:text-gray-600">*/
}
{
  /*    <a href="#" className="underline underline-offset-[3px]">*/
}
{
  /*      login.forgotPassword*/
}
{
  /*    </a>*/
}
{
  /*  </p>*/
}
{
  /*</div>*/
}
```

```ts
// app/(auth)/logout/page.tsx
// if (canRedirect) {
redirect(routePaths.LOGIN);
// }
```

---

### 5.7 Weak Environment Variable Validation

**File:** `src/shared/config/env.ts`

```ts
Object.entries(envSchema).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing env variable: ${key}`);
});
```

- The check uses a **falsy guard**, which means a value of `0` (e.g. a zero cookie max age) would incorrectly throw.
- There is no **URL format validation** for `NEXT_PUBLIC_API_ENDPOINT` or `NEXT_PUBLIC_APP_URL`. A typo in these values will only fail at the first HTTP request, not at startup.
- There is no schema library (e.g. Zod) providing structured, descriptive validation errors.

---

## 6. Missing Infrastructure

### 6.1 Zero Test Coverage

There are **no test files** anywhere in the project. Running `find . -name "*.test.*" -o -name "*.spec.*"` returns nothing. The `agents/` directory at the root of the app is completely empty — it was likely intended for Playwright E2E test agents or similar.

The only quality gate in the project is `tsc --noEmit` (`check-types` script), which only catches type errors and does nothing to verify runtime behaviour. There are no:

- Unit tests for utility functions (e.g. `buildRoute`, `CollectionHelpers`, `calculateRetryDelay`)
- Integration tests for server actions
- E2E tests for any user flow

---

### 6.2 `app/error.tsx` — Error Recovery Action Not Wired

**File:** `app/error.tsx`

```tsx
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // ← received but never called anywhere
}

export default function Error({ error }: ErrorProps) {
  // ...
  return (
    <div>
      {/* ... error display ... */}
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/dashboard">Go to Home</Link> {/* only escape route */}
        </Button>
        {/* no "Try Again" button that calls reset() */}
      </div>
    </div>
  );
}
```

Next.js provides the `reset` callback specifically to re-render the failed component subtree in-place. It is accepted as a prop but never used. The only recovery option is navigating away entirely, which loses all UI state.

---

### 6.3 `src/shared/constant/` Is Empty

```
src/shared/constant/
  └── .gitkeep
```

The `constant` directory in the shared layer exists only as a placeholder. Any constants that should live here (magic numbers, enum-like values, API endpoint segments) are instead scattered across individual feature and entity files or inlined directly.

---

### 6.4 `agents/` Directory Is Completely Empty

```
apps/admin/agents/   ← empty
```

This directory has no files. Its intent is unclear and it adds confusion to the project structure.

---

## 7. Summary Table

| #   | Weakness                                                                        |  Severity   | Primary Impact                            |
| --- | ------------------------------------------------------------------------------- | :---------: | ----------------------------------------- |
| 1.1 | `httpOnly` client cookie reading always returns `null`                          | 🔴 Critical | Auth client flows silently broken         |
| 1.2 | Delete modal success/failure logic inverted                                     | 🔴 Critical | Modal never closes after success          |
| 1.3 | `redirect()` used inside client `useEffect` (logout)                            | 🔴 Critical | Logout throws uncaught exception          |
| 1.4 | `imageIds: [null]` sent to API on single image upload                           | 🔴 Critical | API receives invalid payload              |
| 1.5 | Grouped table always shows hardcoded `12`                                       | 🔴 Critical | Feature never worked correctly            |
| 2.1 | FSD layer violations (layout, views, actions)                                   |   🟠 High   | Coupling, maintainability                 |
| 2.2 | Two conflicting URL template formats (`:id` vs `{id}`)                          |   🟠 High   | Silent routing bugs                       |
| 2.3 | Three competing sidebar state systems                                           |   🟠 High   | Unpredictable UI state                    |
| 2.4 | `@repo/core` hollow & listed as `devDependency`                                 |   🟠 High   | Monorepo value nullified; prod build risk |
| 2.5 | Right panel state persists across navigation                                    |   🟠 High   | Stale panel content on navigation         |
| 2.6 | Login validation schema duplicated                                              |  🟡 Medium  | Divergence risk on rule changes           |
| 3.1 | `any` on `createdAt`/`updatedAt` in domain models                               |  🟡 Medium  | Type safety undermined                    |
| 3.2 | Pervasive `any` in form system                                                  |  🟡 Medium  | Form type safety eliminated               |
| 3.3 | Type-unsafe panel props (`Record<string, unknown>` + double cast)               |  🟡 Medium  | Silent prop mismatches                    |
| 3.4 | `MarketService.images` typed but never populated                                |  🟡 Medium  | Dead type weight / unfinished feature     |
| 3.5 | `callActionSafe` defaults `TData` to `any`                                      |  🟡 Medium  | Payload type inference lost               |
| 4.1 | No i18n library — all keys render as literal strings                            |  🟡 Medium  | Broken UI text across entire app          |
| 4.2 | Dashboard page is `<div>DASHBOARD</div>`                                        |  🟡 Medium  | Core feature unimplemented                |
| 4.3 | 11 dead routes declared with no pages                                           |  🟡 Medium  | Dead code, 404s                           |
| 4.4 | `refreshPageCache` always revalidates `/`                                       |  🟡 Medium  | Cache invalidation never works            |
| 4.5 | `NEXT_PUBLIC_COOKIE_MAX_AGE` validated but never applied                        |  🟡 Medium  | Sessions have no expiry                   |
| 5.1 | `console.log` left in `FormWrapper`, `SearchInput`, `MarketServiceForm`, logout |  🟡 Medium  | Info leakage, silent error swallowing     |
| 5.2 | `lodash` used but not declared in `package.json`                                |  🟡 Medium  | Fragile implicit dependency               |
| 5.3 | Unused imports in `ProductDetailsView`, `SearchInput`, `ProductCollectionView`  |   🟢 Low    | Code hygiene                              |
| 5.4 | HTTP method casing inconsistent (`'get'` vs `'GET'`)                            |   🟢 Low    | Inconsistent convention                   |
| 5.5 | `module.exports` in ESM project (`next.config.ts`)                              |   🟢 Low    | Build fragility                           |
| 5.6 | Commented-out code in multiple shipped files                                    |   🟢 Low    | Readability, ambiguity                    |
| 5.7 | Weak env var validation (falsy check, no URL format check)                      |   🟢 Low    | Late-failing misconfiguration             |
| 6.1 | Zero test coverage                                                              |   🟢 Low    | No regression safety net                  |
| 6.2 | `error.tsx` `reset` callback never wired to a button                            |   🟢 Low    | Poor error recovery UX                    |
| 6.3 | `src/shared/constant/` is empty                                                 |   🟢 Low    | Misleading project structure              |
| 6.4 | `agents/` directory is completely empty                                         |   🟢 Low    | Misleading project structure              |

---

_Generated by static analysis of `apps/admin` and `packages/`._
