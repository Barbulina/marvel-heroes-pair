import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { CharacterModel } from "../components/Character/character.model";
import { ACTIONS } from "./actions";

// TODO create interface for state

export interface StateModel {
  loading: boolean;
  characters: Array<CharacterModel> | undefined;
  totalCharacters: number;
  types: Array<any>;
}

const initialState = {
  loading: false,
  characters: undefined,
  totalCharacters: undefined,
  types: [],
};

const charactersReducer = (state = initialState, action: any): any => {
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
    default:
      return state;
  }
};

export default createStore(charactersReducer, applyMiddleware(thunkMiddleware));
