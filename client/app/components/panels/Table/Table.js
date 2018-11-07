port React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import Style
import './Table.scss';

// TODO: Adding options for
// - Style default Table
// - Prepend Table
// - Append Table
// - Color on conditions

const Table = (props) => {
  const { data, options } = props;
  return (
    <div className="Table" style={options.inlineStyle}>
      { _.get(data, options.path, '') }
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
};

Table.defaultProps = {
  data: {},
  options: {},
};

export default Table;
