import { APIClient } from "./APIClient";

export default (apiClient: APIClient) => {
  return {
    rate: (fromCurrency: string, toCurrency: string) =>
      apiClient.fn("CURRENCY_EXCHANGE_RATE")({
        from_currency: fromCurrency,
        to_currency: toCurrency
      })
  };
};
