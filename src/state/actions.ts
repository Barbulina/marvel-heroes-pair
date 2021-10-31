import {
  fetchByType,
  fetchSearchCharacters,
} from "../services/marvalApiServices";

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
    dispatch(isLoading(true));
    fetchSearchCharacters({ limit, nameStartsWith, filter })
      .then((response: any) => {
        const characters = response.data.data.results;
        dispatch(loadCharacters(characters));
      })
      .catch((err) => console.log("Error", err))
      .finally(() => dispatch(isLoading(false)));
  };
};
