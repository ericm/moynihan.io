import Two from 'two.js';

export const SIZE = 140;
export const RATIO = 2.64;

export interface State {
  rotation: number;
  size?: number;
  scale?: number;
  coords?: { x: number; y: number };
}

export interface Theme {
  primary: Two.Color;
  secondary: Two.Color;
  state: [State, State, State, State, State];
}

export const themes: { [name: string]: Theme } = {
  primary: {
    primary: '#EA2099',
    secondary: '#92145F',
    state: [
      { rotation: 30 * (Math.PI / 180) },
      { rotation: 45 * (Math.PI / 180) },
      { rotation: 60 * (Math.PI / 180) },
      { rotation: 75 * (Math.PI / 180) },
      { rotation: 135 * (Math.PI / 180), size: SIZE / RATIO },
    ],
  },
  north: {
    primary: '#7920EA',
    secondary: '#5611AD',
    state: [
      { rotation: 45 * (Math.PI / 180) },
      { rotation: 45 * (Math.PI / 180), scale: 0.9 },
      { rotation: 45 * (Math.PI / 180), scale: 0.75, coords: { x: 0, y: -25 } },
      {
        rotation: 45 * (Math.PI / 180),
        scale: 0.8,
        coords: { x: 0, y: -50 },
      },
      { rotation: 45 * (Math.PI / 180), size: SIZE / RATIO },
    ],
  },
};
