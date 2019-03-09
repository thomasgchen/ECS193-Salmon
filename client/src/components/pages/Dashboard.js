import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchGraphs } from '../../redux/actions/dashboardGraphs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchGraphs();
  }

  render() {
    const { graphs, error, loading } = this.props.dashboardGraphs;
    return (
      <div>
        <Navbar />
        <h3>Pathogens per Location</h3>
        <BarChart
          width={700}
          height={300}
          data={graphs.pathogensPerLocation}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="IHN" stackId="a" fill="#8884d8" />
          <Bar dataKey="CTV" stackId="a" fill="#82ca9d" />
        </BarChart>

        <h3>Pathogens per Species</h3>

        <BarChart
          width={700}
          height={300}
          data={graphs.pathogensPerSpecies}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="species" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="IHN" stackId="a" fill="#8884d8" />
          <Bar dataKey="CTV" stackId="a" fill="#82ca9d" />
        </BarChart>

        <h3>Pathogens per Age</h3>

        <BarChart
          width={700}
          height={300}
          data={graphs.pathogensPerAge}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="IHN" stackId="a" fill="#8884d8" />
          <Bar dataKey="CTV" stackId="a" fill="#82ca9d" />
        </BarChart>
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
