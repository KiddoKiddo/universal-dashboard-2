import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

// Import actions
import {
  fetchDashboard,
} from '../../actions/dashboardActions';

// Import Style
import styles from './Dashboard.css';

// Import Components
import DashboardContainer from '../DashboardContainer/DashboardContainer';

const mapStateToProps = state => ({
  ...state.dashboard,
});

// TODO: Better place to put the socket
const socket = io();

class Dashboard extends Component {
  componentDidMount() {
    // Fetch dashboard config by id
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.props.dispatch(fetchDashboard(id, socket));
    }
  }

  render() {
    return (
      <DashboardContainer socket={socket} />
    );
  }
}

Dashboard.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {};

export default connect(mapStateToProps)(Dashboard);
