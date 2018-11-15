import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import Style
import './Image.scss';

// TODO: Adding options for
// - Image width and height

const Image = (props) => {
  const { options } = props;
  const extOptions = Object.assign({}, options, {
    // Default options
  });
  return (
    <div className="image">
      <img src={extOptions.url} alt={extOptions.name} style={extOptions.style}/>
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
