import { BrushModeEnum, DrawModeEnum, MouseModeEnum, SamModeEnum } from '@/enums';

export type ModeState = {
  brushMode: BrushModeEnum;
  drawMode: DrawModeEnum;
  mouseMode: MouseModeEnum;
  samMode: SamModeEnum;
};

export type ModeAction = {
  setDrawMode: (drawMode: DrawModeEnum) => void;
  setMouseMode: (mouseMode: MouseModeEnum) => void;
  setBrushMode: (brushMode: BrushModeEnum) => void;
  setSamMode: (samMode: SamModeEnum) => void;
  resetModeState: () => void;
};

export type ModeSlice = ModeState & ModeAction;
