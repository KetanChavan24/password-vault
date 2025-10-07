'use client';


import { useState } from 'react';
import { generatePassword, calculateStrength, PasswordOptions } from '@/lib/passwordGenerator';

interface PasswordGeneratorProps {
  onGenerate?: (password: string) => void;
}

export default function PasswordGenerator({ onGenerate }: PasswordGeneratorProps = {}) {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<Omit<PasswordOptions, 'length'>>({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  });
  const [copied, setCopied] = useState(false);

const handleGenerate = () => {
  const newPassword = generatePassword({ ...options, length });
  setPassword(newPassword);
  setCopied(false);
  if (onGenerate) {
    onGenerate(newPassword);
  }
};

  const handleCopy = async () => {
    if (!password) return;
    
    await navigator.clipboard.writeText(password);
    setCopied(true);

    // Auto-clear after 15 seconds
    setTimeout(() => {
      setCopied(false);
    }, 15000);
  };

  const strength = password ? calculateStrength(password) : null;

  // Color mapping for strength
  const getStrengthColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
    };
    return colors[color as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🔐 Password Generator</h2>

      {/* Password Display */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Click generate..."
            className="flex-1 p-3 border-2 border-gray-300 rounded bg-gray-50 font-mono text-sm text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        
        {/* Strength Indicator */}
        {strength && (
          <div className="mt-3 p-2 bg-gray-100 rounded">
            <span className="text-sm font-medium text-gray-700">Strength: </span>
            <span className={`text-sm font-bold ${getStrengthColor(strength.color)}`}>
              {strength.label}
            </span>
          </div>
        )}
      </div>

      {/* Length Slider */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Length: <span className="text-blue-600">{length}</span>
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>8</span>
          <span>32</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeUppercase}
            onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Uppercase (A-Z)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeLowercase}
            onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Lowercase (a-z)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Numbers (0-9)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.includeSymbols}
            onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Symbols (!@#$%...)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={options.excludeSimilar}
            onChange={(e) => setOptions({ ...options, excludeSimilar: e.target.checked })}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Exclude similar (0/O, 1/l/I)</span>
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all"
      >
        ⚡ Generate Password
      </button>
    </div>
  );
}