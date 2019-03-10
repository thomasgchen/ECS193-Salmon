import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { COMP_COLOR_BLUE, COMP_COLOR_GREEN } from '../../config/constants';

const Graph = ({ data, xAxisKey, yAxisKeyOne, yAxisKeyTwo }) => {
  return (
    <BarChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={yAxisKeyOne} stackId="a" fill={COMP_COLOR_BLUE} />
      <Bar dataKey={yAxisKeyTwo} stackId="a" fill={COMP_COLOR_GREEN} />
    </BarChart>
  );
};

Graph.propTypes = {
  data: PropTypes.array.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  yAxisKeyOne: PropTypes.string.isRequired,
  yAxisKeyTwo: PropTypes.string.isRequired
};

export default Graph;
