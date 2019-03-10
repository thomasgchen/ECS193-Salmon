import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ScatterChart
} from 'recharts';
import { Grid, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { COMP_COLOR_BLUE, COMP_COLOR_GREEN } from '../../config/constants';
import ScatterPlotTooltip from './ScatterPlotTooltip';

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
  },
  item: {
    // border: '1px solid black'
  },
  flexContainer: {
    flexGrow: 1
  },
  switchItem: {
    // border: '1px solid black'
  }
});

class StackedBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTwo: false
    };
  }

  handleChange = event => {
    this.setState({ dataTwo: event.target.checked });
  };
  render() {
    const { classes, data, dataTitles, shortDataTitles } = this.props;
    const { dataTwo } = this.state;
    const dataOne = !dataTwo;
    return (
      <Paper className={classes.root}>
        <div className={classes.flexContainer}>
          <Grid container justify="center" alignItems="center">
            <Grid xs={10} item className={classes.item}>
              <h3 className={classes.title}>{dataOne ? dataTitles[0] : dataTitles[1]}</h3>
            </Grid>
            <Grid item xs={2} className={classes.item}>
              <Grid container justify="center" alignContent="center">
                <Grid className={classes.switchItem} item>
                  <p>{shortDataTitles[0]}</p>
                </Grid>
                <Grid className={classes.switchItem} item>
                  <Switch checked={dataTwo} onChange={this.handleChange} />
                </Grid>
                <Grid className={classes.switchItem} item>
                  <p>{shortDataTitles[1]}</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.container}>
          <ResponsiveContainer>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="x"
                name="date"
                unit=""
                domain={['dataMin', 'dataMax']}
              />
              <YAxis type="number" dataKey="y" name="prevelence" unit="" />
              <Tooltip content={<ScatterPlotTooltip />} wrapperStyle={{}} />
              <Scatter
                name="Locations"
                data={dataOne ? data[0].locations : data[1].locations}
                fill={COMP_COLOR_BLUE}
              />
              <Scatter
                name="Averages"
                data={dataOne ? data[0].averages : data[1].averages}
                fill={COMP_COLOR_GREEN}
                line
                lineType="joint"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
}

StackedBarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  dataTitles: PropTypes.array.isRequired,
  shortDataTitles: PropTypes.array.isRequired
};

export default withStyles(styles)(StackedBarGraph);
