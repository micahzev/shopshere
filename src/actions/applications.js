import * as types from '../constants/ActionTypes';
import { fetchApplicationsAPI, patchApplicationAPI, deleteApplicationAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function fetchApplications() {
  return {
    type: types.FETCH_APPLICATIONS,
    payload: {
      promise: fetchApplicationsAPI()
    }
  }
};

export function unboundPatchApplication(data) {
  return {
    type: types.EDIT_APPLICATION,
    payload: {
      promise: patchApplicationAPI(data)
    }
  }
};

export function deleteApplication(object) {
  return {
    type: types.DELETE_APPLICATION,
    payload: {
      promise: deleteApplicationAPI(object)
    }
  }
};
