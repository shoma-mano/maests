import { handleNest, addOut, getOut } from "../out";

const envAppId = process.env["appId"];

export const initFlow = ({
  appId,
  onFlowStart,
}: { appId?: string; onFlowStart?: () => void } = {}) => {
  const appIdCommand = `appId: ${appId ?? envAppId}\n`;
  let commands = appIdCommand;
  if (onFlowStart) {
    const nested = handleNest(onFlowStart);
    const flowCommand = `onFlowStart:\n${nested.replaceAll(/\n/g, `    \n`)}`;
    commands += flowCommand;
  }
  const separator = "---\n";
  commands += separator;
  addOut(commands);
};

if (import.meta.vitest) {
  it("initFlow with appId", () => {
    initFlow({ appId: "testAppId" });
    expect(getOut()).toMatchInlineSnapshot(`
        "appId: testAppId
        ---
        "
      `);
  });
}

export const launchApp = ({ appId }: { appId?: string } = {}) => {
  addOut(`- launchApp:\n    appId: "${appId ?? envAppId}"\n`);
};

if (import.meta.vitest) {
  it("launchApp with appId", () => {
    launchApp({ appId: "testAppId" });
    expect(getOut()).toMatchInlineSnapshot(`
        "- launchApp:
            appId: "testAppId"
        "
      `);
  });
}

export const clearState = ({ appId }: { appId?: string } = {}) => {
  addOut(appId ? `- clearState: ${appId}\n` : "- clearState\n");
};

if (import.meta.vitest) {
  it("clearState with appId", () => {
    clearState({ appId: "testAppId" });
    expect(getOut()).toMatchInlineSnapshot(`
        "- clearState: testAppId
        "
      `);
  });
}
