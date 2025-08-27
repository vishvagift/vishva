import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { Transaction, Character } from '../App';

interface DashboardProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  budget: number;
  character: Character;
  redMaskMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  totalIncome,
  totalExpenses,
  currentBalance,
  budget,
  character,
  redMaskMode
}) => {
  const recentTransactions = transactions.slice(0, 10);
  const budgetUsed = (totalExpenses / budget) * 100;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-green-400">₹{totalIncome.toLocaleString('en-IN')}</p>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </div>

        <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-red-400">₹{totalExpenses.toLocaleString('en-IN')}</p>
            </div>
            <TrendingDown className="text-red-400" size={32} />
          </div>
        </div>

        <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Current Balance</p>
              <p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ₹{currentBalance.toLocaleString('en-IN')}
              </p>
            </div>
            <Target className={currentBalance >= 0 ? 'text-green-400' : 'text-red-400'} size={32} />
          </div>
        </div>

        <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Budget Used</p>
              <p className={`text-2xl font-bold ${budgetUsed > 100 ? 'text-red-400' : budgetUsed > 80 ? 'text-yellow-400' : 'text-green-400'}`}>
                {budgetUsed.toFixed(1)}%
              </p>
            </div>
            <AlertCircle className={budgetUsed > 100 ? 'text-red-400' : budgetUsed > 80 ? 'text-yellow-400' : 'text-green-400'} size={32} />
          </div>
        </div>
      </div>

      {/* Character Status */}
      <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className="text-xl font-bold text-white mb-4">Current Operative: {character.codename}</h3>
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{character.avatar}</div>
          <div>
            <p className="text-white font-semibold">{character.name}</p>
            <p className="text-gray-400">{character.specialty}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: character.color }}></div>
              <span className="text-gray-400 text-sm">Active in operation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className="text-xl font-bold text-white mb-4">Recent Operations</h3>
        <div className="space-y-3">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No operations recorded yet. Start your first heist!</p>
          ) : (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className={`p-4 rounded-lg border ${redMaskMode ? 'bg-red-800 border-red-600' : 'bg-gray-700 border-gray-600'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {transaction.type === 'income' ? (
                      <TrendingUp className="text-green-400" size={20} />
                    ) : (
                      <TrendingDown className="text-red-400" size={20} />
                    )}
                    <div>
                      <p className="text-white font-medium">
                        {transaction.alias || transaction.description}
                      </p>
                      <p className="text-gray-400 text-sm">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;