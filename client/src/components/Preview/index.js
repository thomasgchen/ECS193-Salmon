import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
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
        <Paper>
          {loading ? <CenteredProgress /> : <div />}
          {error && <p>{String(error)}</p>}
        </Paper>
      );
    } else {
      return (
        <Paper style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer>
            <BarChart
              data={this.structuredData(items)}
              margin={{
                top: 20,
                right: 30,
                bottom: 20,
                left: 10
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="prevalence" fill={LIGHT_SALMON_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cases: state.cases };
};

export default connect(mapStateToProps)(Preview);
