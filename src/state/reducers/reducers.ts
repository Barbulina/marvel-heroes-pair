import { CharacterModel } from "../../components/Character/character.model";
import { ACTIONS } from "../actions";
import { initialState } from "../configureStore";

const localStorageAlbumName = "currentAlbum";

export const charactersReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ACTIONS.GET_CHARACTERS:
      return {
        ...state,
        characters: [...(state.characters || []), ...action.payload],
      };
    case ACTIONS.GET_TOTAL_CHARACTERS:
      return {
        ...state,
        totalCharacters: action.payload,
      };
    case ACTIONS.GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ACTIONS.IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.CLEAR_CHARACTERS:
      return {
        ...state,
        characters: [],
      };

    case ACTIONS.REMOVE_CHARACTER_TO_ALBUM:
      return {
        ...state,
        album: removeCharacterToAlbum(state.album, action),
      };

    case ACTIONS.ADD_CHARACTER_TO_ALBUM:
      return {
        ...state,
        album: addCharacterToAlbum(state.album, action),
      };

    default:
      return state;
  }
};

const addCharacterToAlbum = (
  currentAlbum: Array<CharacterModel>,
  action: any
): Array<CharacterModel> => {
  const album: CharacterModel[] = [...currentAlbum];
  album.push(action.payload);
  saveAlbumInLocalstorage(album);
  return album;
};

const removeCharacterToAlbum = (
  currentAlbum: Array<CharacterModel>,
  action: any
): Array<CharacterModel> => {
  const album: CharacterModel[] = [...currentAlbum];
  const indexToDelete: number = album.findIndex(
    (characters) => characters.id === action.payload.id
  );
  album.splice(indexToDelete, 1);
  saveAlbumInLocalstorage(album);
  return album;
};

const saveAlbumInLocalstorage = (album: Array<CharacterModel>): void => {
  localStorage.setItem(localStorageAlbumName, JSON.stringify(album));
};

export const recoverAlbumFromLocalstorage = (): Array<CharacterModel> => {
  const album: Array<CharacterModel> = JSON.parse(
    localStorage.getItem(localStorageAlbumName) || "[]"
  );

  return album;
};
