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
  return (
    <div className="text" style={options.inlineStyle}>
      { _.get(data, options.path, '') }
    </div>
  );
};

Text.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
};

Text.defaultProps = {
  data: {},
  options: {},
};

export default Text;
