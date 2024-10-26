export interface TapProps {
  retryTapIfNoChange?: boolean;
  repeat?: number;
  waitToSettleTimeoutMs?: number;
}

export interface PointProps {
  x: number | string;
  y: number | string;
}
