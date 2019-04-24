import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchGraphs } from '../../redux/actions/explorerGraphs';
import { fetchLocations } from '../../redux/actions/locations';
import _ from 'lodash';
import { Grid, withStyles, Paper, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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
import { GRAPH_COLORS, VALID_AGES, VALID_SPECIES, VALID_PATHOGENS } from '../../config/constants';
import Filter, { GroupByFilter } from '../Filters';
import { ExplorerPieChart } from '../Graph';

const styles = theme => ({
  root: { flexGrow: 1, padding: '1em', margin: 0 },
  graphTitle: { width: '100%', textAlign: 'center', padding: '10px' },
  graphContainer: { height: '100%', width: '100%' },
  filterContainer: { paddingBottom: '10px' },
  graphInnerContainer: { height: '300px', width: '100%' },
  centered: { width: '100%', textAlign: 'center' },
  centeredWithPadding: { width: '100%', textAlign: 'center', padding: '20px' }
});

export class Explorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { age: [], species: [], pathogen: [], LocationId: [], groupBy: '' }
    };
  }

  fetchGraphs = () => {
    this.props.fetchGraphs({ ...this.state.filters });
  };

  componentDidMount() {
    this.props.fetchGraphs({ ...this.state.filters });
    this.props.fetchLocations();
  }

  handleFilterChange = (name, value) => {
    this.setState(
      {
        filters: { ...this.state.filters, [name]: value }
      },
      () => {
        this.fetchGraphs();
      }
    );
  };

  renderPieChart = name => {
    const { data } = this.props.explorerGraphs;
    const { classes } = this.props;
    const graphData = data.graphs[`graphBy${name}`];
    console.log(graphData);
    if (graphData && graphData.length > 0) {
      return <ExplorerPieChart graphData={graphData} />;
    } else {
      return (
        <div className={classes.centered}>
          <h5>Not enough data.</h5>
        </div>
      );
    }
  };

  renderPrevalenceOverTimeGraph = () => {
    const { data } = this.props.explorerGraphs;
    const { classes } = this.props;
    if (data.graphs.prevalenceOverTime.structuredData.length > 0) {
      return (
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
            {data.graphs.prevalenceOverTime.labels.slice(0, 30).map((label, index) => (
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
    const { classes, locations } = this.props;
    const { data, error, loading } = this.props.explorerGraphs;
    const { filters } = this.state;
    if (_.keys(data).length === 0)
      return (
        <div>
          <Navbar />
          <div>
            {error && (
              <Grid item xs={12} className={classes.centered}>
                <Paper className={classes.centeredWithPadding}>
                  <h3>Error loading graph data.</h3>
                </Paper>
              </Grid>
            )}
            {!error && <CenteredProgress />}
          </div>
        </div>
      );
    return (
      <div>
        <Navbar />

        <div className={classes.root}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={12}>
              <Paper>
                <Grid container justify="space-between" className={classes.filterContainer}>
                  <Grid item>
                    <Filter
                      name="age"
                      items={VALID_AGES}
                      chosen={filters.age}
                      handleFilterChange={event => {
                        this.handleFilterChange('age', event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Filter
                      name="species"
                      items={VALID_SPECIES}
                      chosen={filters.species}
                      handleFilterChange={event => {
                        this.handleFilterChange('species', event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Filter
                      name="pathogen"
                      items={VALID_PATHOGENS}
                      chosen={filters.pathogen}
                      handleFilterChange={event => {
                        this.handleFilterChange('pathogen', event.target.value);
                      }}
                    />
                  </Grid>
                  {locations && (
                    <Grid item>
                      <Filter
                        name="location"
                        items={locations}
                        chosen={filters.LocationId}
                        handleFilterChange={event => {
                          this.handleFilterChange('LocationId', event.target.value);
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <GroupByFilter
                      handleChange={event => {
                        this.handleFilterChange('groupBy', event.target.value);
                      }}
                      value={this.state.filters.groupBy}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {loading && (
              <Grid item xs={12} className={classes.centered}>
                <CircularProgress />
              </Grid>
            )}
            {error && (
              <Grid item xs={12} className={classes.centered}>
                <Paper className={classes.centeredWithPadding}>
                  <h3>Error loading graph data.</h3>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12}>
              <Paper className={classes.graphContainer}>
                <h3 className={classes.graphTitle}>Prevalence Over Time</h3>
                <div className={classes.graphInnerContainer}>
                  {this.renderPrevalenceOverTimeGraph()}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.graphContainer}>
                <h3 className={classes.graphTitle}>Infected Fish by Species</h3>
                <div className={classes.graphInnerContainer}>{this.renderPieChart('Species')}</div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.graphContainer}>
                <h3 className={classes.graphTitle}>Infected Fish by Pathogen</h3>
                <div className={classes.graphInnerContainer}>{this.renderPieChart('Pathogen')}</div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.graphContainer}>
                <h3 className={classes.graphTitle}>Infected Fish by Age</h3>
                <div className={classes.graphInnerContainer}>{this.renderPieChart('Age')}</div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div className={classes.centeredWithPadding}>
          <Typography gutterBottom={true} variant="caption">
            Displaying data for: {this.props.explorerGraphs.data.hashIdentifier}, containing:{' '}
            {data.dataLength} cases.
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { explorerGraphs: state.explorerGraphs, locations: state.locations.items };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphs: filters => dispatch(fetchGraphs(filters)),
    fetchLocations: () => dispatch(fetchLocations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Explorer));
