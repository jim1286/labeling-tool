import { StateCreator } from 'zustand';
import { BoundStore } from '../boundStoreType';
import { SamSlice, SamState } from './sam.types';

const initialState: SamState = {
  npyRequests: [],
};

export const useSamSlice: StateCreator<BoundStore, [], [], SamSlice> = (set) => ({
  ...initialState,
  setNpyRequests: (npyRequests: string[]) =>
    set({
      npyRequests,
    }),
  resetSamState: () => set(initialState),
});
