import { PageContainer } from "@/widgets/layout/ui/PageContainer";
import { ProductBrowserComponent } from "@/features/products";
import { APP_ROUTES } from "@/shared/config/app-routes";

export default function CatalogPage() {
  return (
    <PageContainer>
      <section className="xl:h-48 content-center relative">
        <h3 className=" text-center text-5xl font-bold w-fit mx-auto">TITLE</h3>
        <div className="h-1.5 bg-yellow-500 w-24 left-[calc(50%-48px)] absolute bottom-12"></div>
      </section>
      <section>
        <div className="container xl:pt-0 xl:pb-24">
          <ProductBrowserComponent path={APP_ROUTES.IN_STORE} />
        </div>
      </section>
    </PageContainer>
  );
}
