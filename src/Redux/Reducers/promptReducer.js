import { COMMAND_RENDER, CLEAR_TERMINAL } from '../Actions/actionTypes';

export default function (state = [{ name: 'mainInput', Date: Date.now() }], action) {
  switch (action.type) {
    case COMMAND_RENDER:
      const war = state.concat(action.payload);
      return war;
    case CLEAR_TERMINAL:
      return action.payload;
    default:
      // console.log(state);
      return state;
  }
}
