import * as types from '../constants/ActionTypes';
import { addUserAPI, fetchUsersAPI, fetchOneUserAPI, patchUserAPI, deleteUserAPI } from '~/src/helpers/ClientAPI';

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

export function fetchOneUser(options) {
  return {
    type: types.FETCH_ONE_USER,
    payload: {
      promise: fetchOneUserAPI(options)
    }
  }
}
;

export function unboundPatchUser(data) {
  return {
    type: types.EDIT_USER,
    payload: {
      promise: patchUserAPI(data)
    }
  }
}
;

export function deleteUser(object) {
  return {
    type: types.DELETE_PRODUCT,
    payload: {
      promise: deleteUserAPI(object)
    }
  }
}
