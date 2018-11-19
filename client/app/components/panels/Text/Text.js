import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Mark from 'markup-js';
import renderHTML from 'react-render-html';

// Import Style
import './Text.css';

// TODO: Adding options for
// - Style default text
// - Prepend text
// - Append text
// - Color on conditions

const Text = (props) => {
  const { data, options } = props;
  const extOptions = Object.assign({
    // Default options
  }, options);

  let shownText;
  if (!_.isNil(extOptions.text)) {
    shownText = extOptions.text;
  } else if (!_.isNil(extOptions.path)) {
    shownText = _.get(data, extOptions.path, '');
  } else if (!_.isNil(extOptions.markup) && !_.isNil(extOptions.markupPaths)) {
    const pickedData = extOptions.markupPaths.map(path => _.get(data, path, ''));
    const context = { data: pickedData };

    // Documentation for markup js https://www.npmjs.com/package/markup-js
    shownText = renderHTML(Mark.up(extOptions.markup, context));
  }

  return (
    <div className="text" style={extOptions.inlineStyle}>
      { shownText }
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
