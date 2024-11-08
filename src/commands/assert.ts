import { stringify } from "yaml";
import { addOut, getOut } from "../out";

type AssertProps = {
  text?: string;
  id?: string;
  enabled?: boolean;
  checked?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export const assertVisible = (props: AssertProps) => {
  const commands = [{ assertVisible: { ...props } }];
  addOut(stringify(commands));
};

if (import.meta.vitest) {
  it("assertVisible", () => {
    assertVisible({ id: "com.android.systemui:id/battery" });
    expect(getOut()).toMatchInlineSnapshot(`
      "- assertVisible:
          id: com.android.systemui:id/battery
      "
    `);
  });
}

export const assertNotVisible = (props: AssertProps) => {
  const commands = [{ assertNotVisible: { ...props } }];
  addOut(stringify(commands));
};

if (import.meta.vitest) {
  it("assertNotVisible", () => {
    assertNotVisible({ id: "com.android.systemui:id/battery" });
    expect(getOut()).toMatchInlineSnapshot(`
      "- assertNotVisible:
          id: com.android.systemui:id/battery
      "
    `);
  });
}

export const assertTrue = (condition: string) => {
  addOut(`- assertTrue: ${condition}\n`);
};
