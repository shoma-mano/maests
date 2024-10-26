import { TapProps, PointProps } from "./types";
export declare let out: string;
export declare const resetOut: () => void;
export declare const MaestroTranslators: {
    /**
     * Initializes the test flow with an optional application ID.
     * @param appId - Optional application ID to override the default environment appId.
     */
    initFlow: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Launches the application with optional configurations.
     * @param appId - Optional app ID to use for launching the app.
     */
    launchApp: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Clears the state of the application.
     * @param appId - Optional app ID to clear a specific application's state.
     */
    clearState: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Clears the entire keychain.
     */
    clearKeychain: () => void;
    /**
     * Taps on an element by its test ID with optional retry and repeat configurations.
     * @param id - The test ID of the target element.
     * @param props - Optional properties to customize the tap action.
     */
    tapOn: (id: string, props?: TapProps) => void;
    /**
     * Taps on visible text on the screen with optional retry and repeat configurations.
     * @param text - The visible text to tap on.
     * @param props - Optional properties to customize the tap action.
     */
    tapOnText: (text: string, props?: TapProps) => void;
    /**
     * Taps on a specified point on the screen.
     * @param point - The x and y coordinates of the tap.
     * @param props - Optional properties for customizing the tap action.
     */
    tapOnPoint: (point: PointProps, props?: TapProps) => void;
    /**
     * Waits for an element by testId to appear, then taps on it.
     * @param id - The testId of the element to wait for and tap.
     * @param maxWait - Maximum wait time in milliseconds for the element to appear.
     * @param props - Optional properties to customize the tap action.
     */
    waitForAndTapOn: (id: string, maxWait: number, props?: TapProps) => void;
    /**
     * Long presses on an element by its testId.
     * @param id - The testId of the element to long press on.
     */
    longPressOn: (id: string) => void;
    /**
     * Long presses on a specified point on the screen.
     * @param point - The x and y coordinates for the long press.
     */
    longPressOnPoint: ({ x, y }: PointProps) => void;
    /**
     * Long presses on a specified text on the screen.
     * @param text - The text to long press.
     */
    longPressOnText: (text: string) => void;
    /**
     * Swipes in the specified direction from the center of the screen.
     */
    swipeLeft: () => void;
    swipeRight: () => void;
    swipeDown: () => void;
    swipeUp: () => void;
    /**
     * Swipes from a starting to an ending point.
     * @param start - Starting coordinates of the swipe.
     * @param end - Ending coordinates of the swipe.
     */
    swipe: (start: PointProps, end: PointProps) => void;
    /**
     * Inputs text into a focused element or the specified input by testId.
     * @param text - The text to input.
     * @param id - Optional testId of the target input element.
     */
    inputText: (text: string, id?: string) => void;
    /**
     * Inputs a random name into a focused input or specified by testId.
     * @param id - Optional testId of the target input element.
     */
    inputRandomName: (id?: string) => void;
    /**
     * Inputs a random number into a focused input or specified by testId.
     * @param id - Optional testId of the target input element.
     */
    inputRandomNumber: (id?: string) => void;
    /**
     * Copies text from an element by its testId.
     * @param id - The testId of the element.
     */
    copyTextFrom: (id: string) => void;
    /**
     * Inputs a random email into a focused input or specified by testId.
     * @param id - Optional testId of the target input element.
     */
    inputRandomEmail: (id?: string) => void;
    /**
     * Inputs random text into a focused input or specified by testId.
     * @param id - Optional testId of the target input element.
     */
    inputRandomText: (id?: string) => void;
    /**
     * Erases a specified number of characters from an input.
     * @param chars - Number of characters to erase.
     * @param id - Optional testId of the target input element.
     */
    eraseText: (chars: number, id?: string) => void;
    /**
     * Opens a specified URL or deep link.
     * @param url - The URL or deep link to open.
     */
    openLink: (url: string) => void;
    /**
     * Navigates to a specific path using the deep link base.
     * @param path - The path to navigate.
     */
    navigate: (path: string) => void;
    /**
     * Asserts that an element by testId is visible.
     * @param id - The testId of the element.
     * @param enabled - Optional; checks if the element is enabled.
     */
    assertVisible: (id: string, enabled?: boolean) => void;
    /**
     * Asserts that an element by testId is not visible.
     * @param id - The testId of the element.
     */
    assertNotVisible: (id: string) => void;
    /**
     * Scrolls the screen.
     */
    scroll: () => void;
    /**
     * Scrolls until an element with the given testId is visible.
     * @param id - The testId of the element.
     */
    scrollUntilVisible: (id: string) => void;
    /**
     * Waits until an animation/video finishes and screen becomes static.
     * @param maxWait - Optional; max timeout after which flow continues.
     */
    waitForAnimationEnd: (maxWait?: number) => void;
    /**
     * Waits until an element by testId is visible.
     * @param id - The testId of the element.
     * @param maxWait - Max wait time in milliseconds.
     */
    waitUntilVisible: (id: string, maxWait: number) => void;
    /**
     * Waits until an element by testId is not visible.
     * @param id - The testId of the element.
     * @param maxWait - Max wait time in milliseconds.
     */
    waitUntilNotVisible: (id: string, maxWait: number) => void;
    /**
     * Waits a specified number of milliseconds.
     * @param ms - Number of milliseconds to wait.
     */
    wait: (ms: number) => void;
    /**
     * Dismisses the software keyboard.
     */
    hideKeyboard: () => void;
    /**
     * Takes a screenshot and stores it with the specified filename.
     * @param fileName - The name to save the screenshot under.
     */
    screenshot: (fileName: string) => void;
    /**
     * Presses the enter key on the software keyboard.
     */
    pressEnter: () => void;
    /**
     * Presses the home button on the device.
     */
    pressHomeButton: () => void;
    /**
     * Presses the lock button on the device.
     */
    pressLockButton: () => void;
    /**
     * Presses the Android back button.
     */
    back: () => void;
    /**
     * Decreases the device volume.
     */
    volumeDown: () => void;
    /**
     * Increases the device volume.
     */
    volumeUp: () => void;
    /**
     * Stops the current app or specified app ID.
     * @param appId - Optional; the app ID to stop.
     */
    stopApp: ({ appId }?: {
        appId?: string;
    }) => void;
    /**
     * Repeats specified actions a given number of times.
     * @param times - Number of repetitions.
     * @param func - Actions to repeat.
     */
    repeat: (times: number, func: () => void) => void;
    /**
     * Repeats actions while an element by testId is visible.
     * @param id - The testId of the element.
     * @param func - Actions to repeat.
     */
    repeatWhileVisible: (id: string, func: () => void) => void;
    /**
     * Repeats actions while an element by testId is not visible.
     * @param id - The testId of the element.
     * @param func - Actions to repeat.
     */
    repeatWhileNotVisible: (id: string, func: () => void) => void;
    /**
     * Inserts inline YAML code for specialized commands.
     * @param yaml - The inline YAML to insert.
     */
    yaml: (yaml: string) => string;
    /**
     * Checks if a condition is true.
     * @param condition - The condition to assert.
     */
    assertTrue: (condition: string) => void;
};
export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml";
