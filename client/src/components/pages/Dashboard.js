import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <p>Dashboard</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { test: state.test };
};

export default connect(mapStateToProps)(Dashboard);
