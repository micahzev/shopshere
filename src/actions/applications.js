import * as types from '../constants/ActionTypes';
import { fetchApplicationsAPI, patchApplicationAPI } from '~/src/helpers/ClientAPI';

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
