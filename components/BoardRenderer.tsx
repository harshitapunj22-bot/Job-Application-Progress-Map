
import React from 'react';
import { Board } from '../types';

interface BoardRendererProps {
  board: Board;
  showLegend?: boolean;
  compact?: boolean;
  currentUserId?: string | null;
}

const BoardRenderer: React.FC<BoardRendererProps> = ({ board, showLegend = false, compact = false, currentUserId }) => {
  const totalSegments = Math.ceil(board.target / board.segmentSize);
  const maxProgress = Math.max(...board.users.map(u => u.progress));

  const renderGrid = () => (
    <div className="flex flex-col h-full w-full gap-4 overflow-y-auto pr-1">
      {board.users.map((user) => {
        const isMe = user.id === currentUserId;
        const isLeader = user.progress === maxProgress && maxProgress > 0;
        const filledSegments = Math.floor(user.progress / board.segmentSize);
        
        return (
          <div key={user.id} className={`flex flex-col flex-shrink-0 transition-all duration-500 ${isLeader ? 'scale-100 opacity-100' : 'opacity-60 scale-95'}`}>
            <div className="flex justify-between items-baseline mb-1">
              <p className={`font-hand text-xl leading-none ${isMe ? 'font-black underline' : ''}`}>{user.name}</p>
              <p className="text-[10px] font-bold text-gray-500">{user.progress} / {board.target}</p>
            </div>
            {/* Using grid-template-columns with a smaller min-size for high target values like 300 */}
            <div 
              className="grid gap-[1px] p-1.5 bg-white border border-gray-100 rounded-md shadow-sm"
              style={{ 
                gridTemplateColumns: `repeat(auto-fill, minmax(6px, 1fr))`,
                minHeight: '30px'
              }}
            >
               {Array.from({ length: totalSegments }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square transition-all duration-300 rounded-[1px] ${i < filledSegments ? '' : 'bg-gray-100/50'}`}
                  style={i < filledSegments ? { backgroundColor: user.color } : {}}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderRunway = () => (
    <div className="flex h-full w-full gap-2 px-1">
      {board.users.map((user) => {
        const isMe = user.id === currentUserId;
        const isLeader = user.progress === maxProgress && maxProgress > 0;
        const filledSegments = Math.floor(user.progress / board.segmentSize);
        
        return (
          <div key={user.id} className={`flex-1 flex flex-col h-full transition-all ${isLeader ? 'scale-100' : 'opacity-50'}`}>
            <div className={`flex-grow flex flex-col-reverse justify-between py-4 border-x border-dashed border-gray-200 px-1 relative rounded-md ${isMe ? 'bg-gray-50/50' : ''}`}>
              {Array.from({ length: totalSegments }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-full h-1 rounded-full transition-all duration-500 ${i < filledSegments ? '' : 'bg-gray-100/30'}`}
                  style={i < filledSegments ? { backgroundColor: user.color } : {}}
                />
              ))}
            </div>
            {showLegend && (
              <p className={`mt-2 text-center font-hand text-sm truncate ${isMe ? 'font-black underline' : ''}`}>{user.name}</p>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderLadder = () => (
    <div className="flex h-full w-full gap-4 px-2">
      {board.users.map((user) => {
        const isMe = user.id === currentUserId;
        const isLeader = user.progress === maxProgress && maxProgress > 0;
        const filledSegments = Math.floor(user.progress / board.segmentSize);
        return (
          <div key={user.id} className={`flex-1 flex flex-col h-full transition-all ${isLeader ? 'scale-100' : 'opacity-50'}`}>
            <div className="flex-grow flex flex-col-reverse relative h-full">
              <div className="absolute left-1/4 h-full w-[1px] bg-gray-200"></div>
              <div className="absolute right-1/4 h-full w-[1px] bg-gray-200"></div>
              <div className="flex flex-col-reverse justify-around h-full py-4">
                {Array.from({ length: totalSegments }).map((_, i) => (
                   <div 
                    key={i} 
                    className={`h-[1px] w-full transition-all duration-300 ${i < filledSegments ? 'shadow-sm' : 'bg-gray-100'}`}
                    style={i < filledSegments ? { backgroundColor: user.color, height: '3px' } : {}}
                  />
                ))}
              </div>
            </div>
            {showLegend && (
              <p className={`mt-2 text-center font-hand text-sm truncate ${isMe ? 'font-black' : ''}`}>{user.name}</p>
            )}
          </div>
        );
      })}
    </div>
  );

  if (board.style === 'grid') return renderGrid();
  if (board.style === 'ladder') return renderLadder();
  return renderRunway();
};

export default BoardRenderer;
