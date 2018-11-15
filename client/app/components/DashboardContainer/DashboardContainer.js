import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import library
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

// React material ui
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// Import actions
import { updateDashboard } from '../../actions/dashboardActions';

// Import styles
import './DashboardContainer.css';

// Import components
import Panels from '../panels'; // TODO: Better way to import panel

const ReactGridLayout = WidthProvider(RGL);

/*
  PanelCreator: used as an interface for Panel in general
*/
const PanelCreator = (props) => {
  const { panel, title } = props;
  const Panel = Panels[panel];
  return (
    <Card className="panel-creator">
      {title && <CardHeader title={title} className="panel-title" />}
      <CardContent className="panel-body"><Panel {...props} /></CardContent>
    </Card>
  );
};

PanelCreator.propTypes = {}; // TODO: Type checking

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

  // Generate the layout when layout is not available
  generateLayout(panels) {
    return panels.map((p, i) => {
      const y = Math.ceil(Math.random() * 10) + 5; // Init height for each panel
      return {
        x: (i * 4) % 16,
        y: Math.floor(i / 6) * y,
        w: 4,
        h: y,
        i: p._id, // To match with key attribute of each div inside ReactGridLayout
      };
    });
  }

  generatePanels(config) {
    // Predfined layout or generate layout
    const layoutConfig = { className: 'layout', rowHeight: 20, cols: 16 };
    const layout = config.layout || this.generateLayout(config.panels);
    return (
      <ReactGridLayout
        layout={layout}
        onLayoutChange={newLayout => this.onLayoutChange(config._id, newLayout)}
        {...layoutConfig}
      >
        {config.panels.map(
          panel => (
            <div key={panel._id}>
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
    const { config } = this.props;
    return (
      <div className="dashboard-container">
        {!_.isEmpty(config) && this.generatePanels(config)}
      </div>
    );
  }
}

// TODO: Type checking

export default connect(mapStateToProps)(DashboardContainer);
