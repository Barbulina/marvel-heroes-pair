import axios from "axios";
import md5 from "md5";
import { config } from "../config-api";
import { BASE_URL } from "../constants";

export enum ACTIONS {
  GET_CHARACTERS = "GET_CHARACTERS",
}

export const loadCharacters = (characters: any) => {
  return { type: ACTIONS.GET_CHARACTERS, payload: characters };
};

export const getCharacters = (limit = 50) => {
  return function (dispatch: any) {
    const ts = new Date().getTime();
    const hash = md5(ts + config.privateKey + config.publicKey).toString();
    axios
      .get(BASE_URL + `v1/public/characters?limit=${limit}`, {
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
      .catch((err) => console.log("Error", err));
  };
};
