import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import shortid from 'shortid';

import { withStyles, withTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Import Style
import './Table.css';

// NOTE: The table is created based on Material UI React Components

// TODO:
// - Fontsize for table cell
// - Theme unification
// - 'type' and 'hidden' support for each columns

// Using with withStyles() of Material UI
const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
  },
  table: {
    minWidth: 700,
    fontSize: 16,
  }
});

const TableWidget = (props) => {
  const { data, options } = props;
  const extOptions = Object.assign({}, options, {
    // Default options
  });

  // const { fields } = extOptions;
  const fields = [
    { name: 'Owner', path: 'owner' },
    { name: 'Sale Order', path: 'parent' },
    { name: 'Transaction Date', path: 'transaction_date' },
  ];

  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {fields.map(field => <TableCell key={shortid()}>{field.name}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => {
            return (
              <TableRow key={shortid()}>
                {fields.map(field => <TableCell key={shortid()}>{row[field.path]}</TableCell>)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

TableWidget.propTypes = {
  data: PropTypes.any,
  options: PropTypes.shape({
    fields: PropTypes.array,
  }),
};

TableWidget.defaultProps = {
  data: [],
  options: {},
};

export default withTheme()(withStyles(styles)(TableWidget));
