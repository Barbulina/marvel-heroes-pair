import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { ACTIONS } from "./actions";

const initialState = {
  loading: false,
  characters: [],
  types: [],
};

const charactersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTIONS.GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
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
    default:
      return state;
  }
};

export default createStore(charactersReducer, applyMiddleware(thunkMiddleware));
