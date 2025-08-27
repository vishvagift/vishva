import React from 'react';
import { Character } from '../App';

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacter: Character;
  onSelect: (character: Character) => void;
  redMaskMode: boolean;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  characters,
  selectedCharacter,
  onSelect,
  redMaskMode
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-white mb-4">Select Your Operative</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {characters.map((character) => (
          <button
            key={character.codename}
            onClick={() => onSelect(character)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedCharacter.codename === character.codename
                ? redMaskMode
                  ? 'bg-red-800 border-red-600 shadow-red-500/50 shadow-lg'
                  : 'bg-gray-700 border-gray-500 shadow-lg'
                : redMaskMode
                ? 'bg-red-900 border-red-700 hover:bg-red-800'
                : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{character.avatar}</div>
              <p className="text-white font-semibold text-sm">{character.codename}</p>
              <p className="text-gray-400 text-xs">{character.specialty}</p>
              <div className="mt-2 flex justify-center">
                <div
                  className="w-4 h-1 rounded-full"
                  style={{ backgroundColor: character.color }}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelector;