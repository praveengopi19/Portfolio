import { COMMAND_RENDER, CLEAR_TERMINAL } from '../Actions/actionTypes';

const cmdReducer = (state, action) => {
  switch (action.type) {
    case COMMAND_RENDER:
      return [...state, ...action.payload];
    case CLEAR_TERMINAL:
      return [...action.payload];
    default:
      return state;
  }
};

export { cmdReducer };
