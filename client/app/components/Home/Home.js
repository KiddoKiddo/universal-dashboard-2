import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {
  fetchDashboards,
} from '../../actions/homeActions';

const mapStateToProps = state => ({
  ...state.home,
});

const mapDispatchToProps = dispatch => ({
  fetchDashboards: () => dispatch(fetchDashboards()),
});

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh',
    background: 'linear-gradient(-20deg, #ffffff70, #ffffffff 80%), url("./assets/img/home-background.jpg") no-repeat',
    backgroundSize: 'cover, cover',
  },
  grow: {
    flexGrow: 1,
  },
};

class Home extends Component {
  componentDidMount() {
    this.props.fetchDashboards();
  }

  handleListItemClick(id) {
    window.open(`./dashboard/${id}`);
  }

  handleEditItemClick(id) {
    window.open(`./editor/${id}`);
  }

  generateList(dashboards = []) {
    return dashboards.map(d => (
      <ListItem
        key={d._id}
        button
        onClick={() => this.handleListItemClick(d._id)}
      >
        <ListItemAvatar><Avatar><DashboardIcon /></Avatar></ListItemAvatar>
        <ListItemText primary={d.name} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit" onClick={() => this.handleEditItemClick(d._id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  render() {
    const { classes, dashboards } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Universal Dashboard
            </Typography>
            <Button color="inherit">NEW DASHBOARD</Button>
          </Toolbar>
        </AppBar>
        <List>
          {this.generateList(dashboards)}
        </List>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
