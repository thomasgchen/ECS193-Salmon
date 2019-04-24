import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchLocations, fetchLocationProfiles } from '../../redux/actions/locations';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ExplorerPieChart } from '../Graph';

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
import Map from '../Map/Map';
import { GRAPH_COLORS } from '../../config/constants';

const styles = theme => ({
  root: { flexGrow: 1, padding: '1%' },
  centered: { width: '100%', textAlign: 'center' },
  graphTitle: { width: '100%', textAlign: 'center', padding: '10px' },
  graphContainer: { height: '100%', width: '100%' },
  filterContainer: { paddingBottom: '10px' },
  graphInnerContainer: { height: '300px', width: '100%' },
  centeredWithPadding: { width: '100%', textAlign: 'center', padding: '20px' },
  inline: { display: 'inline-block' }
});

export class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(Object.keys(this.props.locations.profiles).length > 0);
    if (this.props.locations.profiles && Object.keys(this.props.locations.profiles).length > 0)
      return;
    this.props.fetchLocationProfiles();
    this.props.fetchLocations();
  }

  renderPrevalenceOverTimeGraph = data => {
    const { classes } = this.props;
    if (data.structuredData.length > 0) {
      return (
        <ResponsiveContainer>
          <LineChart
            data={data.structuredData}
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
            {data.labels.slice(0, 30).map((label, index) => (
              <Line
                connectNulls
                type="monotone"
                dataKey={label}
                stroke={GRAPH_COLORS[index % GRAPH_COLORS.length]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <div className={classes.centered}>
          <h5>Not enough data.</h5>
        </div>
      );
    }
  };

  render() {
    const { classes, match } = this.props;
    const { loading, error, profiles, locations } = this.props.locations;
    if (!profiles || Object.keys(profiles).length === 0 || loading)
      return (
        <div>
          <Navbar />
          <div className={classes.root} style={{ minHeight: '100vh' }}>
            <div className={classes.centered}>
              <CircularProgress />
            </div>
          </div>
        </div>
      );
    const data = profiles[match.params.id];
    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="h3">{data.name}</Typography>
              <Typography variant="caption">
                [{data.location.latitude}, {data.location.longitude}] - {data.casesCount} cases
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.graphContainer}>
                <Map locations={locations} singleLocationId={data.id} />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper>
                <h3 className={classes.graphTitle}>Prevalence Over Time</h3>
                <div className={classes.graphInnerContainer}>
                  {this.renderPrevalenceOverTimeGraph(data.graphs.prevalenceOverTime)}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>
                <h3 className={classes.graphTitle}>Infected Fish by Species</h3>
                <div className={classes.graphInnerContainer}>
                  <ExplorerPieChart graphData={data.graphs.graphBySpecies} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>
                <h3 className={classes.graphTitle}>Infected Fish by Pathogen</h3>
                <div className={classes.graphInnerContainer}>
                  <ExplorerPieChart graphData={data.graphs.graphByPathogen} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>
                <h3 className={classes.graphTitle}>Infected Fish by Age</h3>
                <div className={classes.graphInnerContainer}>
                  <ExplorerPieChart graphData={data.graphs.graphByAge} />
                </div>
              </Paper>
            </Grid>
          </Grid>

          {/* <ExplorerPieChart graphData={da} /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { locations: state.locations };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: () => dispatch(fetchLocations()),
    fetchLocationProfiles: () => dispatch(fetchLocationProfiles())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
