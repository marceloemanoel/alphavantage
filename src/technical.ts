import { APIClient } from "./APIClient";
import { TimeSeriesInterval } from "./data";
import { APOLikeFunction, HTLikeFunction, MACDEXTLikeFunction, SMALikeFunction } from "./function-types";

type TechnicalInterval = TimeSeriesInterval | "daily" | "weekly" | "monthly";

type SeriesType = "close" | "open" | "high" | "low";

const SIMPLE_MOVING_AVERAGE = 0;
const EXPONENTIAL_MOVING_AVERAGE = 1;
const WEIGHTED_MOVING_AVERAGE = 2;
const DOUBLE_EXPONENTIAL_MOVING_AVERAGE = 3;
const TRIPLE_EXPONENTIAL_MOVING_AVERAGE = 4;
const TRIANGULAR_MOVING_AVERAGE = 5;
const T3_MOVING_AVERAGE = 6;
const KAUFMAN_ADAPTIVE_MOVING_AVERAGE = 7;
const MESA_ADAPTIVE_MOVING_AVERAGE = 8;

type MovingAverageType =
  | typeof SIMPLE_MOVING_AVERAGE
  | typeof EXPONENTIAL_MOVING_AVERAGE
  | typeof WEIGHTED_MOVING_AVERAGE
  | typeof DOUBLE_EXPONENTIAL_MOVING_AVERAGE
  | typeof TRIPLE_EXPONENTIAL_MOVING_AVERAGE
  | typeof TRIANGULAR_MOVING_AVERAGE
  | typeof T3_MOVING_AVERAGE
  | typeof KAUFMAN_ADAPTIVE_MOVING_AVERAGE
  | typeof MESA_ADAPTIVE_MOVING_AVERAGE;

