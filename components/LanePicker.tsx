
import React from 'react';
import { Board } from '../types';

interface LanePickerProps {
  board: Board;
  onSelect: (userId: string) => void;
}

const LanePicker: React.FC<LanePickerProps> = ({ board, onSelect }) => {
  return (
    <div className="min-h-screen max-w-md mx-auto p-8 flex flex-col justify-center bg-[#F9F8F6]">
      <h1 className="text-4xl font-serif italic mb-2">Join {board.name}</h1>
      <p className="text-gray-500 mb-12 font-light italic">Which one are you? Your progress will be visible to everyone on this board.</p>
      
      <div className="space-y-4">
        {board.users.map(user => (
          <button
            key={user.id}
            onClick={() => onSelect(user.id)}
            className="w-full p-6 bg-white sketch-border flex items-center justify-between group hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: user.color }} />
              <span className="text-2xl font-serif italic">{user.name}</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-300 group-hover:text-black">Claim Lane →</span>
          </button>
        ))}
      </div>
      
      <p className="mt-12 text-center text-[10px] uppercase tracking-widest text-gray-400">
        Passive Accountability • Inevitability
      </p>
    </div>
  );
};

export default LanePicker;
