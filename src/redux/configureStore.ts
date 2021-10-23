import { createStore } from "redux";

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "RESET":
      return {
        ...state,
        count: 0,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default createStore(counterReducer);
