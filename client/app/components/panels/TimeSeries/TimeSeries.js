import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
} from 'react-timeseries-charts';
import { TimeSeries } from 'pondjs';


// Import Style
import './TimeSeries.css';

// NOTE:
// Documentation:
// react-timeseries-charts: http://software.es.net/react-timeseries-charts
// pondjs: http://software.es.net/pond/#/

// Data
const temperatures = require('./climate_data.json');

const points = [];
let count = 0;

class TimeSeriesWidget extends React.Component {

  componentDidMount() {

  }

  render() {
    const { data, options } = this.props;
    const extOptions = Object.assign({
      // Default options
    }, options);

    if(count < temperatures.length) {
      const sorandom = temperatures[count++];
      const index = `${sorandom.year}`;
      const temperature = sorandom.value;
      const fiveyear = sorandom.fiveyr;
      points.push([index, temperature, fiveyear]);
    }
    const temperatureSeries = new TimeSeries({
      name: 'temperature anomoly',
      columns: ['index', 'temperature', 'five_year'],
      points,
    });

    const min = -0.5;
    const max = 1.0;

    const axisStyle = {
      values: {
        labelColor: 'grey',
        labelWeight: 100,
        labelSize: 11
      },
      axis: {
        axisColor: 'grey',
        axisWidth: 1
      },
    };

    const style = styler([
      { key: 'temperature', color: '#ccc', width: 4 },
    ]);

    return (
      <Resizable>
        <ChartContainer
          timeRange={temperatureSeries.range()}
          timeAxisStyle={axisStyle}
        >
          <ChartRow height="150">
            <YAxis
              id="axis"
              label="Temperature Anomaly (°C)"
              transition={300}
              style={axisStyle}
              labelOffset={0}
              min={min}
              max={max}
              format=",.1f"
              width="60"
              type="linear"
            />
            <Charts>
              <LineChart
                axis="axis"
                series={temperatureSeries}
                columns={['temperature']}
                style={style}
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
};

TimeSeriesWidget.propTypes = {
  data: PropTypes.any,
  options: PropTypes.object,
};

TimeSeriesWidget.defaultProps = {
  data: {},
  options: {},
};

export default TimeSeriesWidget;
