import Two from 'two.js';

type Rect = Two.Rectangle;

const SIZE = 140;
const RATIO = 2.64;

interface State {
  rotation: number;
  size?: number;
  coords?: { x: number; y: number };
}

interface Theme {
  primary: Two.Color;
  secondary: Two.Color;
  state: [State, State, State, State, State];
}

const themes: { [name: string]: Theme } = {
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
};

export default class Squares {
  private $root: Two;
  private $rects: [Rect, Rect, Rect, Rect, Rect];
  constructor(root: HTMLDivElement) {
    this.$root = new Two({ fullscreen: true, autostart: true }).appendTo(root);
    const config = this.getConfig();
    this.$rects = [
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(
        config[0],
        config[1],
        SIZE / RATIO,
        SIZE / RATIO
      ),
    ];
    this.setStyles('primary');
  }
  private getConfig = (): [number, number, number, number] => [
    this.$root.width / 2,
    this.$root.height / 2,
    SIZE,
    SIZE,
  ];
  private setStyles = (name: string) => {
    const theme = themes[name];
    for (let i in this.$rects) {
      if (+i % 2 === 0) {
        this.$rects[i].fill = theme.secondary;
      } else {
        this.$rects[i].fill = theme.primary;
      }
      this.$rects[i].rotation = theme.state[i].rotation;
      this.$rects[i].noStroke();
    }
    this.$root.render();
  };
}
