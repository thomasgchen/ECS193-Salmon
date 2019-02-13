import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CenteredProgress } from '../Progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
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
          {loading ? <CenteredProgress /> : <p>No items in db.</p>}
          {error && <p>{String(error)}</p>}
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: '75%',
            height: '65%',
            padding: '15% 10%'
          }}
        >
          <ResponsiveContainer>
            <BarChart
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
          </ResponsiveContainer>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cases: state.cases };
};

export default connect(mapStateToProps)(Preview);
