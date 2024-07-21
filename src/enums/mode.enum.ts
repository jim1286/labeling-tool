export enum DrawModeEnum {
  SAM = 'sam',
  BRUSH = 'brush',
  BOX = 'box',
  KEY_POINT = 'key_point',
  NONE = 'none',
}

export enum BrushModeEnum {
  PAINT = 'paint',
  ERASE = 'erase',
}

export enum MouseModeEnum {
  DRAW = 'draw',
  DRAG = 'drag',
}

export enum SamModeEnum {
  POINT = 'point',
  BOX = 'box',
}

export enum LabelingModeEnum {
  NONE = 'none',
  SEGMENTATION = 'segment',
  CLASSIFICATION = 'classify',
  OBJECT_DETECTION = 'detect',
  KEY_POINT = 'keypoint',
}
