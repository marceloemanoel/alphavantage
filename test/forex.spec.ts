import fetch from "cross-fetch";
import "jest";
import Alpha from "../src";
import rate from "./examples/forex/rate.json";

jest.mock("cross-fetch");
const alpha = Alpha();

test(`forex data works`, async () => {
  (fetch as jest.Mock).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(rate)
  });
  const data = await alpha.forex.rate("USD", "JPY");

  expect(data["Realtime Currency Exchange Rate"]).toBeDefined();
  expect(data["Realtime Currency Exchange Rate"]["1. From_Currency Code"]).toEqual("USD");
  expect(data["Realtime Currency Exchange Rate"]["3. To_Currency Code"]).toEqual("JPY");
});
