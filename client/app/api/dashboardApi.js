import _ from 'lodash';

export default class DashboardApi {
  static fetchDashboards() {
    return fetch('/api/dashboard/all').then((res) => {
      return res.json();
    }).catch((error) => {
      return error;
    });
  }

  static fetchDashboard(id) {
    return fetch(`/api/dashboard/${id}`).then((res) => {
      // TODO: api with "ok" and "statusText"
      // if (!res.ok) {
      //   throw Error(res.statusText);
      // }
      return res.json();
    }).catch((error) => {
      return error;
    });
  }

  static updateDashboard(id, updatedConfig) {
    return fetch(`/api/dashboard/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedConfig),
    }).then((res) => {
      return res.json();
    }).catch((error) => {
      return error;
    });
  }
}
