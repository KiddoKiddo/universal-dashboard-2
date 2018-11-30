import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Import Style
import './PieChart.css';

const processSeries = (socketData, series) => {
  const finalSeries = [];

  series.forEach((serie) => {
    const { data, ...others } = serie;
    let finalData;
    if (_.isArray(data)) {
      finalData = data.map((d) => {
        return { name: d, y: socketData[d] };
      });
    } else if (_.isObject(data)) {

    } else {
      // Not form
    }
    finalSeries.push({ ...others, data: finalData });
  });
  return finalSeries;
};

const PieChart = (props) => {
  const { data, options } = props;
  const series = processSeries(data, options.series);

  const extOptions = Object.assign({
    // Default options
  }, options, { series });

  return (
    <HighchartsReact
      highcharts={Highcharts}
      updateArgs={[true, true, true]}
      options={extOptions}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.any,
  options: PropTypes.object,
};

PieChart.defaultProps = {
  data: {},
  options: {},
};

export default PieChart;
