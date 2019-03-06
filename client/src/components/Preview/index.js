import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CenteredProgress } from '../Progress';
import { LIGHT_SALMON_COLOR } from '../../config/constants';
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
          {loading ? <CenteredProgress /> : <div />}
          {error && <p>{String(error)}</p>}
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: '100%',
            height: '60%',
            padding: '30% 0px'
          }}
        >
          <ResponsiveContainer>
            <BarChart data={this.structuredData(items)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="prevalence" fill={LIGHT_SALMON_COLOR} />
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
