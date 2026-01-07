
import React from 'react';

export const COLORS = [
  '#5F6F52', // Sage
  '#A9B388', // Olive
  '#FEFAE0', // Cream
  '#E9EDC9', // Soft Lime
  '#D4A373', // Tan
  '#CCD5AE', // Moss
  '#B99470', // Warm Wood
  '#8B9D83', // Muted Forest
];

export const HAND_DRAWN_PATHS = {
  SQUIGGLE: "M0,10 Q50,0 100,10 T200,10",
  CIRCLE: "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0",
};

export const VisualMetaphorLabel: Record<string, string> = {
  runway: 'Runway Lights',
  ladder: 'Progress Ladder',
  staircase: 'Ascending Staircase',
  grid: 'Commitment Grid'
};
