# Supported Commands

## Table of Contents

- [Initialize Flow](#initialize-flow)
- [Run Script](#run-script)
- [Taps](#taps)
- [Swipes and Scrolls](#swipes-and-scrolls)
- [Text Input](#text-input)
- [Navigation and Links](#navigation-and-links)
- [Assertions](#assertions)
- [Waiting](#waiting)
- [Keyboard Actions](#keyboard-actions)
- [Device Volume Controls](#device-volume-controls)
- [Miscellaneous Actions](#miscellaneous-actions)
- [Repeat Actions](#repeat-actions)

### Initialize Flow

- **Launch the Application**

```typescript
M.initFlow({ appId: "com.example.app" });
```

- **Clear Application State**

```typescript
M.clearState({ appId: "com.example.app" });
```

- **Clear Keychain**

```typescript
M.clearKeychain();
```

### Run Script

`flow.ts`

```typescript
import { M } from "maests";

M.runScript("./script.ts");
```

`script.ts`

```typescript
import type { APIResult } from "./type";
import { hello } from "./hello";

// typed http request
const body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;
const result = json<APIResult>(body);
console.log(result.userId);

// you can use environment variables
console.log(process.env.MAESTRO_APP_ID);

// you can use imported functions
hello();
```

### Taps

Tap Commands have optional properties available for configuring various Maestro commands, designed to enhance the flexibility and customization of user interactions. The properties are described below.
The `TapOptions` interface defines optional properties for customizing tap actions in Maestro commands, such as `tapOn`, `tapOnText`, and `tapOnPoint`.

| Property                | Type    | Description                                                                                                   |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `index`                 | number  | index of the element you wish to interact with                                                                |
| `retryTapIfNoChange`    | boolean | If set to `true`, the tap action will be retried if no change is detected on the first attempt.               |
| `repeat`                | number  | Specifies the number of times to repeat the tap action.                                                       |
| `waitToSettleTimeoutMs` | number  | Time in milliseconds to wait for the element to settle after tapping, useful for handling UI transition time. |

- **Tap on Id**

```typescript
M.tapOn("submitButton", {
  retryTapIfNoChange: false,
  repeat: 2,
  waitToSettleTimeoutMs: 500,
});
```

- **Tap on Visible Text**

```typescript
M.tapOnText("Submit", { retryTapIfNoChange: true });
```

- **Tap on Point**

```typescript
M.tapOnPoint({ x: "50%", y: "50%" }, { waitToSettleTimeoutMs: 200 });
```

- **Long Press on Element by ID**

```typescript
M.longPressOn("submitButton");
```

- **Long Press on Text**

```typescript
M.longPressOnText("Submit");
```

### Swipes and Scrolls

- **Swipe in a Direction**

```typescript
M.swipeLeft();
M.swipeRight();
M.swipeUp();
M.swipeDown();
```

- **Swipe from Point to Point**

```typescript
M.swipe({ x: "10%", y: "20%" }, { x: "90%", y: "80%" });
```

- **Scroll Screen**

```typescript
M.scroll();
```

- **Scroll Until Element is Visible**

```typescript
M.scrollUntilVisible("scrollTarget");
```

### Text Input

- **Input Text into an Element**

```typescript
M.inputText("Hello, World!", "textFieldId");
```

- **Input Random Name**

```typescript
M.inputRandomName("nameFieldId");
```

- **Input Random Number**

```typescript
M.inputRandomNumber("numberFieldId");
```

- **Input Random Email**

```typescript
M.inputRandomEmail("emailFieldId");
```

- **Input Random Text**

```typescript
M.inputRandomText("textFieldId");
```

- **Input Random Text**

```typescript
M.inputRandomText("textFieldId");
```

- **Erase Text**

```typescript
M.eraseText(10, "textFieldId");
```

### Navigation and Links

- **Open a Link**

```typescript
M.openLink("https://example.com");
```

- **Navigate to Path Using Deep Link Base**

```typescript
M.navigate("/home");
```

### Assertions

- **Assert Element is Visible**

```typescript
M.assertVisible("submitButton", true);
```

- **Assert Element is Not Visible**

```typescript
M.assertNotVisible("submitButton");
```

### Waiting

- **Wait for Animation End**

```typescript
M.waitForAnimationEnd(3000);
```

- **Wait Until Element is Visible**

```typescript
M.waitUntilVisible("submitButton", 5000);
```

- **Wait Until Element is Not Visiblee**

```typescript
M.waitUntilNotVisible("loadingSpinner", 5000);
```

- **Wait a Specified Number of Milliseconds**

```typescript
M.wait(1000);
```

### Keyboard Actions

- **Hide Keyboard**

```typescript
M.hideKeyboard();
```

- **Press Enter**

```typescript
M.pressEnter();
```

- **Press Home Button**

```typescript
M.pressHomeButton();
```

- **Press Lock Button**

```typescript
M.pressLockButton();
```

- **Press Back Button**

```typescript
M.back();
```

### Device Volume Controls

- **Increase Volume**

```typescript
M.volumeUp();
```

- **Decrease Volume**

```typescript
M.volumeDown();
```

### Miscellaneous Actions

- **Take Screenshot**

```typescript
M.screenshot("my-screenshot.png");
```

- **Copy Text from an Element**

```typescript
M.copyTextFrom("textElementId");
```

- **Assert Condition is True**

```typescript
M.assertTrue("2 + 2 === 4");
```

### Repeat Actions

- **Repeat Actions a Specified Number of Times**

```typescript
M.repeat(3, () => {
  M.tapOn("submitButton");
  M.wait(500);
});
```

- **Repeat Actions While Element is Visibles**

```typescript
M.repeatWhileVisible("loadingSpinner", () => {
  M.wait(1000);
});
```

- **Repeat Actions While Element is Not Visible**

```typescript
M.repeatWhileNotVisible("submitButton", () => {
  M.wait(1000);
});
```
