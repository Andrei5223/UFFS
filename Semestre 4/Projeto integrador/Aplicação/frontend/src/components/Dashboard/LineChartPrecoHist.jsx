import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const LineChartPrecoHist = ({ chartBens }) => {

  return (
    <LineChart width={550} height={300} data={chartBens} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="mes" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="val_un" stroke="#8884d8" />
    </LineChart>
  );
};

export default LineChartPrecoHist;