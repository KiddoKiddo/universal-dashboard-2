import 'whatwg-fetch';
import dashboardApi from '../api/dashboardApi';

// Export Constants
export const LOAD_DASHBOARDS = 'LOAD_DASHBOARDS';

export function loadDashboard(dashboards) {
  return {
    type: LOAD_DASHBOARDS,
    dashboards,
  };
}

export const fetchDashboards = () => (dispatch) => {
  return dashboardApi.fetchDashboards()
    .then((dashboards) => {
      if (dashboards) {
        dispatch(loadDashboard(dashboards));
      }
    });
};
