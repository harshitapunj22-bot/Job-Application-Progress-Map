
export type VisualStyle = 'runway' | 'ladder' | 'staircase' | 'grid';

export interface User {
  id: string;
  name: string;
  progress: number; // raw number of units
  color: string;
}

export interface Board {
  id: string;
  name: string;
  target: number;
  segmentSize: number; // how many units per visual segment
  style: VisualStyle;
  users: User[];
  creatorId: string;
}

export interface AppState {
  currentBoard: Board | null;
  currentUserId: string | null;
}
