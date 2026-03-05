'use client';

import { productModulePanels } from '@/modules/product/config/module';
import { SidebarProvider } from '@/shared/ui';
import { PanelRegistryProvider } from '@/widgets/container';
import { ThemeProvider } from 'next-themes';
import { Layout } from '../components/layouts';

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
