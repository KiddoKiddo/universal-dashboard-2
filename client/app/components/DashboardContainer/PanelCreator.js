import React, { forwardRef, useRef, useImperativeMethods } from 'react';
import PropTypes from 'prop-types';

// React material ui
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { withStyles } from '@material-ui/core/styles';

// Import components
import Panels from '../panels'; // TODO: Better way to import panel

// Import styles
import './DashboardContainer.css';

const styles = {
  panelCreator: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  panelBody: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

/*
  PanelCreator: used as an interface for Panel in general
*/
class PanelCreator extends React.Component {
  componentWillReceiveProps(props) {
    // To update style of the parent based on child's logic
    if (this.childRef && this.childRef.current.styleFromChildren) {
      const style = this.childRef.current.styleFromChildren(props);
      this.style = Object.assign({}, this.style, style);
    }
  }

  render() {
    const {
      panel,
      title,
      classes,
      ...otherProps
    } = this.props;

    const Panel = Panels[panel];
    this.childRef = Panel.prototype.render ? React.createRef() : null; // if panel stateless

    return (
      <Card className={classes.panelCreator}>
        { title && <CardHeader title={title} /> }
        <CardContent className={classes.panelBody} style={this.style}>
          <Panel ref={this.childRef} {...otherProps} setPanelStyle={this.setPanelStyle} />
        </CardContent>
      </Card>
    );
  }
}

PanelCreator.propTypes = {}; // TODO: Type checking

export default withStyles(styles)(PanelCreator);
