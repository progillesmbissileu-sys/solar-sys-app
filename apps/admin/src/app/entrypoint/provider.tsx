'use client';

import { SidebarProvider } from '@/shared/ui';
import { PanelRegistryProvider } from '@/widgets/container';
import { Layout } from '@/app/layouts';
import { ThemeProvider } from 'next-themes';
import { productModulePanels } from '@/views/product';

export const rightPanelRegistry = {
  ...productModulePanels,
};

export function AppContextProvider({
  children,
  sidebarCookieState,
}: {
  children: React.ReactNode;
  sidebarCookieState: boolean;
}) {
  return (
    <ThemeProvider defaultTheme="system" disableTransitionOnChange attribute="class">
      <PanelRegistryProvider panels={rightPanelRegistry}>
        <SidebarProvider defaultOpen={sidebarCookieState}>
          <Layout>{children}</Layout>
        </SidebarProvider>
      </PanelRegistryProvider>
    </ThemeProvider>
  );
}
