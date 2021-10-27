import axios from "axios";
import md5 from "md5";
import { config } from "../config-api";
import { BASE_URL } from "../constants";

interface SeriesParamsModel {
  limit?: number;
}

export const fetchSeries = ({
  limit = 50,
}: SeriesParamsModel): Promise<any> => {
  const ts = new Date().getTime();
  const hash = md5(ts + config.privateKey + config.publicKey).toString();

  let url = BASE_URL + `v1/public/series?limit=${limit}`;
  return axios.get(url, {
    params: {
      ts,
      hash,
      apikey: config.publicKey,
    },
  });
};
