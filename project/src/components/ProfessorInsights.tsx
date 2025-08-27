import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Calendar } from 'lucide-react';
import { Transaction } from '../App';

interface ProfessorInsightsProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  budget: number;
  redMaskMode: boolean;
}

const ProfessorInsights: React.FC<ProfessorInsightsProps> = ({
  transactions,
  totalIncome,
  totalExpenses,
  budget,
  redMaskMode
}) => {
  const currentBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const budgetUsage = (totalExpenses / budget) * 100;

  // Calculate monthly trends
  const last30Days = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return transactionDate >= thirtyDaysAgo;
  });

  const monthlyIncome = last30Days.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = last30Days.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const insights = [
    {
      title: 'Financial Status Assessment',
      icon: currentBalance >= 0 ? CheckCircle : AlertTriangle,
      color: currentBalance >= 0 ? 'text-green-400' : 'text-red-400',
      message: currentBalance >= 0 
        ? `Excellent work! Your current balance of ₹${currentBalance.toLocaleString('en-IN')} shows you're managing the heist funds well.`
        : `Critical situation! You're ₹${Math.abs(currentBalance).toLocaleString('en-IN')} in the red. Time for emergency measures.`
    },
    {
      title: 'Savings Performance',
      icon: savingsRate >= 20 ? CheckCircle : savingsRate >= 10 ? Target : AlertTriangle,
      color: savingsRate >= 20 ? 'text-green-400' : savingsRate >= 10 ? 'text-yellow-400' : 'text-red-400',
      message: savingsRate >= 20 
        ? `Outstanding! You're saving ${savingsRate.toFixed(1)}% of your income. The perfect heist requires discipline.`
        : savingsRate >= 10
        ? `Good effort. ${savingsRate.toFixed(1)}% savings rate is decent, but we can do better for the long game.`
        : `We need to work on this. ${savingsRate.toFixed(1)}% savings won't secure our future operations.`
    },
    {
      title: 'Budget Discipline',
      icon: budgetUsage <= 80 ? CheckCircle : budgetUsage <= 100 ? Target : AlertTriangle,
      color: budgetUsage <= 80 ? 'text-green-400' : budgetUsage <= 100 ? 'text-yellow-400' : 'text-red-400',
      message: budgetUsage <= 80
        ? `Perfect execution! Using only ${budgetUsage.toFixed(1)}% of your budget shows excellent restraint.`
        : budgetUsage <= 100
        ? `You're at ${budgetUsage.toFixed(1)}% of budget. Stay alert - we're approaching the danger zone.`
        : `Red alert! You've exceeded budget by ${(budgetUsage - 100).toFixed(1)}%. Emergency protocols needed.`
    }
  ];

  const recommendations = [
    "Remember: Every great heist requires meticulous planning. Track every rupee.",
    "Berlin always said: 'Elegance is the key.' Apply this to your spending habits.",
    "Like Tokyo's impulsive nature, avoid spontaneous purchases that derail the plan.",
    "Channel Nairobi's attention to detail in your expense categorization.",
    "Think like me: Always have a backup plan for unexpected expenses."
  ];

  const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

  return (
    <div className="space-y-6">
      {/* Professor Header */}
      <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🧠</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Professor's Financial Analysis</h2>
            <p className="text-gray-400">Strategic insights from the mastermind</p>
          </div>
        </div>
        
        <div className={`p-4 rounded border-l-4 border-red-500 ${redMaskMode ? 'bg-red-800' : 'bg-gray-700'}`}>
          <p className="text-white font-medium italic">
            "Remember, this isn't just about money - it's about precision, control, and executing the perfect plan."
          </p>
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
          <h3 className="text-lg font-semibold text-white mb-4">Last 30 Days Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Income</span>
              <span className="text-green-400 font-bold">₹{monthlyIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Expenses</span>
              <span className="text-red-400 font-bold">₹{monthlyExpenses.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Net</span>
                <span className={`font-bold ${monthlyIncome - monthlyExpenses >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ₹{(monthlyIncome - monthlyExpenses).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
          <h3 className="text-lg font-semibold text-white mb-4">Professor's Daily Tip</h3>
          <div className={`p-4 rounded ${redMaskMode ? 'bg-red-800' : 'bg-gray-700'}`}>
            <p className="text-white italic">"{randomRecommendation}"</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Strategic Analysis</h3>
        {insights.map((insight, index) => (
          <div key={index} className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
            <div className="flex items-start space-x-4">
              <insight.icon className={`${insight.color} flex-shrink-0 mt-1`} size={24} />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{insight.title}</h4>
                <p className="text-gray-300">{insight.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <div className={`p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className="text-lg font-semibold text-white mb-4">Next Steps - Professor's Orders</h3>
        <div className="space-y-3">
          {budgetUsage > 100 && (
            <div className="flex items-center space-x-3 p-3 bg-red-600 rounded">
              <AlertTriangle className="text-white" size={20} />
              <span className="text-white">Immediate action: Reduce expenses by ₹{((budgetUsage - 100) * budget / 100).toLocaleString('en-IN')}</span>
            </div>
          )}
          {savingsRate < 10 && (
            <div className="flex items-center space-x-3 p-3 bg-yellow-600 rounded">
              <Target className="text-white" size={20} />
              <span className="text-white">Goal: Increase savings rate to at least 10%</span>
            </div>
          )}
          {transactions.length < 10 && (
            <div className="flex items-center space-x-3 p-3 bg-blue-600 rounded">
              <Calendar className="text-white" size={20} />
              <span className="text-white">Track more transactions for better insights</span>
            </div>
          )}
          <div className="flex items-center space-x-3 p-3 bg-green-600 rounded">
            <CheckCircle className="text-white" size={20} />
            <span className="text-white">Continue monitoring daily - consistency is key to success</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorInsights;