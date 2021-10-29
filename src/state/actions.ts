import axios from "axios";
import md5 from "md5";
import { config } from "../config-api";
import { BASE_URL } from "../constants";
import { fetchByType } from "../services/seriesServices";

export enum ACTIONS {
  GET_CHARACTERS = "GET_CHARACTERS",
  IS_LOADING = "IS_LOADING",
  GET_TYPES = "GET_TYPES",
}

export const loadCharacters = (characters: any) => {
  return { type: ACTIONS.GET_CHARACTERS, payload: characters };
};

export const isLoading = (isLoading: boolean) => {
  return { type: ACTIONS.IS_LOADING, payload: isLoading };
};

export const loadTypes = (series: any) => {
  return { type: ACTIONS.GET_TYPES, payload: series };
};

export const isLoadingSeries = (isLoading: boolean) => {
  return { type: ACTIONS.IS_LOADING, payload: isLoading };
};

export const getTypes = (type: string, nameStartsWith: string) => {
  return function (dispatch: any) {
    dispatch(isLoading(true));
    fetchByType({ type, nameStartsWith, limit: 10 })
      .then((response: any) => {
        const results = response.data.data.results.map((item: any) => {
          const label = item.title || item.fullName || item.name;
          const parsedItem = {
            value: label,
            id: item.id,
          };
          return parsedItem;
        });
        dispatch(loadTypes(results));
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(isLoading(false)));
  };
};

export const getCharacters = ({
  limit = 50,
  nameStartsWith = undefined,
  filter = undefined,
}: {
  limit: number;
  nameStartsWith: string | undefined;
  filter?: { type: String; id: number };
}) => {
  return function (dispatch: any) {
    const ts = new Date().getTime();
    const hash = md5(ts + config.privateKey + config.publicKey).toString();

    dispatch(isLoading(true));

    const url = getUrl(nameStartsWith, limit, filter);

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

const getUrl = function (
  nameStartsWith: string | undefined,
  limit = 50,
  filter?: { type: String; id: number }
): string {
  let url = BASE_URL;
  if (!filter) {
    url += `characters?limit=${limit}`;
  } else {
    url += `${filter.type}/${filter.id}/characters?limit=${limit}`;
  }
  if (nameStartsWith) {
    url += `&nameStartsWith=${nameStartsWith}`;
  }
  return url;
};
