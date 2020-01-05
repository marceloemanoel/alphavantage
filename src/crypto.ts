import { APIClient } from "./APIClient";

export default (apiClient: APIClient) => {
  return {
    daily: (symbol: string, market: string) => apiClient.fn("DIGITAL_CURRENCY_DAILY")({ symbol, market }),
    weekly: (symbol: string, market: string) => apiClient.fn("DIGITAL_CURRENCY_WEEKLY")({ symbol, market }),
    monthly: (symbol: string, market: string) => apiClient.fn("DIGITAL_CURRENCY_MONTHLY")({ symbol, market })
  };
};
