import { RightPanelState, RightPanelType, useRightPanelStore } from '@/widgets/container';
import { useSidebar } from '@/shared/lib/layout/useSidebar';

export const useRightPanel = () => {
  const open = useRightPanelStore((state) => state.openPanel);
  const close = useRightPanelStore((state) => state.closePanel);
  const sidebar = useSidebar();

  const openPanel = (panelType: RightPanelType, panelProps: RightPanelState['panelProps']) => {
    if (panelType) {
      sidebar.setOpen(false);

      open(panelType, panelProps);
    }
  };

  const closePanel = () => {
    sidebar.setOpen(true);
    close();
  };

  return { openPanel, closePanel };
};
