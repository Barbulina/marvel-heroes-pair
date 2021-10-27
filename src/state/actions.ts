import axios from "axios";
import md5 from "md5";
import { config } from "../config-api";
import { BASE_URL } from "../constants";
import { fetchSeries } from "../services/seriesServices";

export enum ACTIONS {
  GET_CHARACTERS = "GET_CHARACTERS",
  IS_LOADING = "IS_LOADING",
  GET_SERIES = "GET_SERIES",
}

export const loadCharacters = (characters: any) => {
  return { type: ACTIONS.GET_CHARACTERS, payload: characters };
};

export const isLoading = (isLoading: boolean) => {
  return { type: ACTIONS.IS_LOADING, payload: isLoading };
};

export const loadSeries = (series: any) => {
  return { type: ACTIONS.GET_SERIES, payload: series };
};

export const isLoadingSeries = (isLoading: boolean) => {
  return { type: ACTIONS.IS_LOADING, payload: isLoading };
};

export const getSeries = () => {
  return function (dispatch: any) {
    dispatch(isLoading(true));
    fetchSeries({})
      .then((response: any) => {
        const series = response.data.data.results;
        dispatch(loadSeries(series));
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(isLoading(false)));
  };
};

export const getCharacters = ({
  limit = 50,
  nameStartsWith = undefined,
  events = undefined,
}: {
  limit: number;
  nameStartsWith: string | undefined;
  events?: Array<String>;
}) => {
  return function (dispatch: any) {
    const ts = new Date().getTime();
    const hash = md5(ts + config.privateKey + config.publicKey).toString();

    dispatch(isLoading(true));
    let url = BASE_URL + `v1/public/characters?limit=${limit}`;
    if (nameStartsWith) {
      url += `&nameStartsWith=${nameStartsWith}`;
    }
    if (events) {
      url += `events=${events}`;
    }
    axios
      .get(url, {
        params: {
          ts,
          hash,
          apikey: config.publicKey,
        },
      })
      .then((response: any) => {
        const characters = response.data.data.results;
        dispatch(loadCharacters(characters));
      })
      .catch((err) => console.log("Error", err))
      .finally(() => dispatch(isLoading(false)));
  };
};
