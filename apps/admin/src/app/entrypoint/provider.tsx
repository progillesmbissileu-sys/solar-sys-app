'use client';

import { EventProvider } from '@repo/core';
import { ThemeProvider } from 'next-themes';

import { Layout } from '@/app/layouts';
import { SidebarProvider } from '@/shared/ui';
import { marketServiceModulePanels } from '@/views/market-services';
import { productModulePanels } from '@/views/product';
import { PanelRegistryProvider } from '@/widgets/container';

export const rightPanelRegistry = {
  ...productModulePanels,
  ...marketServiceModulePanels,
};

export function AppContextProvider({
  children,
  sidebarCookieState,
}: {
  children: React.ReactNode;
  sidebarCookieState: boolean;
}) {
  return (
    <EventProvider>
      <ThemeProvider defaultTheme="system" disableTransitionOnChange attribute="class">
        <PanelRegistryProvider panels={rightPanelRegistry}>
          <SidebarProvider defaultOpen={sidebarCookieState}>
            <Layout>{children}</Layout>
          </SidebarProvider>
        </PanelRegistryProvider>
      </ThemeProvider>
    </EventProvider>
  );
}
