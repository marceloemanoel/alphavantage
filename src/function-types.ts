export type CryptoFunction = "DIGITAL_CURRENCY_DAILY" | "DIGITAL_CURRENCY_WEEKLY" | "DIGITAL_CURRENCY_MONTHLY";
export type DataFunction =
  | "TIME_SERIES_INTRADAY"
  | "TIME_SERIES_DAILY"
  | "TIME_SERIES_DAILY_ADJUSTED"
  | "TIME_SERIES_WEEKLY"
  | "TIME_SERIES_WEEKLY_ADJUSTED"
  | "TIME_SERIES_MONTHLY"
  | "TIME_SERIES_MONTHLY_ADJUSTED"
  | "GLOBAL_QUOTE"
  | "BATCH_STOCK_QUOTES"
  | "SYMBOL_SEARCH";

export type SMALikeFunction =
  | "SMA"
  | "EMA"
  | "WMA"
  | "DEMA"
  | "TEMA"
  | "TRIMA"
  | "KAMA"
  | "MAMA"
  | "VWAP"
  | "T3"
  | "RSI"
  | "WILLR"
  | "ADX"
  | "ADXR"
  | "MOM"
  | "BOP"
  | "CCI"
  | "CMO"
  | "ROC"
  | "ROCR"
  | "AROON"
  | "AROONOSC"
  | "MFI"
  | "TRIX"
  | "DX"
  | "MINUS_DI"
  | "PLUS_DI"
  | "MINUS_DM"
  | "PLUS_DM"
  | "MIDPOINT"
  | "MIDPRICE"
  | "TRANGE"
  | "ATR"
  | "NATR"
  | "AD"
  | "OBV";

export type MACDEXTLikeFunction = "MACD" | "MACDEXT";

export type APOLikeFunction = "APO" | "PPO";

export type HTLikeFunction = "HT_TRENDLINE" | "HT_SINE" | "HT_TRENDMODE" | "HT_DCPERIOD" | "HT_DCPHASE" | "HT_PHASOR";

export type FunctionType =
  | DataFunction
  | "CURRENCY_EXCHANGE_RATE"
  | "FX_INTRADAY"
  | "FX_DAILY"
  | "FX_WEEKLY"
  | "FX_MONTHLY"
  | "CURRENCY_EXCHANGE_RATE"
  | CryptoFunction
  | SMALikeFunction
  | MACDEXTLikeFunction
  | APOLikeFunction
  | HTLikeFunction
  | "STOCH"
  | "STOCHF"
  | "STOCHRSI"
  | "ULTOSC"
  | "BBANDS"
  | "SAR"
  | "ADOSC"
  | "SECTOR";
