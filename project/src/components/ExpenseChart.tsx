import React, { useMemo } from 'react';
import { Transaction } from '../App';

interface ExpenseChartProps {
  transactions: Transaction[];
  redMaskMode: boolean;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions, redMaskMode }) => {
  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals: { [key: string]: number } = {};
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
        color: getCategoryColor(category)
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);

  // Simple pie chart using CSS
  const createPieChart = () => {
    let cumulativePercentage = 0;
    
    return expenseData.map((item, index) => {
      const startAngle = (cumulativePercentage / 100) * 360;
      const endAngle = ((cumulativePercentage + item.percentage) / 100) * 360;
      cumulativePercentage += item.percentage;
      
      const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
      const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
      const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180);
      const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180);
      
      const largeArcFlag = item.percentage > 50 ? 1 : 0;
      
      return (
        <path
          key={index}
          d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={item.color}
          stroke={redMaskMode ? '#7F1D1D' : '#374151'}
          strokeWidth="1"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        />
      );
    });
  };

  if (expenseData.length === 0) {
    return (
      <div className={`p-8 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'} text-center`}>
        <h2 className="text-2xl font-bold text-white mb-4">Red Mask Mode - Expense Analysis</h2>
        <p className="text-gray-400">No expense data available. Start recording your escape expenses!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <h2 className="text-2xl font-bold text-white mb-6">Red Mask Mode - Expense Analysis</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Expense Distribution</h3>
            <div className="relative inline-block">
              <svg width="300" height="300" viewBox="0 0 100 100" className="transform -rotate-90">
                {createPieChart()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-black bg-opacity-50 rounded-full p-4">
                  <p className="text-white text-xs">Total</p>
                  <p className="text-white text-sm font-bold">₹{totalExpenses.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Breakdown</h3>
            <div className="space-y-3">
              {expenseData.map((item, index) => (
                <div key={index} className={`p-3 rounded border ${redMaskMode ? 'bg-red-800 border-red-600' : 'bg-gray-700 border-gray-600'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-white font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">₹{item.amount.toLocaleString('en-IN')}</p>
                      <p className="text-gray-400 text-sm">{item.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Expenses by Category */}
      <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Escape Operations</h3>
        <div className="space-y-2">
          {transactions
            .filter(t => t.type === 'expense')
            .slice(0, 8)
            .map((expense, index) => (
              <div key={index} className={`p-3 rounded border ${redMaskMode ? 'bg-red-800 border-red-600' : 'bg-gray-700 border-gray-600'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{expense.alias || expense.description}</p>
                    <p className="text-gray-400 text-sm">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-red-400 font-bold">₹{expense.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Color mapping for categories
function getCategoryColor(category: string): string {
  const colorMap: { [key: string]: string } = {
    'Food & Dining': '#EF4444',
    'Transportation': '#F97316',
    'Shopping': '#F59E0B',
    'Entertainment': '#EAB308',
    'Bills & Utilities': '#84CC16',
    'Healthcare': '#22C55E',
    'Education': '#10B981',
    'Travel': '#14B8A6',
    'Groceries': '#06B6D4',
    'Fuel': '#0EA5E9',
    'Rent': '#3B82F6',
    'Other': '#8B5CF6'
  };
  
  return colorMap[category] || '#6B7280';
}

export default ExpenseChart;