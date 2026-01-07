
import React, { useState } from 'react';
import { Board, VisualStyle, User } from '../types';
import { COLORS, VisualMetaphorLabel } from '../constants';

interface BoardSetupProps {
  onCreate: (board: Board) => void;
}

const BoardSetup: React.FC<BoardSetupProps> = ({ onCreate }) => {
  const [name, setName] = useState('Job Applications');
  const [target, setTarget] = useState(300);
  const [segmentSize, setSegmentSize] = useState(1); // Changed to 1 for immediate feedback
  const [style, setStyle] = useState<VisualStyle>('grid');
  const [participants, setParticipants] = useState(['You', 'Lipsa']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const users: User[] = participants.map((p, idx) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: p.trim() || `Friend ${idx + 1}`,
      progress: 0,
      color: COLORS[idx % COLORS.length]
    }));

    const board: Board = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      target,
      segmentSize,
      style,
      users,
      creatorId: users[0].id
    };

    onCreate(board);
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F1EA] overflow-y-auto">
      <div className="p-6 pt-12 text-center flex-shrink-0">
        <h1 className="text-5xl font-serif italic mb-2 tracking-tighter">Inevitability</h1>
        <p className="text-gray-500 font-light italic text-sm">Visibility is the only motivation.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-grow">
        <div className="bg-white/40 p-4 rounded-2xl border border-gray-900/5 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1 font-black">Objective</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-gray-900/10 py-1 focus:border-gray-900 outline-none font-serif text-2xl italic"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1 font-black">Target</label>
              <input 
                type="number" 
                className="w-full bg-transparent border-b border-gray-900/10 py-1 focus:border-gray-900 outline-none text-xl font-serif"
                value={target}
                onChange={e => setTarget(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1 font-black">Visual Scale</label>
              <input 
                type="number" 
                className="w-full bg-transparent border-b border-gray-900/10 py-1 focus:border-gray-900 outline-none text-xl font-serif"
                value={segmentSize}
                onChange={e => setSegmentSize(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-black px-1">The Squad</label>
          <div className="space-y-2">
            {participants.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <input
                  type="text"
                  value={p}
                  onChange={e => {
                    const newPs = [...participants];
                    newPs[idx] = e.target.value;
                    setParticipants(newPs);
                  }}
                  placeholder="Name"
                  className="flex-grow bg-white/60 border border-transparent rounded-lg px-3 py-2 text-lg font-hand focus:outline-none focus:border-gray-300"
                />
              </div>
            ))}
            {participants.length < 4 && (
              <button 
                type="button" 
                onClick={() => setParticipants([...participants, ''])}
                className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-1"
              >
                + Add Friend
              </button>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gray-900 text-white py-5 font-serif text-2xl italic rounded-2xl shadow-xl active:scale-95 transition-all mt-4"
        >
          Forge Board
        </button>
      </form>
    </div>
  );
};

export default BoardSetup;
