import "jest";
import Alpha from "../dist";
import { MISSING_KEY_MESSAGE } from "../src";

describe("initialization", () => {
  const env = process.env;
  beforeEach(() => {
    // Clear the current environment variables for testing.
    process.env = {};
  });

  it(`throws an error when done without a config`, () => {
    try {
      Alpha();
    } catch (e) {
      expect(e.message).toEqual(MISSING_KEY_MESSAGE);
    }
  });

  it(`throws an error when done without an api key`, () => {
    try {
      Alpha({});
    } catch (e) {
      expect(e.message).toEqual(MISSING_KEY_MESSAGE);
    }
  });

  it(`finds the key on proccess.env AV_KEY`, () => {
    try {
      process.env = env;
      const alpha = Alpha();
      expect(alpha).toBeDefined();
    } catch (e) {
      expect(e.message).toEqual(MISSING_KEY_MESSAGE);
    }
  });
});
