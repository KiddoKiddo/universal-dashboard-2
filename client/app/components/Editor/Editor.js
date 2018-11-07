import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// Import actions
import {
  fetchDashboard,
} from '../../actions/editorActions';

// Import Style
import styles from './Editor.scss';

// Import Components

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

  render() {
    return (
      <JSONInput
        id="a_unique_id"
        placeholder={this.props.config}
        locale={locale}
        height="550px"
      />
    );
  }
}

Editor.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Editor.defaultProps = {};

export default connect(mapStateToProps)(Editor);
