import { combineReducers } from 'redux';
import promptReducre from './promptReducer';


export const configReducer = combineReducers({
    //reducers
    prompt: promptReducre

})