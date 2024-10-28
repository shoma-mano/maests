/**
 * Optional properties to customize the behavior of the tap action.
 */
export interface TapProps {
    index?: number;
    retryTapIfNoChange?: boolean;
    repeat?: number;
    waitToSettleTimeoutMs?: number;
}
export interface WaitProps {
    maxWait?: number;
}
export interface PointProps {
    x: number | string;
    y: number | string;
}
