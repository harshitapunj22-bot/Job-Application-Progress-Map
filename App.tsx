
import React, { useState, useEffect, useCallback } from 'react';
import { Board, AppState, User } from './types';
import BoardSetup from './components/BoardSetup';
import Dashboard from './components/Dashboard';
import WidgetView from './components/WidgetView';
import LanePicker from './components/LanePicker';

const LOCAL_STORAGE_KEY = 'inevitability_app_state_v2';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    // 1. Check URL for shared board
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash));
        return { currentBoard: decoded, currentUserId: null };
      } catch (e) {
        console.error("Failed to decode shared board", e);
      }
    }

    // 2. Check Local Storage
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local state", e);
      }
    }
    return { currentBoard: null, currentUserId: null };
  });

  const [view, setView] = useState<'app' | 'widget'>('app');

  // Persist state
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleCreateBoard = (board: Board) => {
    setState({
      currentBoard: board,
      currentUserId: board.users[0].id // Creator is the first user
    });
  };

  const handleClaimUser = (userId: string) => {
    setState(prev => ({ ...prev, currentUserId: userId }));
    // Clear hash after claiming to clean up URL
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleUpdateProgress = useCallback((userId: string, delta: number) => {
    setState(prev => {
      if (!prev.currentBoard) return prev;
      const updatedUsers = prev.currentBoard.users.map(u => 
        u.id === userId ? { ...u, progress: Math.min(prev.currentBoard!.target, Math.max(0, u.progress + delta)) } : u
      );
      return {
        ...prev,
        currentBoard: { ...prev.currentBoard, users: updatedUsers }
      };
    });
  }, []);

  const handleReset = () => {
    if (window.confirm("This will delete your local board data. Continue?")) {
      setState({ currentBoard: null, currentUserId: null });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.location.hash = '';
    }
  };

  // Simulation: Other friends "updating" their progress randomly
  // This maintains the "Passive Pressure" even in this prototype environment
  useEffect(() => {
    if (!state.currentBoard || !state.currentUserId) return;

    const interval = setInterval(() => {
      const otherUsers = state.currentBoard!.users.filter(u => u.id !== state.currentUserId);
      if (otherUsers.length === 0) return;
      
      const luckyIndex = Math.floor(Math.random() * otherUsers.length);
      const randomUserId = otherUsers[luckyIndex].id;
      
      // 15% chance an update happens for someone else every check
      if (Math.random() > 0.85) {
        handleUpdateProgress(randomUserId, 1);
      }
    }, 8000); // Check every 8 seconds

    return () => clearInterval(interval);
  }, [state.currentBoard, state.currentUserId, handleUpdateProgress]);

  if (view === 'widget' && state.currentBoard) {
    return <WidgetView board={state.currentBoard} onBack={() => setView('app')} currentUserId={state.currentUserId} />;
  }

  if (state.currentBoard && !state.currentUserId) {
    return <LanePicker board={state.currentBoard} onSelect={handleClaimUser} />;
  }

  return (
    <div className="min-h-screen max-w-md mx-auto relative overflow-hidden flex flex-col shadow-2xl bg-[#F9F8F6]">
      {state.currentBoard ? (
        <Dashboard 
          board={state.currentBoard} 
          currentUserId={state.currentUserId!} 
          onUpdate={handleUpdateProgress}
          onShowWidget={() => setView('widget')}
          onReset={handleReset}
        />
      ) : (
        <BoardSetup onCreate={handleCreateBoard} />
      )}
    </div>
  );
};

export default App;
