import 'whatwg-fetch';
import dashboardApi from '../api/dashboardApi';

// Export Constants
export const LOAD_DASHBOARD = 'LOAD_DASHBOARD';
export const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';
export const ADD_SOCKET_DATA = 'ADD_SOCKET_DATA';

export const STATUS_SUCCESS = 'STATUS_SUCCESS';
export const STATUS_FAIL = 'STATUS_FAIL';

// Export Actions

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

export function loadDashboard(config) {
  return {
    type: LOAD_DASHBOARD,
    config,
  };
}

export function addDataSocket(id, payload) {
  return {
    type: ADD_SOCKET_DATA,
    id,
    payload,
  };
}

export function initDashboardSocket(config, socket) {
  return (dispatch) => {
    socket.emit('config', config);

    config.datasources.forEach((ds) => {
      const { _id } = ds;
      socket.on(_id, payload => dispatch(addDataSocket(_id, payload)));
    });
  };
}

export function fetchDashboard(id, socket) {
  return (dispatch) => {
    dashboardApi.fetchDashboard(id)
      .then((config) => {
        if (config) {
          dispatch(loadDashboard(config));
          dispatch(initDashboardSocket(config, socket));
          // dispatch(statusSuccess());
        } else {
          dispatch(statusFail('Config is null'));
        }
        return config;
      })
      .catch(e => dispatch(statusFail(e)));
  };
}

export function updateDashboard(id, updatedConfig) {
  return (dispatch) => {
    dispatch({ type: UPDATE_DASHBOARD });
    dashboardApi.updateDashboard(id, updatedConfig)
      .then((config) => {
        // dispatch(statusSuccess());
        return config;
      })
      .catch(e => dispatch(statusFail(e)));
  };
}
