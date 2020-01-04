import { APIClient } from "./APIClient";

export default (apiClient: APIClient) => {
  return {
    sector: apiClient.fn("SECTOR")
  };
};
