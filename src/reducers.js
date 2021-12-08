import {combineReducers} from 'redux';
import {getProfile} from './Profile/Profile.Reducer';
import {getFollower} from './Follower/Follower.Reducer';
import { getContacts } from './Contacts/Contacts.Reducer';
import {CLEAR_NETWORK_FAIL, SEND_NETWORK_FAIL} from './actions';

const initialState = {fetching: false, data: null, err: null};

const sendNetworkFail = (state = initialState, action) => {
  switch (action.type) {
    case SEND_NETWORK_FAIL:
      return {
        err: action.payload.err,
      };
    case CLEAR_NETWORK_FAIL:
      return {
        err: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({sendNetworkFail, getProfile, getFollower, getContacts});
export default rootReducer;
