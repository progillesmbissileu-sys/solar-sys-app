import { create } from 'zustand';

export type RightPanelType = string | null;

export type RightPanelState = {
  open: boolean;
  panelType: RightPanelType;
  panelProps: Record<string, unknown>;
};

export type RightPanelActions = {
  setOpen: (open: boolean) => void;
  setPanelType: (panelType: RightPanelType) => void;
  setPanelProps: (props: Record<string, unknown>) => void;
  togglePanel: () => void;
  openPanel: (panelType?: RightPanelType, props?: Record<string, unknown>) => void;
  closePanel: () => void;
};

export type RightPanelStoreType = RightPanelState & RightPanelActions;

export const useRightPanelStore = create<RightPanelStoreType>()((set) => ({
  open: false,
  panelType: null,
  panelProps: {},
  setOpen: (open) => set({ open }),
  setPanelType: (panelType) => set({ panelType }),
  setPanelProps: (panelProps) => set({ panelProps }),
  togglePanel: () => set((state) => ({ open: !state.open })),
  openPanel: (panelType, props) =>
    set({
      open: true,
      panelType: panelType ?? null,
      panelProps: props ?? {},
    }),
  closePanel: () => set({ open: false, panelType: null, panelProps: {} }),
}));
