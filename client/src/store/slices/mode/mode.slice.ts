import { BrushModeEnum, DrawModeEnum, MouseModeEnum, SamModeEnum } from '@/enums';
import { StateCreator } from 'zustand';
import { ModeSlice, ModeState } from './mode.types';
import { BoundStore } from '../boundStoreType';

const initialState: ModeState = {
  brushMode: BrushModeEnum.PAINT,
  drawMode: DrawModeEnum.NONE,
  mouseMode: MouseModeEnum.DRAW,
  samMode: SamModeEnum.POINT,
};

export const useModeSlice: StateCreator<BoundStore, [], [], ModeSlice> = (set) => ({
  ...initialState,
  setDrawMode: (drawMode: DrawModeEnum) =>
    set({
      drawMode,
    }),
  setMouseMode: (mouseMode: MouseModeEnum) =>
    set({
      mouseMode,
    }),
  setBrushMode: (brushMode: BrushModeEnum) =>
    set({
      brushMode,
    }),
  setSamMode: (samMode: SamModeEnum) =>
    set({
      samMode,
    }),
  resetModeState: () => {
    set(initialState);
  },
});
