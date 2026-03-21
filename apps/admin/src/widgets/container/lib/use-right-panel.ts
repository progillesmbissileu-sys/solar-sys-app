import { useEffect, useState } from 'react';

import { useSidebar } from '@/shared/lib';
import { RightPanelState, RightPanelType, useRightPanelStore } from '@/widgets/container';

export const useRightPanel = () => {
  const sidebar = useSidebar();
  const open = useRightPanelStore((state) => state.openPanel);
  const close = useRightPanelStore((state) => state.closePanel);
  const rightPanelOpen = useRightPanelStore((state) => state.open);
  const panelProps = useRightPanelStore((state) => state.panelProps);
  const [panel, setPanel] = useState<{
    type: RightPanelType;
    props: RightPanelState['panelProps'];
  } | null>(null);

  const openPanel = (panelType: RightPanelType, panelProps: RightPanelState['panelProps']) => {
    setPanel({ type: panelType, props: panelProps });
  };

  const closePanel = () => {
    sidebar.setOpen(true);
    close();
  };

  useEffect(() => {
    if (panel?.type) {
      sidebar.setOpen(false);
      open(panel.type, panel.props);
    }

    return () => {
      close();
    };
  }, [panel]);

  return { openPanel, closePanel, rightPanelOpen, panelProps };
};
