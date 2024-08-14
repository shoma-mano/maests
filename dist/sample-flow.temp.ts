import createJITI from 'jiti'


      import { M, writeYaml } from "./commands"
      
const str:string='test'

M.initFlow({ appId: "com.my.app", NAME: "Maestro" })

M.launchApp({ appId: "com.my.app" })

M.tapOn("buttonId")
M.tapOn("otherButtonId")

console.log('test')

M.inputText("Hello World", "textFieldId")

M.inputText("{NAME}", "otherTextFieldId")
M.inputText("more text for focused input")

// This would only work once you've set up deep linking in your app
// and you've set the appropriate deepLinkingBase in maestro.config.ts
M.navigate("/profile")

// If you apply routes as testIDs to your ScreenContainers, you can do some pretty cool stuff 😎
M.assertVisible("/profile")

    writeYaml("sample-flow.maestro.ts")
    