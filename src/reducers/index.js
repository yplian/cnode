import { combineReducers } from 'redux';
import utils from './utils';
import topics from './topics';
import detail from './detail';
import user from './user';
import message from './message';
import collect from './collect';

const reducerRoot = combineReducers({
  utils,
  topics,
  detail,
  user,
  message,
  collect,
})

export default reducerRoot