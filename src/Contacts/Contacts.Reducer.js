import {
    GET_CONTACTS_FAIL,
    GET_CONTACTS_REQUEST,
    GET_CONTACTS_SUCCESS,
  } from './Contacts.Action';
  
  const initialState = {fetching: false, data: null, err: null};
  
  export const getContacts = (state = initialState, action) => {
    switch (action.type) {
      case GET_CONTACTS_REQUEST:
        return {
          fetching: true,
          data: action.payload.data,
          err: null,
        };
      case GET_CONTACTS_SUCCESS:
        return {
          fetching: false,
          data: action.payload.data,
          err: null,
        };
      case GET_CONTACTS_FAIL:
        return {
          fetching: false,
          data: null,
          err: action.payload.err,
        };
      default:
        return state;
    }
  };
  