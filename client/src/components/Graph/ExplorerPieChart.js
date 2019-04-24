import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GRAPH_COLORS } from '../../config/constants';

export default function ExplorerPieChart({ graphData }) {
  console.log('data', graphData);
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={graphData}
          cx={'50%'}
          cy={'50%'}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {graphData.map((entry, index) => (
            <Cell fill={GRAPH_COLORS[index % GRAPH_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

ExplorerPieChart.propTypes = {
  graphData: PropTypes.array.isRequired
};
