import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

export class Preview extends Component {
  structuredData = items => {
    let row = [];
    _.map(items, item => {
      row.push({ name: item.caseNum, prevalence: item.prevalence });
    });
    return row;
  };

  render() {
    const { error, loading, items } = this.props.cases;
    if (items === undefined || items === null || items.length === 0) {
      return (
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50%' }}>
              <CircularProgress />
            </div>
          ) : (
            <p>No items in db.</p>
          )}
          {error && <p>{error}</p>}
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: '30%' }}>
          <BarChart
            width={600}
            height={300}
            data={this.structuredData(items)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="prevalence" fill="#F4BBB8" />
          </BarChart>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cases: state.cases };
};

export default connect(mapStateToProps)(Preview);
