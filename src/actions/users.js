import * as types from '../constants/ActionTypes';
import { addUserAPI, fetchUsersAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function unboundAddUser(data) {
  return {
    type: types.ADD_USER,
    payload: {
      promise: addUserAPI(data)
    }
  }
}
;

export function fetchUsers(options) {
  return {
    type: types.FETCH_USERS,
    payload: {
      promise: fetchUsersAPI()
    }
  }
}
;
