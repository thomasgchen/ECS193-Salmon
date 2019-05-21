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
import { GRAPH_COLORS } from '../../config/constants';
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

class ScatterOverVar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTwo: false
    };
  }

  handleChange = event => {
    this.setState({ dataTwo: event.target.checked });
  };

  renderScatter = data => {
    const { multi } = this.props;
    const scatters = [];
    if (multi) {
      data.forEach((scatterData, i) => {
        scatters.push(
          <Scatter
            name={`Data${i}`}
            data={scatterData}
            fill={GRAPH_COLORS[i % GRAPH_COLORS.length]}
          />
        );
      });
    }
    scatters.push(<Scatter name="Data" data={data} fill={GRAPH_COLORS[0]} />);
    return scatters;
  };

  render() {
    const { classes, data, dataTitles, shortDataTitles, dataKeys, dataUnits } = this.props;
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
                dataKey={dataOne ? dataKeys[0] : dataKeys[1]}
                name={dataOne ? dataKeys[0] : dataKeys[1]}
                unit={dataOne ? dataUnits[0] : dataUnits[1]}
                // domain={['dataMin', 'dataMax']}
              />
              <YAxis
                type="number"
                dataKey="prevalence"
                name="prevalence"
                unit=""
                // domain={['dataMin', 'dataMax']}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              {this.renderScatter(dataOne ? data[0] : data[1]).map(scatter => scatter)}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
}

ScatterOverVar.propTypes = {
  data: PropTypes.array.isRequired,
  dataTitles: PropTypes.array.isRequired,
  shortDataTitles: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  dataUnits: PropTypes.array.isRequired,
  multi: PropTypes.boolean
};

export default withStyles(styles)(ScatterOverVar);
