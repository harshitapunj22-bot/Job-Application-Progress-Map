
import React, { useState, useMemo } from 'react';
import { Board } from '../types';
import BoardRenderer from './BoardRenderer';

interface DashboardProps {
  board: Board;
  currentUserId: string;
  onUpdate: (userId: string, delta: number) => void;
  onShowWidget: () => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ board, currentUserId, onUpdate, onShowWidget, onReset }) => {
  const currentUser = board.users.find(u => u.id === currentUserId);
  const [activeDelta, setActiveDelta] = useState<number | null>(null);

  const stats = useMemo(() => {
    const sorted = [...board.users].sort((a, b) => b.progress - a.progress);
    const leader = sorted[0];
    const diff = leader.id === currentUserId 
      ? (sorted[1] ? leader.progress - sorted[1].progress : 0)
      : leader.progress - (currentUser?.progress || 0);
    
    return {
      leader,
      isLeader: leader.id === currentUserId,
      diff
    };
  }, [board.users, currentUserId, currentUser]);

  const handlePunch = (delta: number) => {
    setActiveDelta(delta);
    onUpdate(currentUserId, delta);
    setTimeout(() => setActiveDelta(null), 100);
  };

  const getShareUrl = () => {
    const stateStr = btoa(JSON.stringify(board));
    return `${window.location.origin}${window.location.pathname}#${stateStr}`;
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Inevitability: ${board.name}`,
          text: `I'm at ${currentUser?.progress} on ${board.name}. Catch up!`,
          url: url,
        });
      } catch (err) {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };
  
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#F4F1EA]">
      {/* Header - Fixed */}
      <header className="p-4 pb-2 text-center flex-shrink-0">
        <h1 className="text-3xl font-serif italic mb-0.5">{board.name}</h1>
        <div className="flex flex-col items-center">
          {stats.isLeader ? (
            <p className="text-[9px] uppercase tracking-[0.3em] text-green-600 font-black">
              Leader (+{stats.diff})
            </p>
          ) : (
            <p className="text-[9px] uppercase tracking-[0.3em] text-red-500 font-black animate-pulse">
              {stats.leader.name} is {stats.diff} ahead
            </p>
          )}
        </div>
      </header>

      {/* Main Board - Scrollable/Flexible */}
      <main className="flex-grow p-4 min-h-0 flex flex-col">
        <div className="flex-grow bg-[#FFFDFB] sketch-border shadow-inner p-3 relative overflow-hidden flex flex-col">
          <BoardRenderer board={board} showLegend={true} currentUserId={currentUserId} />
        </div>
      </main>

      {/* Footer - Fixed */}
      <footer className="p-4 pt-0 space-y-3 flex-shrink-0">
        <div className="flex justify-between items-center px-2 mb-1">
           <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">You: {currentUser?.progress} / {board.target}</span>
           <button onClick={onReset} className="text-[9px] uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors">Reset</button>
        </div>

        <div className="flex gap-2">
          {/* Decrement Button */}
          <button 
            onClick={() => handlePunch(-1)}
            className={`w-1/4 h-24 bg-white border-2 border-gray-900 text-gray-900 font-serif text-3xl italic flex items-center justify-center transition-all rounded-2xl shadow-[0_6px_0_rgb(0,0,0)] active:shadow-none active:translate-y-[6px] ${activeDelta === -1 ? 'punch-anim' : ''}`}
          >
            -1
          </button>
          
          {/* Increment Button */}
          <button 
            onClick={() => handlePunch(1)}
            className={`flex-grow h-24 bg-gray-900 text-white font-serif text-3xl italic flex flex-col items-center justify-center gap-1 transition-all rounded-2xl shadow-[0_6px_0_rgb(0,0,0)] active:shadow-none active:translate-y-[6px] ${activeDelta === 1 ? 'punch-anim' : ''}`}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-sans not-italic font-black">LOG APPLICATION</span>
            +1
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleNativeShare}
            className="py-3 bg-white border border-gray-900 rounded-xl text-[9px] uppercase tracking-[0.2em] font-black hover:bg-gray-50 transition-colors"
          >
            Send Link ↑
          </button>
          <button 
            onClick={onShowWidget}
            className="py-3 bg-gray-200/50 rounded-xl text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500"
          >
            Widget
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
