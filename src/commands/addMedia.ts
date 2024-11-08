import { stringify } from "yaml";
import { addOut, getOut } from "../out";

// List of MIME types supported by Maestro for adding media to the device's gallery
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp4",
] as const;
type AllowedMimeTypes = (typeof allowedMimeTypes)[number];

/**
 * Adds a media file to the device's gallery, making it accessible for use in application flows.
 * Supports both Android and iOS platforms.
 *
 * @param {string} mimeType - The MIME type of the media file to add.
 *                            Must be one of the following supported types:
 *                            "image/png", "image/jpeg", "image/jpg", "image/gif", "video/mp4".
 * @param {string} filePath - The relative path to the media file.
 *
 * @throws {Error} Throws an error if the provided MIME type is not in the allowed list.
 *
 * @example
 * addMedia("image/png", "../assets/test.png"); // Adds a PNG file located at the specified path
 */
export const addMedia = (mimeType: AllowedMimeTypes, filePath: string) => {
  // Validate if the provided MIME type is in the list of allowed types
  if (!allowedMimeTypes.includes(mimeType)) {
    throw new Error(
      `Unsupported MIME type. Allowed types are: ${allowedMimeTypes.join(", ")}`
    );
  }

  // Command structure for adding media to the gallery
  const commands = [
    {
      addMedia: [`${filePath}`],
    },
  ];
  addOut(stringify(commands));
};

// Tests for the addMedia function using Vitest
if (import.meta.vitest) {
  it("should match snapshot for addMedia with a valid mimeType and filePath", () => {
    addMedia("image/png", "../assets/test.png");
    expect(getOut()).toMatchInlineSnapshot(`
      "- addMedia:
          - ../assets/test.png
      "
    `);
  });

  it("should throw an error for an unsupported mimeType", () => {
    expect(() =>
      // @ts-expect-error
      addMedia("application/pdf", "../assets/test.pdf")
    ).toThrowError(
      "Unsupported MIME type. Allowed types are: image/png, image/jpeg, image/jpg, image/gif, video/mp4"
    );
  });
}
