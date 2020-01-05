import fetch from "cross-fetch";
import "jest";
import Alpha from "../src";
import daily from "./examples/crypto/daily.json";
import monthly from "./examples/crypto/monthly.json";
import weekly from "./examples/crypto/weekly.json";

jest.mock("cross-fetch");

describe("data", () => {
  const alpha = Alpha();

  test(`daily data works`, async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(daily)
    });
    const data = await alpha.crypto.daily("btc", "cny");

    expect(data["Meta Data"]).toBeDefined();
    expect(data["Time Series (Digital Currency Daily)"]).toBeDefined();
  });

  test(`weekly data works`, async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(weekly)
    });
    const data = await alpha.crypto.weekly("btc", "usd");

    expect(data["Meta Data"]).toBeDefined();
    expect(data["Time Series (Digital Currency Weekly)"]).toBeDefined();
  });

  test(`monthly data works`, async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(monthly)
    });
    const data = await alpha.crypto.monthly("btc", "usd");

    expect(data["Meta Data"]).toBeDefined();
    expect(data["Time Series (Digital Currency Monthly)"]).toBeDefined();
  });
});
