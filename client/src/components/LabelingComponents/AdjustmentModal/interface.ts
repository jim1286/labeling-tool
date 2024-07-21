import { ImageColorFilter } from '@/interface';

export interface UseAdjustmentProps {
  open: boolean;
  imageColorFilter: ImageColorFilter;
}

export interface AdjustmentModalProps {
  open: boolean;
  onSubmit: (colorFilter?: ImageColorFilter) => void;
}
