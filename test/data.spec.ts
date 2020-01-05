import fetch from "cross-fetch";
import "jest";
import Alpha from "../src";
import adjusted from "./examples/data/adjusted.json";
import daily from "./examples/data/daily.json";
import intraday from "./examples/data/intraday.json";
import weekly from "./examples/data/weekly.json";

const alpha = Alpha();

jest.mock("cross-fetch");

test(`intraday data works`, async () => {
  (fetch as jest.Mock).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(intraday)
  });
  const data = await alpha.data.intraday(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Time Series (1min)"]).toBeDefined();
});

test(`daily data works`, async () => {
  (fetch as jest.Mock).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(daily)
  });

  const data = await alpha.data.daily(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Time Series (Daily)"]).toBeDefined();
});

test(`daily adjusted data works`, async () => {
  (fetch as jest.Mock).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(adjusted)
  });
  const data = await alpha.data.daily_adjusted(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Time Series (Daily)"]).toBeDefined();
});

test(`weekly data works`, async () => {
  (fetch as jest.Mock).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(weekly)
  });
  const data = await alpha.data.weekly(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Weekly Time Series"]).toBeDefined();
});

test(`weekly adjusted data works`, async () => {
  const data = await alpha.data.weekly_adjusted(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Weekly Adjusted Time Series"]).toBeDefined();
});

test(`monthly data works`, async () => {
  const data = await alpha.data.monthly(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Monthly Time Series"]).toBeDefined();
});

test(`weekly adjusted data works`, async () => {
  const data = await alpha.data.monthly_adjusted(`msft`);

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Monthly Adjusted Time Series"]).toBeDefined();
});

test(`global quote data works`, async () => {
  const data = await alpha.data.quote(`msft`);
  expect(data["Global Quote"]).toBeDefined();
  expect(data["Global Quote"]["01. symbol"]).toEqual("MSFT");
});

test(`symbol search works`, async () => {
  const data = await alpha.data.search(`Advanced Micro`);

  expect(data["bestMatches"]).toBeDefined();
  expect(data["bestMatches"][0]["1. symbol"]).toEqual("AMD");
});

test(`batch data works`, async () => {
  const data = await alpha.data.batch("MSFT,FB,AAPL");

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Stock Quotes"]).toBeDefined();
  expect(data["Stock Quotes"].length).toEqual(3);
  data["Stock Quotes"].forEach((quote: any) => {
    expect(quote["1. symbol"]).toBeDefined();
  });
  expect(data["Stock Quotes"][0]["1. symbol"]).toEqual("MSFT");
  expect(data["Stock Quotes"][1]["1. symbol"]).toEqual("FB");
  expect(data["Stock Quotes"][2]["1. symbol"]).toEqual("AAPL");
});

test(`batch data works with array input`, async () => {
  const data = await alpha.data.batch("MSFT", "FB", "AAPL");

  expect(data["Meta Data"]).toBeDefined();
  expect(data["Stock Quotes"]).toBeDefined();
  expect(data["Stock Quotes"].length).toEqual(3);
  data["Stock Quotes"].forEach((quote: any) => {
    expect(quote["1. symbol"]).toBeDefined();
  });
  expect(data["Stock Quotes"][0]["1. symbol"]).toEqual("MSFT");
  expect(data["Stock Quotes"][1]["1. symbol"]).toEqual("FB");
  expect(data["Stock Quotes"][2]["1. symbol"]).toEqual("AAPL");
});
