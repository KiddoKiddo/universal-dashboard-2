import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from 'react-timeseries-charts';
import { TimeSeries, TimeRange } from 'pondjs';


// Import Style
import './TimeSeries.css';

// NOTE: Documentation: http://software.es.net/react-timeseries-charts

const TimeSeriesWidget = (props) => {
  const { data, options } = props;
  const extOptions = Object.assign({}, options, {
    // Default options
  });

  const timeseries = new TimeSeries({
    name: 'traffic',
    columns: ['time', 'in', 'out'],
    points: [
      [1400425947000, 52, 41],
      [1400425948000, 18, 45],
      [1400425949000, 26, 49],
      [1400425950000, 93, 81],
    ],
});

  return (
    <ChartContainer timeRange={timeseries.timerange()}>
      <ChartRow height="150">
        <YAxis id="y" label="Value" min={0} max={1500} type="linear"/>
        <Charts>
          {/*<BarChart axis="y" series={avgSeries} columns={["value"]} />
          <BarChart axis="y" series={maxSeries} columns={["value"]} />*/}
          <LineChart axis="y" series={timeseries} />
        </Charts>
      </ChartRow>
    </ChartContainer>
  );
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
