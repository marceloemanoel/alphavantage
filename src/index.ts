import { APIClient } from "./APIClient";
import crypto from "./crypto";
import data from "./data";
import forex from "./forex";
import performance from "./performance";
import technical from "./technical";

try {
  // Attempt to load the env
  require("dotenv").config();
} catch (e) {}

export interface AlphaVantageOptions {
  key?: string;
}

export const MISSING_KEY_MESSAGE =
  "Missing Alpha Vantage key. You can provide it either on constructor or through the AV_KEY environment variable.";

/**
 * The Alpha Vantage core module.
 */
export default (config: AlphaVantageOptions = {}) => {
  let key;
  try {
    key = process.env.AV_KEY;
  } catch (e) {}

  config = { key, ...config };

  // Check for config errors.
  if (config.key === undefined) {
    throw new Error(MISSING_KEY_MESSAGE);
  }

  const client = new APIClient(config);

  return {
    data: data(client),
    forex: forex(client),
    crypto: crypto(client),
    technical: technical(client),
    performance: performance(client)
  };
};
