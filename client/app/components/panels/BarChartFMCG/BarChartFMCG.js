import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Import Style
import './BarChartFMCG.css';

const processSeries = (socketData, series) => {
  const finalSeries = [];

  series.forEach((serie) => {
    const { data, ...others } = serie;
    const { xPath, yPath, filter } = data;
    const filteredData = !_.isNil(filter) ? _.filter(socketData, filter) : socketData;
    const finalData = filteredData.map((d) => {
      const x = _.get(d, xPath);
      const y = _.get(d, yPath);
      return [x, y];
    });
    finalSeries.push({ ...others, data: finalData });
  });
  return finalSeries;
};

const BarChartFMCG = (props) => {
  const { data, options } = props;
  const series = processSeries(data, options.series);
  const extOptions = Object.assign({
    // Default options
  }, options, { series });

  console.log(extOptions);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      updateArgs={[true, true, true]}
      options={extOptions}
    />
  );
};

BarChartFMCG.propTypes = {
  data: PropTypes.any,
  options: PropTypes.object,
};

BarChartFMCG.defaultProps = {
  data: {},
  options: {},
};

export default BarChartFMCG;
