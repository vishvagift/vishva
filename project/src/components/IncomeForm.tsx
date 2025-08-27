import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Transaction } from '../App';

interface IncomeFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
  redMaskMode: boolean;
}

const incomeCategories = [
  'Salary', 'Freelance', 'Investment', 'Business', 
  'Gift', 'Bonus', 'Side Hustle', 'Other'
];

const IncomeForm: React.FC<IncomeFormProps> = ({ onSubmit, onClose, redMaskMode }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(incomeCategories[0]);
  const [description, setDescription] = useState('');
  const [alias, setAlias] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSubmit({
      type: 'income',
      amount: Number(amount),
      category,
      description,
      alias: alias || `Heist: ${category}`,
      date: new Date().toISOString()
    });

    setAmount('');
    setDescription('');
    setAlias('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md p-6 rounded-lg border-2 ${redMaskMode ? 'bg-red-900 border-red-700' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Log Daily Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Amount (₹)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Job Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              {incomeCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Source of this income"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Mission Codename (Optional)
            </label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Code name for this income"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Log Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;