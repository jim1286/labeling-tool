export type SamState = {
  npyRequests: string[];
};

export type SamAction = {
  setNpyRequests: (npyRequests: string[]) => void;
  resetSamState: () => void;
};

export type SamSlice = SamState & SamAction;
