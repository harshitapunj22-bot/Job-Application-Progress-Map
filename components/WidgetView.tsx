
import React from 'react';
import { Board } from '../types';
import BoardRenderer from './BoardRenderer';

interface WidgetViewProps {
  board: Board;
  onBack: () => void;
  currentUserId: string | null;
}

const WidgetView: React.FC<WidgetViewProps> = ({ board, onBack, currentUserId }) => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-8 text-white relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em] text-gray-400 font-medium hover:text-white transition-colors"
      >
        ← Back to Control
      </button>

      <div className="mb-12 text-center max-w-[240px]">
        <h2 className="text-gray-500 text-xs uppercase tracking-[0.4em] mb-3 font-light">Passive Accountability</h2>
        <p className="text-gray-400 text-xs italic">Simulating Home-Screen Large Widget on iOS/Android</p>
      </div>

      {/* The "Widget" */}
      <div className="w-full aspect-square max-w-[340px] bg-[#1a1a1a] rounded-[32px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col group relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif italic text-xl text-white/90">{board.name}</h3>
          <div className="flex gap-1.5">
            {board.users.map(u => (
              <div key={u.id} className="w-2 h-2 rounded-full" style={{ backgroundColor: u.color }} />
            ))}
          </div>
        </div>

        <div className="flex-grow relative overflow-hidden bg-white/5 rounded-xl p-4 flex flex-col">
          <BoardRenderer board={board} showLegend={true} compact={true} currentUserId={currentUserId} />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/20">Progress Tracking</span>
          <span className="text-[10px] text-white/20 font-hand text-lg">Inevitability</span>
        </div>
      </div>

      <div className="mt-12 max-w-[280px] text-center space-y-4">
        <p className="text-gray-400 text-sm italic font-light">
          "The weight of progress is felt only when it is seen."
        </p>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
          No interaction required. Just visibility.
        </p>
      </div>

      {/* Visual background to look like a phone screen */}
      <div className="absolute inset-0 z-[-1] opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

export default WidgetView;
