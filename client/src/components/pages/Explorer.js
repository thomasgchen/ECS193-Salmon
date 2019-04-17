import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchGraphs } from '../../redux/actions/explorerGraphs';
import _ from 'lodash';
import { Grid, withStyles, Paper } from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CenteredProgress } from '../Progress';
import { GRAPH_COLORS } from '../../config/constants';

const styles = theme => ({
  root: { flexGrow: 1, padding: '1%' },
  graphTitle: { width: '100%', textAlign: 'center', padding: '10px' },
  graphContainer: { height: '100%', width: '100%' },
  graphInnerContainer: { height: '300px', width: '100%' }
});

export class Explorer extends Component {
  componentDidMount() {
    this.props.fetchGraphs({ groupBy: 'age' });
  }

  render() {
    const { classes } = this.props;
    const { data, error, loading } = this.props.explorerGraphs;
    if (data && data.graphs) console.log(data.graphs.prevalenceOverTime);
    if (_.keys(data).length === 0 || loading || error)
      return (
        <div>
          <Navbar />
          <div style={{ minHeight: '100vh' }}>
            <CenteredProgress />
          </div>
        </div>
      );
    return (
      <div>
        <Navbar />

        <div className={classes.root}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={12}>
              <Paper>Filters go here</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.graphContainer}>
                <h3 className={classes.graphTitle}>Prevalence Over Time</h3>
                <div className={classes.graphInnerContainer}>
                  <ResponsiveContainer>
                    <LineChart
                      data={data.graphs.prevalenceOverTime.structuredData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {data.graphs.prevalenceOverTime.labels.map((label, index) => (
                        <Line
                          connectNulls
                          type="monotone"
                          dataKey={label}
                          stroke={GRAPH_COLORS[index % GRAPH_COLORS.length]}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <p>
          Displaying data for: {this.props.explorerGraphs.data.hashIdentifier}, containing:{' '}
          {data.dataLength} cases.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { explorerGraphs: state.explorerGraphs };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphs: filters => dispatch(fetchGraphs(filters))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Explorer));
