import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';

// Import Style
import './StatusText.scss';

// TODO:
// 1. Customised style
// 2. Color encoding

const StatusText = (props) => {
  const { data, options } = props;
  const extOptions = Object.assign({}, options, {
    // Default options
    idPath: 'machine',
    statusPath: 'status',
  });
  let status;
  // Ex: { machine: 1, status: 0}
  if (_.isPlainObject(data)) {
    status = _.get(data, extOptions.statusPath);
  } else {
  // Ex: [ { machine: 1, status 0, machine: 2, status: 3 } ]
    status = _.get(_.find(data, [extOptions.idPath, extOptions.id]), extOptions.statusPath);
  }
  // Encode the status (if any)
  if (!_.isNil(status) && extOptions.statusEncode) {
    status = extOptions.statusEncode[status];
  }
  return (
    <div>
      <Typography gutterBottom variant="h3" component="h2" align="center" color="textSecondary">
        { `Machine: ${extOptions.id}` }
      </Typography>
      <Typography gutterBottom variant="h1" component="h2" align="center">
        {status}
      </Typography>
    </div>
  );
};

StatusText.propTypes = {
  data: PropTypes.any,
  options: PropTypes.object,
};

StatusText.defaultProps = {
  data: {},
  options: {},
};

export default StatusText;
