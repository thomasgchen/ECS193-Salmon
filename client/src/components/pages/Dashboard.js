import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchGraphs } from '../../redux/actions/dashboardGraphs';
import { Grid, withStyles } from '@material-ui/core';
import { StackedBarGraph, ScatterOverTime } from '../Graph';

const styles = theme => ({
  root: { flexGrow: 1, padding: '1%' }
});

const autoConstructGraphs = graphs => [
  {
    data: graphs.pathogensPerLocation,
    xAxisKey: 'location',
    yAxisKeyOne: 'IHN',
    yAxisKeyTwo: 'CTV',
    title: 'Pathogens Per Location'
  },
  {
    data: graphs.pathogensPerSpecies,
    xAxisKey: 'species',
    yAxisKeyOne: 'IHN',
    yAxisKeyTwo: 'CTV',
    title: 'Pathogens Per Species'
  },
  {
    data: graphs.pathogensPerAge,
    xAxisKey: 'age',
    yAxisKeyOne: 'IHN',
    yAxisKeyTwo: 'CTV',
    title: 'Pathogens Per Age'
  },
  {
    data: graphs.prevalencePerLocation,
    xAxisKey: 'location',
    yAxisKeyOne: 'IHN',
    yAxisKeyTwo: 'CTV',
    title: 'Prevalence Per Location'
  },
  {
    data: graphs.prevalencePerSpecies,
    xAxisKey: 'species',
    yAxisKeyOne: 'IHN',
    yAxisKeyTwo: 'CTV',
    title: 'Prevalence Per Species'
  },
  {
    data: graphs.prevalencePerAge,
    xAxisKey: 'age',
    yAxisKeyOne: 'IHN',
    yAxisKeyTwo: 'CTV',
    title: 'Prevalence Per Age'
  }
];

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchGraphs();
  }

  render() {
    const { classes } = this.props;
    const { graphs, error, loading } = this.props.dashboardGraphs;
    if (graphs.length <= 0 || loading || error) return <p>loading...</p>;
    return (
      <div>
        <Navbar />

        <div className={classes.root}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={12}>
              <ScatterOverTime
                dataTitles={['IHN Prevalence Over Time', 'CTV Prevalence Over Time']}
                shortDataTitles={['IHN', 'CTV']}
                data={[graphs.IHNPrevalenceOverTime, graphs.CTVPrevalenceOverTime]}
              />
            </Grid>
            {autoConstructGraphs(graphs).map(g => {
              return (
                <Grid item key={g.title} xs={6}>
                  <StackedBarGraph
                    data={g.data}
                    xAxisKey={g.xAxisKey}
                    yAxisKeyOne={g.yAxisKeyOne}
                    yAxisKeyTwo={g.yAxisKeyTwo}
                    title={g.title}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { dashboardGraphs: state.dashboardGraphs };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphs: () => dispatch(fetchGraphs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
