import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { CharacterModel } from "../components/Character/character.model";
import {
  charactersReducer,
  recoverAlbumFromLocalstorage,
} from "./reducers/reducers";

export interface StateModel {
  loading: boolean;
  characters: Array<CharacterModel> | undefined;
  totalCharacters: number;
  types: Array<any>;
  album: Array<CharacterModel>;
}

export const initialState = {
  loading: false,
  characters: undefined,
  totalCharacters: undefined,
  types: [],
  album: recoverAlbumFromLocalstorage(),
};

export default createStore(charactersReducer, applyMiddleware(thunkMiddleware));
