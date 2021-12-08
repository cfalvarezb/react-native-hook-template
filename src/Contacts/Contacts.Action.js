export const GET_CONTACTS_REQUEST = 'GET_CONTACTS_REQUEST';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAIL = 'GET_CONTACTS_FAIL';

export const getContactsRequest = data => {
  return {type: GET_CONTACTS_REQUEST, payload: {data}};
};
export const getContactsSuccess = data => {
  return {type: GET_CONTACTS_SUCCESS, payload: {data}};
};
export const getContactsFail = err => {
  return {type: GET_CONTACTS_FAIL, payload: {err}};
};