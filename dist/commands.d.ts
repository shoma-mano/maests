export declare let out: string;
export declare const resetOut: () => void;
export declare const MaestroTranslators: {
    /**
     * Should be called at the start of every test flow.
     * In the config object, you can define the appId to use.
     */
    initFlow: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Launches the app.
     * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
     */
    launchApp: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Clear the state of the current app or of the app with the given id.
     */
    clearState: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * runScript.
     */
    runScript: ({ path }: {
        path: string;
    }) => void;
    /**
     * Clear the entire keychain.
     */
    clearKeychain: () => void;
    /**
     * Tap on an element with the given testId.
     */
    tapOn: (id: string) => void;
    /**
     * Tap on a text visible on screen.
     */
    tapOnText: (text: string) => void;
    /**
     * Tap on the given point.
     * Can either take numbers for dips or strings for percentages.
     */
    tapOnPoint: ({ x, y }: {
        x: any;
        y: any;
    }) => void;
    /**
     * Wait for testId to appear and the tap on an element with the given testId.
     */
    waitForAndtapOn: (id: string, maxWait: number) => void;
    /**
     * Long press on an element with the given testId.
     */
    longPressOn: (id: string) => void;
    /**
     * Long press on the given point.
     */
    longPressOnPoint: ({ x, y }: {
        x: any;
        y: any;
    }) => void;
    /**
     * Long press on an element with the given text.
     */
    longPressOnText: (text: string) => void;
    /**
     * Swipe left from center.
     */
    swipeLeft: () => void;
    /**
     * Swipe right from center.
     */
    swipeRight: () => void;
    /**
     * Swipe down from center.
     */
    swipeDown: () => void;
    /**
     * Swipe up from center.
     */
    swipeUp: () => void;
    /**
     * Swipe from a start to an end point. Use percentages or dips.
     */
    swipe: (start: {
        x: number;
        y: number;
    }, end: {
        x: number;
        y: number;
    }) => void;
    /**
     * Input a text into the currently focused input or the input with the given testId.
     */
    inputText: (text: string, id?: string) => void;
    /**
     * Input random name into focused input or the one with given testId.
     */
    inputRandomName: (id?: string) => void;
    /**
     * Input random number into focused input or the one with given testId.
     */
    inputRandomNumber: (id?: string) => void;
    /**
     * Copies text of an element with the given testId.
     */
    copyTextFrom: (id: string) => void;
    /**
     * Input random email into focused input or the one with given testId.
     */
    inputRandomEmail: (id?: string) => void;
    /**
     * Input random text into focused input or the one with given testId.
     */
    inputRandomText: (id?: string) => void;
    /**
     * Erase a number of characters from the focused input or the input with the given testId.
     */
    eraseText: (chars: number, id?: string) => void;
    /**
     * Open a url / deepLink.
     */
    openLink: (url: string) => void;
    /**
     * Use the configured deepLinkBase or appId to navigate to the given path.
     * Only works if deepLinking is set up correctly.
     */
    navigate: (path: string) => void;
    /**
     * Assert an element with the given testId is visible.
     * @param enabled Whether the view should also be enabled.
     */
    assertVisible: (id: string, enabled: boolean) => void;
    /**
     * Assert the element with the given testId is not visible.
     */
    assertNotVisible: (id: string) => void;
    /**
     * Scroll down.
     */
    scroll: () => void;
    /**
     * Scroll until the element with the given testId is visible.
     */
    scrollUntilVisible: (id: string) => void;
    /**
     * Waits until an ongoing animation/video is fully finished and screen becomes static.
     * Can have an optional timeout (in milliseconds) after which the command is marked as successful and flow continues.
     */
    waitForAnimationEnd: (maxWait: number) => void;
    /**
     * Wait a max of milliseconds until the element with the given testId is visible.
     */
    waitUntilVisible: (id: string, maxWait: number) => void;
    /**
     * Wait a max of milliseconds until the element with the given testId is no longer visible.
     */
    waitUntilNotVisible: (id: string, maxWait: number) => void;
    /**
     * Wait a number of milliseconds.
     * This is an anti-pattern, try to fall back to other waiting methods if possible.
     */
    wait: (ms: number) => void;
    /**
     * Dismiss the software keyboard.
     */
    hideKeyboard: () => void;
    /**
     * Take a screenshot and store at the path with the given name.
     */
    screenshot: (fileName: string) => void;
    /**
     * Press the enter key on the software keyboard.
     */
    pressEnter: () => void;
    /**
     * Press the home button.
     */
    pressHomeButton: () => void;
    /**
     * Press the lock button.
     */
    pressLockButton: () => void;
    /**
     * Press android back button.
     */
    back: () => void;
    /**
     * Decrease device volume.
     */
    volumeDown: () => void;
    /**
     * Increase device volume.
     */
    volumeUp: () => void;
    /**
     * Stop the current app or the one with the given appId.
     */
    stopApp: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Repeats the given actions a given number of times.
     */
    repeat: (times: number, func: () => any) => void;
    /**
     * Repeats the given actions while the element with the given testId is visible.
     */
    repeatWhileVisible: (id: string, func: () => any) => void;
    /**
     * Repeats the given actions while the element with the given testId is not visible.
     */
    repeatWhileNotVisible: (id: string, func: () => any) => void;
    /**
     * Insert inline yaml code. Good for specialized commands.
     */
    yaml: (yaml: string) => string;
    /**
     * Check if a condition is true.
     */
    assertTrue: (condition: string) => void;
};
export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml";
declare global {
    namespace http {
        const get: (...args: any) => any;
    }
    const output: Record<string, string>;
}