export default (apiClient: APIClient) => {
  /**
   * A generic function generator for sma-like technicals.
   *
   * @param {String} fn
   *   The sma-like function to use
   */
  const sma = (fn: SMALikeFunction) => (
    symbol: string,
    interval: TechnicalInterval,
    timePeriod: number,
    seriesType: SeriesType
  ) => apiClient.fn(fn)({ symbol, interval, time_period: timePeriod, series_type: seriesType });

  /**
   * A generic function generator for macdext-like technicals.
   *
   * @param {String} fn
   *   The macdext-like function to use
   */
  const MACDEXT_LIKE = (fn: MACDEXTLikeFunction) => (
    symbol: string,
    interval: TechnicalInterval,
    series_type: SeriesType,
    fastperiod: number = 12,
    slowperiod: number = 26,
    signalperiod: number = 9,
    fastmatype?: MovingAverageType,
    slowmatype?: MovingAverageType,
    signalmatype?: MovingAverageType
  ) =>
    apiClient.fn(fn)({
      symbol,
      interval,
      series_type,
      fastperiod,
      slowperiod,
      signalperiod,
      fastmatype,
      slowmatype,
      signalmatype
    });

  /**
   * A generic function generator for apo-like technicals.
   *
   * @param {String} fn
   *   The apo-like function to use
   */
  const APO_LIKE = (fn: APOLikeFunction) => (
    symbol: string,
    interval: TechnicalInterval,
    series_type: SeriesType,
    fastperiod: number,
    slowperiod: number,
    matype: MovingAverageType
  ) => apiClient.fn(fn)({ symbol, interval, series_type, fastperiod, slowperiod, matype });

  /**
   * A generic function generator for ht-like technicals.
   *
   * @param {String} fn
   *   The ht-like function to use
   */
  const HT_LIKE = (fn: HTLikeFunction) => (symbol: string, interval: TechnicalInterval, series_type: SeriesType) =>
    apiClient.fn(fn)({ symbol, interval, series_type });

  return {
    sma: sma("SMA"),
    ema: sma("EMA"),
    wma: sma("WMA"),
    dema: sma("DEMA"),
    tema: sma("TEMA"),
    trima: sma("TRIMA"),
    kama: sma("KAMA"),
    mama: (symbol: string, interval: TechnicalInterval, seriesType: SeriesType, fastLimit = 0.01, slowLimit = 0.01) =>
      apiClient.fn("MAMA")({ symbol, interval, series_type: seriesType, fastlimit: fastLimit, slowlimit: slowLimit }),
    t3: sma("T3"),
    macd: MACDEXT_LIKE("MACD"),
    macdext: MACDEXT_LIKE("MACDEXT"),
    stoch: (
      symbol: string,
      interval: TechnicalInterval,
      fastKPeriod?: number,
      slowKPeriod?: number,
      slowDPeriod?: number,
      slowKMaType?: MovingAverageType,
      slowDMatype?: MovingAverageType
    ) =>
      apiClient.fn("STOCH")({
        symbol,
        interval,
        fastkperiod: fastKPeriod,
        slowkperiod: slowKPeriod,
        slowdperiod: slowDPeriod,
        slowkmatype: slowKMaType,
        slowdmatype: slowDMatype
      }),

    stochf: (
      symbol: string,
      interval: TechnicalInterval,
      fastKPeriod?: number,
      fastDPeriod?: number,
      fastDMaType?: MovingAverageType
    ) =>
      apiClient.fn("STOCHF")({
        symbol,
        interval,
        fastkperiod: fastKPeriod,
        fastdperiod: fastDPeriod,
        fastdmatype: fastDMaType
      }),

    rsi: sma("RSI"),

    stochrsi: (
      symbol: string,
      interval: TechnicalInterval,
      timePeriod: number,
      seriesType: SeriesType,
      fastKPeriod?: number,
      fastDPeriod?: number,
      fastDMaType?: MovingAverageType
    ) =>
      apiClient.fn("STOCHRSI")({
        symbol,
        interval,
        time_period: timePeriod,
        series_type: seriesType,
        fastkperiod: fastKPeriod,
        fastdperiod: fastDPeriod,
        fastdmatype: fastDMaType
      }),
    willr: sma("WILLR"),
    adx: sma("ADX"),
    adxr: sma("ADXR"),
    apo: APO_LIKE("APO"),
    ppo: APO_LIKE("PPO"),
    mom: sma("MOM"),
    bop: sma("BOP"),
    cci: sma("CCI"),
    cmo: sma("CMO"),
    roc: sma("ROC"),
    rocr: sma("ROCR"),
    aroon: sma("AROON"),
    aroonosc: sma("AROONOSC"),
    mfi: sma("MFI"),
    trix: sma("TRIX"),

    ultosc: (
      symbol: string,
      interval: TechnicalInterval,
      timePeriod1?: number,
      timePeriod2?: number,
      timePeriod3?: number
    ) =>
      apiClient.fn("ULTOSC")({
        symbol,
        interval,
        timeperiod1: timePeriod1,
        timeperiod2: timePeriod2,
        timeperiod3: timePeriod3
      }),
    dx: sma("DX"),
    minus_di: sma("MINUS_DI"),
    plus_di: sma("PLUS_DI"),
    minus_dm: sma("MINUS_DM"),
    plus_dm: sma("PLUS_DM"),

    bbands: (
      symbol: string,
      interval: TechnicalInterval,
      timePeriod: number,
      seriesType: SeriesType,
      nbdevup: number,
      nbdevdn: number,
      movingAverageType: MovingAverageType
    ) =>
      apiClient.fn("BBANDS")({
        symbol,
        interval,
        time_period: timePeriod,
        series_type: seriesType,
        nbdevup,
        nbdevdn,
        matype: movingAverageType
      }),

    midpoint: sma("MIDPOINT"),
    midprice: sma("MIDPRICE"),

    sar: (symbol: string, interval: TechnicalInterval, acceleration?: number, maximum?: number) =>
      apiClient.fn("SAR")({ symbol, interval, acceleration, maximum }),

    trange: sma("TRANGE"),
    atr: sma("ATR"),
    natr: sma("NATR"),
    ad: sma("AD"),
    adosc: (symbol: string, interval: TechnicalInterval, fastPeriod?: number, slowPeriod?: number) =>
      apiClient.fn("ADOSC")({ symbol, interval, fastperiod: fastPeriod, slowperiod: slowPeriod }),

    obv: sma("OBV"),
    ht_trendline: HT_LIKE("HT_TRENDLINE"),
    ht_sine: HT_LIKE("HT_SINE"),
    ht_trendmode: HT_LIKE("HT_TRENDMODE"),
    ht_dcperiod: HT_LIKE("HT_DCPERIOD"),
    ht_dcphase: HT_LIKE("HT_DCPHASE"),
    ht_dcphasor: HT_LIKE("HT_PHASOR")
  };
};
