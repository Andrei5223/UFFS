import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const ChartPrecoHist = ({ chartBens }) => {
  // Convertendo os valores de string para números
  const data = chartBens.map(item => ({
    mes: item.mes,
    val_un: parseFloat(item.val_un)  // Convertendo para número
  }));

  // Paleta de cores para os diferentes meses
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#2ca02c', '#ff7f0e', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#1f77b4', '#17becf', '#aec7e8'];

  return (
    <PieChart width={500} height={500}>
      <Pie data={chartBens} dataKey="lucro" nameKey="mes" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ChartPrecoHist;
