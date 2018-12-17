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
    const {
      _x,
      _y,
      _filter,
      _group,
    } = data;
    // Filter data (if any)
    if (!_.isArray(socketData)) {
      return;
    }
    const filteredData = !_.isNil(_filter) ? _.filter(socketData, _filter) : socketData;

    // Group data (if any
    if (!_.isNil(_group)) {
      // One serie for each group
      const groups = _.groupBy(filteredData, d => _.join(_group.map(g => d[g]), ' - '));
      _.forEach(groups, (groupData, groupKey) => {
        const finalData = groupData.map((d) => {
          const x = _.get(d, _x);
          const y = _.get(d, _y);
          return [x, y];
        });
        finalSeries.push({ ...others, data: finalData, name: groupKey });
      });
    } else {
      // One series
      const finalData = filteredData.map((d) => {
        const x = _.get(d, _x);
        const y = _.get(d, _y);
        return [x, y];
      });
      finalSeries.push({ ...others, data: finalData });
    }
  });

  return finalSeries;
};

const BarChartFMCG = (props) => {
  const { data, options } = props;

  // 'Series' is slightly different from Highcharts series
  // Some special keys and variables are included to
  const series = processSeries(data, options.series);

  const extOptions = Object.assign({
    // Default options
  }, options, { series });

  // console.log(extOptions);

  return (
    <HighchartsReact
      highcharts={Highcharts}
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
