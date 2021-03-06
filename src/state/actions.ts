import { CharacterModel } from "../components/Character/character.model";

import {
  DEFAULT_LIMIT,
  fetchByType,
  fetchCharactersById,
  fetchSearchCharacters,
} from "../services/marvalApiServices";

export enum ACTIONS {
  GET_CHARACTERS = "GET_CHARACTERS",
  GET_CHARACTER_BY_ID = "GET_CHARACTER_BY_ID",
  GET_TOTAL_CHARACTERS = "GET_TOTAL_CHARACTERS",
  CLEAR_CHARACTERS = "CLEAR_CHARACTERS",
  IS_LOADING = "IS_LOADING",
  GET_TYPES = "GET_TYPES",
  GET_ALBUM_CHARACTERS = "GET_ALBUM_CHARACTERS",
  ADD_CHARACTER_TO_ALBUM = "ADD_CHARACTER_TO_ALBUM",
  REMOVE_CHARACTER_TO_ALBUM = "REMOVE_CHARACTER_TO_ALBUM",
}

export const clearCharacters = () => {
  return { type: ACTIONS.CLEAR_CHARACTERS };
};

export const loadCharacters = (characters: CharacterModel[]) => {
  return { type: ACTIONS.GET_CHARACTERS, payload: characters };
};

export const loadCharacterById = (character: CharacterModel) => {
  return { type: ACTIONS.GET_CHARACTER_BY_ID, payload: character };
};

export const loadTotalCharacters = (total: number) => {
  return { type: ACTIONS.GET_TOTAL_CHARACTERS, payload: total };
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

export const addCharacterToAlbum = (character: CharacterModel) => {
  return { type: ACTIONS.ADD_CHARACTER_TO_ALBUM, payload: character };
};

export const removeCharacterToAlbum = (character: CharacterModel) => {
  return { type: ACTIONS.REMOVE_CHARACTER_TO_ALBUM, payload: character };
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

export const getCharacterById = (
  id: number,
  allCharacters: Array<CharacterModel> = []
) => {
  return function (dispatch: any) {
    const characterStored: CharacterModel | undefined = allCharacters.find(
      (char: CharacterModel) => +char.id === +id
    );

    if (characterStored) {
      dispatch(loadCharacterById(characterStored));
    } else {
      fetchCharactersById(id)
        .then((response: any) => {
          const character = response.data.data.results[0];
          dispatch(loadCharacterById(character));
        })
        .catch((err) => console.error(err))
        .finally(() => dispatch(isLoading(false)));
    }
  };
};

export const getCharacters = ({
  limit = DEFAULT_LIMIT,
  nameStartsWith = undefined,
  filter = undefined,
  offset = undefined,
}: {
  limit: number;
  nameStartsWith: string | undefined;
  filter?: { type: String; id: number };
  offset?: number;
}) => {
  return function (dispatch: any) {
    dispatch(isLoading(true));
    if (!offset) dispatch(clearCharacters());
    fetchSearchCharacters({ limit, nameStartsWith, filter, offset })
      .then((response: any) => {
        const characters = response.data.data.results;
        const totalCharactersToSearch = response.data.data.total;
        dispatch(loadTotalCharacters(totalCharactersToSearch));
        dispatch(loadCharacters(characters));
      })
      .catch((err) => console.log("Error", err))
      .finally(() => dispatch(isLoading(false)));
  };
};
