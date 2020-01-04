import { APIClient } from "./APIClient";

type CryptoFn = (symbol: string, market: string) => Promise<any>;

export interface CryptoClient {
  daily: CryptoFn;
  weekly: CryptoFn;
  monthly: CryptoFn;
}

export default (apiClient: APIClient): CryptoClient => {
  return {
    daily: (symbol: string, market: string) => apiClient.fn("DIGITAL_CURRENCY_DAILY")({ symbol, market }),
    weekly: (symbol: string, market: string) => apiClient.fn("DIGITAL_CURRENCY_WEEKLY")({ symbol, market }),
    monthly: (symbol: string, market: string) => apiClient.fn("DIGITAL_CURRENCY_MONTHLY")({ symbol, market })
  };
};
