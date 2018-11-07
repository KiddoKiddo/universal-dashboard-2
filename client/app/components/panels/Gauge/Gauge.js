import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ReactRadialGauge from './ReactRadialGauge';

// Documentation: https://canvas-gauges.com/documentation/user-guide/
// TODO:
const Gauge = (props) => {
  const { data, options } = props;
  const extOptions = Object.assign({}, options, {
    units: '°C',
    title: 'Temperature',
    height: 300,
    width: 300,
    minValue: 0,
    maxValue: 100,
    majorTicks: Array.from(new Array(10), (e, i) => i * 10),
    minorTicks: 10,
  });
  return (
    <ReactRadialGauge
      value={_.get(data, extOptions.path, '')}
      {...extOptions}
    />
  );
};

export default Gauge;
