import React, { forwardRef, useRef, useImperativeMethods } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';

// Import Style
import './StatusText.css';

// TODO:
// 1. Customised style
// 2. Color encoding

class StatusText extends React.Component {
  constructor() {
    super();
  }

  getIdAndStatus(data, options) {
    /*
      To get machine name
    */
    let { id } = options;
    if (_.isNil(id) && !_.isNil(options.idPath)) {
      id = _.get(data, options.idPath);
    }
    /*
      To get machine status
    */
    let status;
    // If status is in an object
    // Ex: { machine: 1, status: 0}
    if (_.isPlainObject(data)) {
      status = _.get(data, options.statusPath);
    } else {
    // If status is in an array
    // Ex: [ { machine: 1, status 0, machine: 2, status: 3 } ]
      status = _.get(
        _.find(data, [options.idPath, options.id]),
        options.statusPath
      );
    }
    return { id, status };
  }

  styleFromChildren(props) {
    const { data, options } = props;
    const extOptions = Object.assign({
      // Default options
      idPath: 'machine',
      statusPath: 'status',
      statusStyle: {},
      statusEncode: {},
      showId: true,
    }, options);

    const { status } = this.getIdAndStatus(data, options);

    /*
      To encode the style (if any)
    */
    if (!_.isNil(status) && !_.isEmpty(extOptions.statusStyle)) {
      return { background: extOptions.statusStyle[status] };
    }
    return null;
  }

  render() {
    const { data, options } = this.props;
    const extOptions = Object.assign({
      // Default options
      idPath: 'machine',
      statusPath: 'status',
      statusStyle: {},
      statusEncode: {},
      showId: true,
    }, options);

    const { id, status } = this.getIdAndStatus(data, options);

    /*
      To encode the status (if any)
    */
    const statusText = !_.isNil(status) && !_.isEmpty(extOptions.statusEncode)
      ? extOptions.statusEncode[status] : status;

    return (
      <div>
        { extOptions.showId && (
          <Typography gutterBottom variant="h3" component="h2" align="center" color="textSecondary">
            { `Machine: ${id}` }
          </Typography>
        )}
        <Typography gutterBottom variant="h1" component="h2" align="center">
          {statusText}
        </Typography>
      </div>
    );
  }
}

StatusText.propTypes = {
  data: PropTypes.any,
  options: PropTypes.object,
  setPanelStyle: PropTypes.func,
};

StatusText.defaultProps = {
  data: {},
  options: {},
  setPanelStyle: () => {},
};

export default StatusText;
