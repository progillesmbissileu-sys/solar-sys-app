'use client';

import { useEffect, useState, useRef } from 'react';
import { useBreadcrumbs } from '../lib/use-breadcrumbs';
import { PageContainerProps } from './types';
import { useRightPanelStore } from '../model/right-panel-store';
import { usePanelComponent } from '../model/panel-registry';
import { cx } from '@/shared/lib/utils';

const RIGHT_PANEL_WIDTH = '24rem';
const TRANSITION_DURATION = 300; // ms

function RightPanelContent() {
  const panelType = useRightPanelStore((state) => state.panelType);
  const panelProps = useRightPanelStore((state) => state.panelProps);
  const PanelComponent = usePanelComponent(panelType);

  if (!PanelComponent) {
    return null;
  }

  return <PanelComponent panelProps={panelProps} />;
}

function DesktopPageContainerInner({ children, breadcrumbs, pageHeader }: PageContainerProps) {
  const { setBreadcrumbs } = useBreadcrumbs();
  const rightPanelOpen = useRightPanelStore((state) => state.open);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (breadcrumbs) {
      setBreadcrumbs('page-header', breadcrumbs);
    }
  }, [breadcrumbs, setBreadcrumbs]);

  // Handle open/close animations
  useEffect(() => {
    if (rightPanelOpen) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      // Start opening: render first, then animate
      setShouldRender(true);
      // Use requestAnimationFrame to ensure the initial state is rendered before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else if (shouldRender) {
      // Start closing: animate out first
      setIsVisible(false);
      // Then unrender after animation completes
      closeTimeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        closeTimeoutRef.current = null;
      }, TRANSITION_DURATION);
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [rightPanelOpen, shouldRender]);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={cx(
          'flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out',
          isVisible && 'mr-[24rem]'
        )}
      >
        <header className="flex flex-col justify-between border-b px-5 pb-3 pt-5 xl:min-h-52">
          {pageHeader?.title && (
            <h1 className="font-semibold text-dark/60 xl:text-2xl">{pageHeader.title}</h1>
          )}
          <div></div>
          {pageHeader?.actions && <div className="flex justify-end">{pageHeader.actions}</div>}
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Right Panel with slide animation */}
      <div
        className={cx(
          'absolute right-0 top-0 h-full overflow-hidden border-l bg-white shadow-lg dark:bg-dark',
          'transition-transform duration-300 ease-in-out',
          isVisible ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width: RIGHT_PANEL_WIDTH }}
      >
        {shouldRender && (
          <div className="h-full overflow-auto p-4">
            <RightPanelContent />
          </div>
        )}
      </div>
    </div>
  );
}

export function DesktopPageContainer(props: PageContainerProps) {
  const { rightPanel } = props;
  const openPanel = useRightPanelStore((state) => state.openPanel);
  const setOpen = useRightPanelStore((state) => state.setOpen);

  // Initialize the right panel state based on props
  useEffect(() => {
    if (rightPanel) {
      if (rightPanel.open !== undefined) {
        setOpen(rightPanel.open);
      }
      if (rightPanel.panelType) {
        openPanel(rightPanel.panelType, rightPanel.panelProps);
      }
    }
  }, [rightPanel, openPanel, setOpen]);

  // Handle external onOpenChange callback
  useEffect(() => {
    if (rightPanel?.onOpenChange) {
      const unsubscribe = useRightPanelStore.subscribe((state, prevState) => {
        if (state.open !== prevState.open) {
          rightPanel.onOpenChange?.(state.open);
        }
      });
      return unsubscribe;
    }
  }, [rightPanel?.onOpenChange]);

  return <DesktopPageContainerInner {...props} />;
}
