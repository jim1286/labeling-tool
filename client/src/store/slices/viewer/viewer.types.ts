export type ViewerState = {
  viewerMergedImage: string;
  hideLabelList: string[];
};

export type ViewerAction = {
  setViewerMergedImage: (viewerImage: string) => void;
  setHideLabelList: (hideLabelList: string[]) => void;
  resetViewerState: () => void;
};

export type ViewerSlice = ViewerState & ViewerAction;
