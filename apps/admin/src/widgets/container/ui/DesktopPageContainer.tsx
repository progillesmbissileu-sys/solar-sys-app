'use client';

import { XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cx } from '@/shared/lib/utils';

import { useBreadcrumbs } from '../lib/use-breadcrumbs';
import { useRightPanel } from '../lib/use-right-panel';
import { useRightPanelStore } from '../model/right-panel-store';
import { RightPanelContent } from './RigthPanelComponent';
import { PageContainerProps } from './types';

const RIGHT_PANEL_WIDTH = '24rem';
const TRANSITION_DURATION = 300; // ms

function DesktopPageContainerInner({ children, breadcrumbs, pageHeader }: PageContainerProps) {
  const { setBreadcrumbs } = useBreadcrumbs();
  const { rightPanelOpen, closePanel, panelProps } = useRightPanel();
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
      setIsVisible(false);

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [rightPanelOpen, shouldRender]);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        style={{
          marginRight: isVisible && rightPanelOpen ? (panelProps?.width ?? RIGHT_PANEL_WIDTH) : 0,
        }}
        className={cx(
          'flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out'
        )}
      >
        <header className="flex h-16 items-center justify-end border-b border-dashed px-5">
          {/*{pageHeader?.title && (
            <h1 className="font-semibold text-gray-900 xl:text-xl dark:text-gray-400">
              {pageHeader.title}
            </h1>
          )}*/}
          {pageHeader?.actions && <div className="flex justify-end">{pageHeader.actions}</div>}
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Right Panel with slide animation */}
      <div
        className={cx(
          'absolute right-0 top-0 h-full overflow-hidden border-l bg-white shadow-lg dark:bg-dark',
          'transition-transform duration-300 ease-in-out',
          isVisible && rightPanelOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width: panelProps?.width || RIGHT_PANEL_WIDTH }}
      >
        {shouldRender && (
          <div className="h-full overflow-auto px-3">
            <div className="h-full">
              <header className="flex items-center justify-between border-b border-dashed xl:h-16">
                <h1 className="font-semibold text-gray-900 xl:text-xl dark:text-gray-400">
                  {panelProps?.title || 'Default Title'}
                </h1>
                <button
                  className="rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-dark dark:text-white"
                  onClick={() => closePanel()}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </header>
              <main className="content-center xl:py-[30px]">
                <div className="mx-auto my-auto xl:w-full">
                  <RightPanelContent panelProps={panelProps} />
                </div>
              </main>
            </div>
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
