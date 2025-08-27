import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, AlertTriangle, Eye, EyeOff, Target, Calendar, PieChart, BarChart3, Users, Wallet } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import CharacterSelector from './components/CharacterSelector';
import ProfessorInsights from './components/ProfessorInsights';
import ExpenseChart from './components/ExpenseChart';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  alias?: string;
}

export interface Character {
  name: string;
  codename: string;
  avatar: string;
  color: string;
  specialty: string;
}

const characters: Character[] = [
  { name: 'Sergio Marquina', codename: 'Professor', avatar: '🧠', color: '#DC2626', specialty: 'Master Planner' },
  { name: 'Úrsula Corberó', codename: 'Tokyo', avatar: '🔫', color: '#EF4444', specialty: 'Action Specialist' },
  { name: 'Miguel Herrán', codename: 'Rio', avatar: '💻', color: '#10B981', specialty: 'Tech Expert' },
  { name: 'Jaime Lorente', codename: 'Denver', avatar: '😂', color: '#F59E0B', specialty: 'Mood Booster' },
  { name: 'Pedro Alonso', codename: 'Berlin', avatar: '👑', color: '#8B5CF6', specialty: 'Luxury Consultant' },
  { name: 'Alba Flores', codename: 'Nairobi', avatar: '💎', color: '#EC4899', specialty: 'Quality Control' }
];

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics' | 'insights'>('dashboard');
  const [redMaskMode, setRedMaskMode] = useState(false);
  const [budget, setBudget] = useState(50000);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('heist-transactions');
    const savedCharacter = localStorage.getItem('heist-character');
    const savedBudget = localStorage.getItem('heist-budget');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedCharacter) {
      const character = characters.find(c => c.codename === savedCharacter) || characters[0];
      setSelectedCharacter(character);
    }
    if (savedBudget) {
      setBudget(Number(savedBudget));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('heist-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('heist-character', selectedCharacter.codename);
  }, [selectedCharacter]);

  useEffect(() => {
    localStorage.setItem('heist-budget', budget.toString());
  }, [budget]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions([newTransaction, ...transactions]);
    setShowIncomeForm(false);
    setShowExpenseForm(false);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;
  const isOverBudget = totalExpenses > budget;

  return (
    <div className={`min-h-screen transition-all duration-500 ${redMaskMode ? 'bg-red-950' : 'bg-gray-900'}`}>
      {/* Header */}
      <div className="bg-black border-b-2 border-red-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MONEY HEIST</h1>
                <p className="text-red-400 text-sm">Mumbai Reserve Bank Operation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setRedMaskMode(!redMaskMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {redMaskMode ? <EyeOff size={20} /> : <Eye size={20} />}
                <span>{redMaskMode ? 'Normal Mode' : 'Red Mask Mode'}</span>
              </button>
              
              <div className="text-white text-right">
                <p className="text-sm text-gray-300">Current Balance</p>
                <p className={`text-xl font-bold ${currentBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ₹{currentBalance.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Selection */}
      <CharacterSelector
        characters={characters}
        selectedCharacter={selectedCharacter}
        onSelect={setSelectedCharacter}
        redMaskMode={redMaskMode}
      />

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'dashboard', label: 'Control Room', icon: Target },
            { id: 'analytics', label: 'Red Mask Mode', icon: PieChart },
            { id: 'insights', label: "Professor's Insights", icon: BarChart3 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === id
                  ? 'bg-red-600 text-white'
                  : redMaskMode
                  ? 'bg-red-900 text-red-200 hover:bg-red-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Alert for overspending */}
        {isOverBudget && (
          <div className="mb-6 p-4 bg-red-600 border border-red-500 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-white" size={24} />
              <div>
                <p className="text-white font-bold">⚠️ Inspector Raquel Alert!</p>
                <p className="text-red-100">
                  You've exceeded your heist budget by ₹{(totalExpenses - budget).toLocaleString('en-IN')}! 
                  The authorities might be closing in. Reduce expenses immediately!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setShowIncomeForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <TrendingUp size={20} />
            <span>Log Daily Job</span>
          </button>
          
          <button
            onClick={() => setShowExpenseForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <TrendingDown size={20} />
            <span>Record Escape Expense</span>
          </button>

          <div className="flex items-center space-x-2">
            <Wallet className="text-gray-400" size={20} />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-red-500 w-32"
              placeholder="Budget"
            />
            <span className="text-gray-400">Heist Wallet</span>
          </div>
        </div>

        {/* Main Content */}
        {currentView === 'dashboard' && (
          <Dashboard
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            currentBalance={currentBalance}
            budget={budget}
            character={selectedCharacter}
            redMaskMode={redMaskMode}
          />
        )}

        {currentView === 'analytics' && (
          <ExpenseChart
            transactions={transactions}
            redMaskMode={redMaskMode}
          />
        )}

        {currentView === 'insights' && (
          <ProfessorInsights
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            budget={budget}
            redMaskMode={redMaskMode}
          />
        )}
      </div>

      {/* Forms */}
      {showIncomeForm && (
        <IncomeForm
          onSubmit={addTransaction}
          onClose={() => setShowIncomeForm(false)}
          redMaskMode={redMaskMode}
        />
      )}

      {showExpenseForm && (
        <ExpenseForm
          onSubmit={addTransaction}
          onClose={() => setShowExpenseForm(false)}
          redMaskMode={redMaskMode}
        />
      )}
    </div>
  );
}

export default App;