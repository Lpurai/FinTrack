import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

export default function Reports({ transactions }) {
  
  const expenseSummary = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, current) => {
      const existing = acc.find(item => item.name === current.title);
      if (existing) {
        existing.value += current.amount;
      } else {
        acc.push({ name: current.title, value: current.amount });
      }
      return acc;
    }, []);
  const totalInflow = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = transactions.filter(t => t.type === 'expense').reduce((sum, t) => Math.abs(t.amount), 0);
  
  const financialTrendData = [
    { name: 'Financial Overview', Inflow: totalInflow, Outflow: totalOutflow }
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-8 p-2">
      
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-white-text">Financial Insights</h1>
        <p className="text-sm text-secondary-text">Visual breakdowns of your campus spending habits and income allocations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-card-background p-6 rounded-xl border border-border shadow-sm flex flex-col hover:border-muted-cyan">
          <h3 className="text-base font-bold text-cyan-accent mb-2">Spending by Category</h3>
          <p className="text-sm text-secondary-text mb-6">Percentage allocation distribution across your logged expense targets</p>
          
          <div className="w-full h-64 flex items-center justify-center">
            {expenseSummary.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseSummary}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    
                    dataKey="value"
                  >
                    {expenseSummary.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `KES ${value.toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-secondary-text italic">No expense records found to generate breakdown.</p>
            )}
          </div>
        </div>
        <div className="bg-card-background p-6 rounded-xl border border-border hover:border-muted-cyan shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-cyan-accent mb-2">Cash Flow Comparison</h3>
          <p className="text-sm text-secondary-text mb-6">Direct volume scaling matching your net total incoming vs outgoing money</p>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip formatter={(value) => `KES ${value.toLocaleString()}`} />
                <Legend iconType="square" />
                <Bar dataKey="Inflow" fill="#7CFF4D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Outflow" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-card-background text-white-text p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-sm font-semibold text-secondary-text">Campus Savings Rate Advice</h4>
          <p className="text-xs text-secondary-text mt-1 max-w-xl">
            {totalInflow > 0 
              ? `You are currently saving ${Math.round(((totalInflow - totalOutflow) / totalInflow) * 100)}% of your total accessible campus income.`
              : "Log income transactions to begin tracking your net active semester savings buffer."}
          </p>
        </div>
        <div className="text-xs font-mono uppercase bg-secondary text-cyan-accent px-3 py-1.5 rounded-md border border-slate-700">
          Status: Active Audit
        </div>
      </div>
    </div>
  );
}