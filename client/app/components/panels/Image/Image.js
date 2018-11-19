import React from 'react';
import PropTypes from 'prop-types';

import CardMedia from '@material-ui/core/CardMedia';

// Import Style
import './Image.css';

// TODO: Adding options for
// - Image width and height

const Image = (props) => {
  const { options } = props;
  const extOptions = Object.assign({
    // Default options
  }, options);
  return (
    <div className="image">
      <img src={extOptions.url} alt={extOptions.name} style={extOptions.style} />
    </div>
  );
};

Image.propTypes = {
  options: PropTypes.object,
};

Image.defaultProps = {
  options: {},
};

export default Image;
