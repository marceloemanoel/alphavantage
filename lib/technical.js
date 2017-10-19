'use strict';

module.exports = config => {
  const util = require('./util')(config);

  /**
   * A generic function generator for sma-like technicals.
   * 
   * @param {String} fn
   *   The sma-like function to use 
   */
  const SMA_LIKE = fn => (symbol, interval, time_period, series_type) =>
    util.fn(fn)({ symbol, interval, time_period, series_type });

  /**
   * A generic function generator for macdext-like technicals.
   * 
   * @param {String} fn
   *   The macdext-like function to use 
   */
  const MACDEXT_LIKE = fn => (
    symbol,
    interval,
    series_type,
    fastperiod = 12,
    slowperiod = 26,
    signalperiod = 9,
    fastmatype,
    slowmatype,
    signalmatype
  ) =>
    util.fn(fn)({
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

  return {
    sma: SMA_LIKE('SMA'),
    ema: SMA_LIKE('EMA'),
    wma: SMA_LIKE('WMA'),
    dema: SMA_LIKE('DEMA'),
    tema: SMA_LIKE('TEMA'),
    trima: SMA_LIKE('TRIMA'),
    kama: SMA_LIKE('KAMA'),
    mama: (symbol, interval, series_type, fastlimit = 0.01, slowlimit = 0.01) =>
      util.fn('MAMA')({ symbol, interval, series_type, fastlimit, slowlimit }),
    t3: SMA_LIKE('T3'),
    macd: MACDEXT_LIKE('MACD'),
    macdext: MACDEXT_LIKE('MACDEXT'),
    rsi: SMA_LIKE('RSI'),
    mom: SMA_LIKE('MOM'),
    cmo: SMA_LIKE('CMO'),
    roc: SMA_LIKE('ROC'),
    rocr: SMA_LIKE('ROCR'),
    trix: SMA_LIKE('TRIX'),
    midpoint: SMA_LIKE('MIDPOINT')
  };
};