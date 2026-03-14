import { usePanelComponent } from '../model/panel-registry';
import { useRightPanelStore } from '../model/right-panel-store';

export function RightPanelContent({ panelProps }: { panelProps?: any }) {
  const panelType = useRightPanelStore((state) => state.panelType);
  const PanelComponent = usePanelComponent(panelType);

  if (!PanelComponent) {
    return null;
  }

  return <PanelComponent panelProps={panelProps} />;
}
