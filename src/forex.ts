import { APIClient } from "./APIClient";

export interface ForexClient {
  rate(fromCurrency: string, toCurrency: string): Promise<any>;
}

export default (apiClient: APIClient): ForexClient => {
  return {
    rate: (from_currency, to_currency) => apiClient.fn("CURRENCY_EXCHANGE_RATE")({ from_currency, to_currency })
  };
};
