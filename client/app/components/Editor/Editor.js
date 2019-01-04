import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// Import actions
import {
  fetchDashboard,
} from '../../actions/editorActions';

// Import Components


// Import styles
import styles from './EditorStyles';

const mapStateToProps = state => ({
  ...state.editor,
});

class Editor extends Component {
  componentDidMount() {
    // Fetch dashboard config by id
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.props.dispatch(fetchDashboard(id));
    }
  }

  handleSaveClick() {

  }

  handleCancelClick() {
    window.location = '/';
  }

  render() {
    const { classes, config } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
              {config.name}
            </Typography>
            <Button
              color="inherit"
              onClick={this.handleSaveClick}
            >
              SAVE
            </Button>
            <Button
              color="inherit"
              onClick={this.handleCancelClick}
            >
              CANCEL
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <JSONInput
          id="json-editor"
          placeholder={config}
          locale={locale}
          height="100vh"
          width="100%"
        />
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Editor.defaultProps = {};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Editor);
