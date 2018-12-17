import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

// Import components
import PanelCreator from './PanelCreator';

// Import actions
import {
  updateDashboard,
} from '../../actions/dashboardActions';

// Import styles
import './DashboardContainer.css';

const ReactGridLayout = WidthProvider(RGL);

/*
  DashboardContainer
*/
const mapStateToProps = state => ({
  ...state.dashboard,
});

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  // To save the layout in database
  onLayoutChange(id, layout) {
    if (!_.isEmpty(layout)) {
      this.props.dispatch(updateDashboard(id, { layout }));
    }
  }

  getData(datasources, ds) {
    const { name, index } = ds;
    const datasourceId = _.find(datasources, ['name', name])._id;
    return _.get(this.props.data, `${datasourceId}.id${index}`);
  }

  generatePanels(config) {
    // Predfined layout or generate layout
    const layoutConfig = { className: 'layout', rowHeight: 20, cols: 16 };
    return (
      <ReactGridLayout
        layout={config.layout}
        onLayoutChange={newLayout => this.onLayoutChange(config._id, newLayout)}
        {...layoutConfig}
      >
        {config.panels.map(
          panel => (
            <div key={panel.layoutId}>
              <PanelCreator
                data={panel.datasource && this.getData(config.datasources, panel.datasource)}
                {...panel}
              />
            </div>
          )
        )}
      </ReactGridLayout>
    );
  }

  render() {
    const { config, socket } = this.props;

    // To set the tab title
    document.title = config.name || 'Universal Dashboard';

    return (
      <div className="dashboard-container">
        {!_.isEmpty(config) && this.generatePanels(config)}
      </div>
    );
  }
}

// TODO: Type checking

export default connect(mapStateToProps)(DashboardContainer);
