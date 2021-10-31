import axios from "axios";
import md5 from "md5";
import { config } from "../config-api";
import { BASE_URL } from "../constants";

interface SeriesParamsModel {
  type: string;
  nameStartsWith: string;
  limit?: number;
}

export const fetchSearchCharacters = ({
  limit = 50,
  nameStartsWith = undefined,
  filter = undefined,
}: {
  limit: number;
  nameStartsWith: string | undefined;
  filter?: { type: String; id: number };
}) => {
  const url = getSearchCharactersUrl(nameStartsWith, limit, filter);

  return axios.get(url, {
    params: getApiConfigParams(),
  });
};

export const fetchByType = ({
  type,
  nameStartsWith,
  limit = 50,
}: SeriesParamsModel): Promise<any> => {
  let url = BASE_URL + `${type}?limit=${limit}`;
  if (nameStartsWith) {
    url += `&nameStartsWith=${nameStartsWith}`;
  }
  return axios.get(url, {
    params: getApiConfigParams(),
  });
};

const getSearchCharactersUrl = function (
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

const getApiConfigParams = function (): {
  ts: number;
  hash: string;
  apikey: string;
} {
  const ts = new Date().getTime();
  const hash = md5(ts + config.privateKey + config.publicKey).toString();
  const apikey = config.publicKey;
  return { hash, ts, apikey };
};
