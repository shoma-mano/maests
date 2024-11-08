import { addOut, getOut } from "../out";

export const inputText = (text: string, id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`
      : `- inputText: ${text}\n`
  );
};

if (import.meta.vitest) {
  it("inputText in focused element", () => {
    inputText("focused text");
    expect(getOut()).toMatchInlineSnapshot(`
      "- inputText: focused text
      "
    `);
  });
}

export const inputRandomName = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`
      : `- inputRandomPersonName\n`
  );
};

if (import.meta.vitest) {
  it("inputRandomName in focused element", () => {
    inputRandomName();
    expect(getOut()).toMatchInlineSnapshot(`
      "- inputRandomPersonName
      "
    `);
  });
}

export const inputRandomNumber = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`
      : `- inputRandomNumber\n`
  );
};

if (import.meta.vitest) {
  it("inputRandomNumber in focused element", () => {
    inputRandomNumber();
    expect(getOut()).toMatchInlineSnapshot(`
      "- inputRandomNumber
      "
    `);
  });
}

export const copyTextFrom = (id: string) => {
  addOut(`- copyTextFrom:\n    id: "${id}"\n`);
};

if (import.meta.vitest) {
  it("copyTextFrom", () => {
    copyTextFrom("com.android.systemui:id/battery");
    expect(getOut()).toMatchInlineSnapshot(`
      "- copyTextFrom:
          id: "com.android.systemui:id/battery"
      "
    `);
  });
}

export const inputRandomEmail = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`
      : `- inputRandomEmail\n`
  );
};

if (import.meta.vitest) {
  it("inputRandomEmail in focused element", () => {
    inputRandomEmail();
    expect(getOut()).toMatchInlineSnapshot(`
      "- inputRandomEmail
      "
    `);
  });
}

export const inputRandomText = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomText\n`
      : `- inputRandomText\n`
  );
};

if (import.meta.vitest) {
  it("inputRandomText in focused element", () => {
    inputRandomText();
    expect(getOut()).toMatchInlineSnapshot(`
      "- inputRandomText
      "
    `);
  });
}

export const eraseText = (chars: number, id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`
      : `- eraseText: ${chars ?? 50}\n`
  );
};

if (import.meta.vitest) {
  it("eraseText in focused element", () => {
    eraseText(10);
    expect(getOut()).toMatchInlineSnapshot(`
      "- eraseText: 10
      "
    `);
  });
}
