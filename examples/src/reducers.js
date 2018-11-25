import { counterReducer } from './examples/CounterRedux';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  counter: counterReducer
});
