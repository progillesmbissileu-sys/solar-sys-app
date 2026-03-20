'use client';

import { SidebarProvider } from '@/shared/ui';
import { PanelRegistryProvider } from '@/widgets/container';
import { Layout } from '@/app/layouts';
import { ThemeProvider } from 'next-themes';
import { productModulePanels } from '@/views/product';
import { marketServiceModulePanels } from '@/views/market-services';
import { EventProvider } from '@repo/ui/event-provider';

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
