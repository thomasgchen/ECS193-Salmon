import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { COMP_COLOR_BLUE, COMP_COLOR_GREEN } from '../../config/constants';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '300px'
  },
  title: {
    padding: '10px'
  }
});

const StackedBarGraph = ({ data, xAxisKey, yAxisKeyOne, yAxisKeyTwo, title, classes }) => {
  return (
    <Paper className={classes.root}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.container}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxisKeyOne} stackId="stack" fill={COMP_COLOR_BLUE} />
            <Bar dataKey={yAxisKeyTwo} stackId="stack" fill={COMP_COLOR_GREEN} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

StackedBarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  yAxisKeyOne: PropTypes.string.isRequired,
  yAxisKeyTwo: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default withStyles(styles)(StackedBarGraph);
