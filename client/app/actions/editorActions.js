import 'whatwg-fetch';
import dashboardApi from '../api/dashboardApi';

// Export Constants
export const LOAD_DASHBOARD = 'LOAD_DASHBOARD';
export const CREATE_DASHBOARD = 'CREATE_DASHBOARD';
export const SAVE_DASHBOARD = 'SAVE_DASHBOARD';
export const DELETE_DASHBOARD = 'DELETE_DASHBOARD';

export const STATUS_SUCCESS = 'STATUS_SUCCESS';
export const STATUS_FAIL = 'STATUS_FAIL';

export function loadDashboard(config) {
  return {
    type: LOAD_DASHBOARD,
    config,
  };
}

export function statusSuccess() {
  return {
    type: STATUS_SUCCESS,
    payload: { ok: true },
  };
}

export function statusFail(response) {
  return {
    type: STATUS_FAIL,
    payload: { ok: false, response },
  };
}

export function fetchDashboard(id) {
  return (dispatch) => {
    dashboardApi.fetchDashboard(id)
      .then((config) => {
        if (config) {
          dispatch(loadDashboard(config));
        } else {
          dispatch(statusFail('Config is null'));
        }
        return config;
      })
      .catch(e => dispatch(statusFail(e)));
  };
}
