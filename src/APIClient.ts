import fetch from "cross-fetch";
import { AlphaVantageOptions } from ".";
import { FunctionType } from "./function-types";
import { polish } from "./util";

export class APIClient {
  constructor(private config: AlphaVantageOptions) {}

  private url = (params: any) => {
    params = Object.keys(params)
      .map(type => {
        let value = params[type];
        if (value !== undefined) {
          return `${type}=${value}`;
        }

        return undefined;
      })
      .filter(value => value !== undefined)
      .join("&");

    return `https://www.alphavantage.co/query?apikey=${this.config.key}&${params}`;
  };

  public fn = (type: FunctionType) => (params?: any) => {
    return fetch(this.url({ ...params, function: type }))
      .then(res => {
        if (res.status !== 200) {
          throw `An AlphaVantage error occurred. ${res.status}: ${res.text()}`;
        }

        return res.json();
      })
      .then(data => {
        if (
          data["Meta Data"] === undefined &&
          data["Realtime Currency Exchange Rate"] === undefined &&
          data["Global Quote"] === undefined &&
          data["bestMatches"] === undefined
        ) {
          throw `An AlphaVantage error occurred. ${data["Information"] || JSON.stringify(data)}`;
        }

        return polish(data);
      });
  };
}
