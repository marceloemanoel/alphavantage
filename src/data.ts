import { APIClient } from "./APIClient";
import { DataFunction } from "./function-types";

export type OutputSize = "compact" | "full";
export type DataType = "json" | "csv";
export type TimeSeriesInterval = "1min" | "5min" | "15min" | "30min" | "60min";

export interface SearchResult {
  bestMatches: SearchResultMatch[];
}

export interface SearchResultMatch {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

export default (apiClient: APIClient) => {
  /**
   * Util function to get the timeseries data.
   *
   * @TODO: Add input validation.
   *
   * @param {String} fn
   *   The enum fn available for timeseries data.
   *
   * @returns {Function}
   *   A timeseries function to accept user data that returns a promise.
   */
  const series = (fn: DataFunction) => (
    symbol: string,
    outputsize: OutputSize = "compact",
    datatype: DataType = "json",
    interval: TimeSeriesInterval = "1min"
  ) =>
    apiClient.fn(fn)({
      symbol,
      interval,
      outputsize,
      datatype
    });

  return {
    intraday: series("TIME_SERIES_INTRADAY"),
    daily: series("TIME_SERIES_DAILY"),
    daily_adjusted: series("TIME_SERIES_DAILY_ADJUSTED"),
    weekly: series("TIME_SERIES_WEEKLY"),
    weekly_adjusted: series("TIME_SERIES_WEEKLY_ADJUSTED"),
    monthly: series("TIME_SERIES_MONTHLY"),
    monthly_adjusted: series("TIME_SERIES_MONTHLY_ADJUSTED"),
    quote: series("GLOBAL_QUOTE"),
    search: (...keywords: string[]): Promise<SearchResult> => apiClient.fn("SYMBOL_SEARCH")({ keywords }),
    batch: (...symbols: string[]) => apiClient.fn("BATCH_STOCK_QUOTES")({ symbols: symbols.join(",") })
  };
};
