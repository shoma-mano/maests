import { TapProps, PointProps, WaitProps } from "./command-props";
export declare let out: string;
export declare const resetOut: () => void;
type WaitAndTapProps = TapProps & WaitProps;
export declare const MaestroTranslators: {
    initFlow: ({ appId, onFlowStart }?: {
        appId?: string;
        onFlowStart?: () => void;
    }) => void;
    launchApp: ({ appId }?: {
        appId?: string;
    }) => void;
    clearState: ({ appId }?: {
        appId?: string;
    }) => void;
    runScript: ({ path }: {
        path: string;
    }) => void;
    clearKeychain: () => void;
    tapOn: (id: string, props?: TapProps) => void;
    tapOnText: (text: string, props?: TapProps) => void;
    tapOnPoint: (point: PointProps, props?: TapProps) => void;
    waitForAndTapOn: (id: string, props?: WaitAndTapProps) => void;
    longPressOn: (id: string) => void;
    longPressOnPoint: ({ x, y }: PointProps) => void;
    longPressOnText: (text: string) => void;
    swipeLeft: () => void;
    swipeRight: () => void;
    swipeDown: () => void;
    swipeUp: () => void;
    swipe: (start: PointProps, end: PointProps) => void;
    inputText: (text: string, id?: string) => void;
    inputRandomName: (id?: string) => void;
    inputRandomNumber: (id?: string) => void;
    copyTextFrom: (id: string) => void;
    inputRandomEmail: (id?: string) => void;
    inputRandomText: (id?: string) => void;
    eraseText: (chars: number, id?: string) => void;
    openLink: (url: string) => void;
    navigate: (path: string) => void;
    assertVisible: (id: string, enabled?: boolean) => void;
    assertNotVisible: (id: string) => void;
    scroll: () => void;
    scrollUntilVisible: (id: string) => void;
    waitForAnimationEnd: (maxWait?: number) => void;
    waitUntilVisible: (id: string, maxWait: number) => void;
    waitUntilNotVisible: (id: string, maxWait: number) => void;
    wait: (ms: number) => void;
    hideKeyboard: () => void;
    screenshot: (fileName: string) => void;
    pressEnter: () => void;
    pressHomeButton: () => void;
    pressLockButton: () => void;
    back: () => void;
    volumeDown: () => void;
    volumeUp: () => void;
    stopApp: ({ appId }?: {
        appId?: string;
    }) => void;
    repeat: (times: number, func: () => void) => void;
    repeatWhileVisible: (id: string, func: () => void) => void;
    repeatWhileNotVisible: (id: string, func: () => void) => void;
    yaml: (yaml: string) => string;
    assertTrue: (condition: string) => void;
};
export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml";
declare global {
    namespace http {
        const get: (...args: any) => {
            body: string;
        };
    }
    const json: <T extends any>(str: string) => T;
    const output: Record<string, string>;
}
