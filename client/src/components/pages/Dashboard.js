import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchGraphs } from '../../redux/actions/dashboardGraphs';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { COMP_COLOR_BLUE, COMP_COLOR_GREEN } from '../../config/constants';
import Graph from '../Graph';
import ScatterPlotTooltip from '../ScatterPlotTooltip';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchGraphs();
  }

  render() {
    const { graphs, error, loading } = this.props.dashboardGraphs;
    if (graphs.length <= 0 || loading || error) return <p>loading...</p>;
    return (
      <div>
        <Navbar />
        <h3>Pathogens per Location</h3>
        <Graph
          data={graphs.pathogensPerLocation}
          xAxisKey="location"
          yAxisKeyOne="IHN"
          yAxisKeyTwo="CTV"
        />

        <h3>Pathogens per Species</h3>
        <Graph
          data={graphs.pathogensPerSpecies}
          xAxisKey="species"
          yAxisKeyOne="IHN"
          yAxisKeyTwo="CTV"
        />

        <h3>Pathogens per Age</h3>
        <Graph data={graphs.pathogensPerAge} xAxisKey="age" yAxisKeyOne="IHN" yAxisKeyTwo="CTV" />

        <h3>Pathogens per Location (Prevalence)</h3>

        <Graph
          data={graphs.prevalencePerLocation}
          xAxisKey="location"
          yAxisKeyOne="IHN"
          yAxisKeyTwo="CTV"
        />

        <h3>Pathogens per Species (Prevalence)</h3>

        <Graph
          data={graphs.prevalencePerSpecies}
          xAxisKey="species"
          yAxisKeyOne="IHN"
          yAxisKeyTwo="CTV"
        />

        <h3>Pathogens per Age (Prevalence)</h3>

        <Graph data={graphs.prevalencePerAge} xAxisKey="age" yAxisKeyOne="IHN" yAxisKeyTwo="CTV" />

        <h3>IHN Over Time (Prevalence)</h3>

        <ScatterChart
          width={700}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="date" unit="" domain={['dataMin', 'dataMax']} />
          <YAxis type="number" dataKey="y" name="prevelence" unit="" />
          <Tooltip content={<ScatterPlotTooltip />} wrapperStyle={{}} />
          <Scatter
            name="Locations"
            data={graphs.IHNPrevalenceOverTime.locations}
            fill={COMP_COLOR_BLUE}
          />
          <Scatter
            name="Averages"
            data={graphs.IHNPrevalenceOverTime.averages}
            fill={COMP_COLOR_GREEN}
            line
            lineType="joint"
          />
        </ScatterChart>

        <h3>CTV Over Time (Prevalence)</h3>

        <ScatterChart
          width={700}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="date" unit="" domain={['dataMin', 'dataMax']} />
          <YAxis type="number" dataKey="y" name="prevelence" unit="" />
          <Tooltip content={<ScatterPlotTooltip />} wrapperStyle={{}} />
          <Scatter
            name="Locations"
            data={graphs.CTVPrevalenceOverTime.locations}
            fill={COMP_COLOR_BLUE}
          />
          <Scatter
            name="Averages"
            data={graphs.CTVPrevalenceOverTime.averages}
            fill={COMP_COLOR_GREEN}
            line
            lineType="joint"
          />
        </ScatterChart>
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
)(Dashboard);
