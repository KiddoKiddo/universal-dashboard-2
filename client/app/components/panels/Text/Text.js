import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import Style
import './Text.scss';

// TODO: Adding options for
// - Style default text
// - Prepend text
// - Append text
// - Color on conditions

const Text = (props) => {
  const { data, options } = props;
  const extOptions = Object.assign({}, options, {
    // Default options
  });
  return (
    <div className="text" style={extOptions.inlineStyle}>
      { _.get(data, extOptions.path, '') }
    </div>
  );
};

Text.propTypes = {
  data: PropTypes.any,
  options: PropTypes.object,
};

Text.defaultProps = {
  data: {},
  options: {},
};

export default Text;
