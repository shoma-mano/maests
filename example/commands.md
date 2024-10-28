# Measts Commands

# Measts Commands

## Table of Contents

- [Initialize Flow](#initialize-flow)
- [Taps and Presses](#taps-and-presses)
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
    M.initFlow({ appId: "com.example.app" })
```

- **Clear Application State**
```typescript
    M.clearState({ appId: "com.example.app" })
```

- **Clear Keychain**
```typescript
    M.clearKeychain()
```

### Taps and Presses**

Taps and Presses have optional properties available for configuring various Maestro commands, designed to enhance the flexibility and customization of user interactions. The properties are described below.

#### Properties

### TapProps

The `TapProps` interface defines optional properties for customizing tap actions in Maestro commands, such as `tapOn`, `tapOnText`, and `tapOnPoint`.

| Property                | Type     | Default | Description                                                                                                  |
|-------------------------|----------|---------|--------------------------------------------------------------------------------------------------------------|
| `retryTapIfNoChange`    | boolean  | `true`  | If set to `true`, the tap action will be retried if no change is detected on the first attempt.              |
| `repeat`                | number   | -       | Specifies the number of times to repeat the tap action.                                                      |
| `waitToSettleTimeoutMs` | number   | -       | Time in milliseconds to wait for the element to settle after tapping, useful for handling UI transition time. |

#### Example Usage:
```typescript
M.tapOn("submitButton", { retryTapIfNoChange: false, repeat: 2, waitToSettleTimeoutMs: 500 });

---

### WaitProps

```markdown
### WaitProps

The `WaitProps` interface provides optional properties for configuring wait behavior in specific commands, such as `waitForAndTapOn`, `waitUntilVisible`, and `waitUntilNotVisible`.

| Property   | Type    | Default | Description                                                                                     |
|------------|---------|---------|-------------------------------------------------------------------------------------------------|
| `maxWait`  | number  | 5000    | The maximum time (in milliseconds) to wait for an element or condition before continuing.       |

#### Example Usage:
```typescript
M.waitForAndTapOn("startButton", { maxWait: 3000 });


---

### PointProps

```markdown
### PointProps

The `PointProps` interface specifies coordinates for point-based tap or long-press actions, enabling precise control of on-screen actions.

| Property | Type                | Description                                                                      |
|----------|----------------------|----------------------------------------------------------------------------------|
| `x`      | `number | string`   | The x-coordinate for the point to tap on. Can be an absolute number or percentage.|
| `y`      | `number | string`   | The y-coordinate for the point to tap on. Can be an absolute number or percentage.|

#### Example Usage:
```typescript
M.tapOnPoint({ x: "50%", y: "50%" }, { waitToSettleTimeoutMs: 200 });


- **Tap on Element by ID**

```typescript
    M.tapOn("submitButton", { retryTapIfNoChange: true, repeat: 2, waitToSettleTimeoutMs: 500 })
```
- **Tap on Visible Text**
```typescript
    M.tapOnText("Submit", { retryTapIfNoChange: true })
```
- **Tap on Point**
```typescript
    M.tapOnPoint({ x: "50%", y: "50%" }, { waitToSettleTimeoutMs: 200 })
```
- **Wait for Element to Appear and Tap**
```typescript
    M.waitForAndTapOn("submitButton", 3000)
```
- **Long Press on Element by ID**
```typescript
    M.longPressOn("submitButton")
```
- **Long Press on Text**
```typescript
    M.longPressOnText("Submit")
```

### Swipes and Scrolls

- **Swipe in a Direction**
```typescript
    M.swipeLeft()
    M.swipeRight()
    M.swipeUp()
    M.swipeDown()
```

- **Swipe from Point to Point**
```typescript
   M.swipe({ x: "10%", y: "20%" }, { x: "90%", y: "80%" })
```

- **Scroll Screen**
```typescript
    M.scroll()
```

- **Scroll Until Element is Visible**
```typescript
   M.scrollUntilVisible("scrollTarget")
```

### Text Input

- **Input Text into an Element**
```typescript
   M.inputText("Hello, World!", "textFieldId")
```

- **Input Random Name**
```typescript
    M.inputRandomName("nameFieldId")
```

- **Input Random Number**
```typescript
    M.inputRandomNumber("numberFieldId")
```

- **Input Random Email**
```typescript
    M.inputRandomEmail("emailFieldId")
```

- **Input Random Text**
```typescript
    M.inputRandomText("textFieldId")
```

- **Input Random Text**
```typescript
    M.inputRandomText("textFieldId")
```

- **Erase Text**
```typescript
    M.eraseText(10, "textFieldId")
```

### Navigation and Links

- **Open a Link**
```typescript
    M.openLink("https://example.com")
```

- **Navigate to Path Using Deep Link Base**
```typescript
   M.navigate("/home")
```

### Assertions

- **Assert Element is Visible**
```typescript
  M.assertVisible("submitButton", true)
```

- **Assert Element is Not Visible**
```typescript
  M.assertNotVisible("submitButton")
```

### Waiting
- **Wait for Animation End**
```typescript
  M.waitForAnimationEnd(3000)
```

- **Wait Until Element is Visible**
```typescript
  M.waitUntilVisible("submitButton", 5000)
```

- **Wait Until Element is Not Visiblee**
```typescript
  M.waitUntilNotVisible("loadingSpinner", 5000)
```

- **Wait a Specified Number of Milliseconds**
```typescript
  M.wait(1000)
```

### Keyboard Actions

- **Hide Keyboard**
```typescript
  M.hideKeyboard()
```

- **Press Enter**
```typescript
  M.pressEnter()
```

- **Press Home Button**
```typescript
  M.pressHomeButton()
```

- **Press Lock Button**
```typescript
  M.pressLockButton()
```

- **Press Back Button**
```typescript
  M.back()
```

### Device Volume Controls

- **Increase Volume**
```typescript
    M.volumeUp()
```

- **Decrease Volume**
```typescript
   M.volumeDown()
```

### Miscellaneous Actions

- **Take Screenshot**
```typescript
    M.screenshot("my-screenshot.png")
```

- **Copy Text from an Element**
```typescript
    M.copyTextFrom("textElementId")
```

- **Assert Condition is True**
```typescript
    M.assertTrue("2 + 2 === 4")
```

### Repeat Actions

- **Repeat Actions a Specified Number of Times**
```typescript
    M.repeat(3, () => {
    M.tapOn("submitButton");
    M.wait(500)
});
```

- **Repeat Actions While Element is Visibles**
```typescript
    M.repeatWhileVisible("loadingSpinner", () => {
    M.wait(1000)
});
```
- **Repeat Actions While Element is Not Visible**
```typescript
    M.repeatWhileNotVisible("submitButton", () => {
    M.wait(1000);
});
```






































