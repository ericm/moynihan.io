import Two from 'two.js';
import { SIZE, RATIO, themes } from './themes';

type Rect = Two.Rectangle;

export default class Squares {
  private $root: Two;
  private $rects: [Rect, Rect, Rect, Rect, Rect];
  private $theme = 'north';
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
    this.setStyles(this.$theme);
    this.$root.bind('resize', this.resize);
  }
  private getConfig = (): [number, number, number, number] => [
    this.$root.width / 2,
    this.$root.height / 2,
    SIZE,
    SIZE,
  ];
  private resize = () => {
    const config = this.getConfig();
    for (let i in this.$rects) {
      const coords = themes[this.$theme].state[i].coords;
      if (coords) {
        this.$rects[i].translation.x = coords.x + config[0];
        this.$rects[i].translation.y = coords.y + config[1];
      } else {
        this.$rects[i].translation.x = config[0];
        this.$rects[i].translation.y = config[1];
      }
    }
  };
  private setStyles = (name: string) => {
    const theme = themes[name];
    const config = this.getConfig();
    for (let i in this.$rects) {
      if (+i % 2 === 0) {
        this.$rects[i].fill = theme.secondary;
      } else {
        this.$rects[i].fill = theme.primary;
      }
      const coords = themes[this.$theme].state[i].coords;
      if (coords) {
        this.$rects[i].translation.x = coords.x + config[0];
        this.$rects[i].translation.y = coords.y + config[1];
      }
      this.$rects[i].scale = themes[this.$theme].state[i].scale ?? 1;
      this.$rects[i].rotation = theme.state[i].rotation;
      this.$rects[i].noStroke();
    }
    this.$root.render();
  };
}
