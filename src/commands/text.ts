import { addOut } from "../out";

/**
 * Inputs text into the focused or specified input element.
 * @param text - The text to input.
 * @param id - Optional testId of the input element.
 */
export const inputText = (text: string, id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`
      : `- inputText: ${text}\n`
  );
};

/**
 * Inputs a random name into the focused or specified input element.
 * @param id - Optional testId of the input element.
 */
export const inputRandomName = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`
      : `- inputRandomPersonName\n`
  );
};

/**
 * Inputs a random number into the focused or specified input element.
 * @param id - Optional testId of the input element.
 */
export const inputRandomNumber = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`
      : `- inputRandomNumber\n`
  );
};

/**
 * Copies text from an element identified by its testId.
 * @param id - The testId of the element to copy text from.
 */
export const copyTextFrom = (id: string) => {
  addOut(`- copyTextFrom:\n    id: "${id}"\n`);
};

/**
 * Inputs a random email address into the focused or specified input element.
 * @param id - Optional testId of the input element.
 */
export const inputRandomEmail = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`
      : `- inputRandomEmail\n`
  );
};

/**
 * Inputs random text into the focused or specified input element.
 * @param id - Optional testId of the input element.
 */
export const inputRandomText = (id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- inputRandomText\n`
      : `- inputRandomText\n`
  );
};

export const eraseText = (chars: number, id?: string) => {
  addOut(
    id
      ? `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`
      : `- eraseText: ${chars ?? 50}\n`
  );
};
