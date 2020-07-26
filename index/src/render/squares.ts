import Two from 'two.js';
import TWEEN from '@tweenjs/tween.js';
import { SIZE, RATIO, themes } from './themes';

type Rect = Two.Rectangle;

export default class Squares {
  private _theme = 'primary';
  private _root: Two;
  private _rects: [Rect, Rect, Rect, Rect, Rect];
  private _keyframes = [
    new TWEEN.Tween({ x: 0, y: 0, rotation: 0, size: 0, scale: 0 }),
    new TWEEN.Tween({ x: 0, y: 0, rotation: 0, size: 0, scale: 0 }),
    new TWEEN.Tween({ x: 0, y: 0, rotation: 0, size: 0, scale: 0 }),
    new TWEEN.Tween({ x: 0, y: 0, rotation: 0, size: 0, scale: 0 }),
    new TWEEN.Tween({ x: 0, y: 0, rotation: 0, size: 0, scale: 0 }),
  ];
  constructor(root: HTMLDivElement) {
    this._root = new Two({ fullscreen: true, autostart: true }).appendTo(root);
    const config = this.getConfig();
    this._rects = [
      this._root.makeRectangle(...config),
      this._root.makeRectangle(...config),
      this._root.makeRectangle(...config),
      this._root.makeRectangle(...config),
      this._root.makeRectangle(
        config[0],
        config[1],
        SIZE / RATIO,
        SIZE / RATIO
      ),
    ];
    this._rects.forEach((v, i) => {
      if (+i % 2 === 0) {
        this._rects[i].fill = themes[this._theme].secondary;
      } else {
        this._rects[i].fill = themes[this._theme].primary;
      }
      this._keyframes[i] = new TWEEN.Tween({
        x: v.translation.x,
        y: v.translation.y,
        rotation: themes[this._theme].state[i].rotation,
        size: themes[this._theme].state[i].size,
        scale: themes[this._theme].state[i].scale,
      });
      v.rotation = themes[this._theme].state[i].rotation;
      this._rects[i].noStroke();
    });
    this._root.bind('resize', this.resize);
    this._root.bind('update', this.update);
  }
  set theme(t: string) {
    this._theme = t;
    this.setStyles(t);
  }
  private update = (c: number) => {};
  private getConfig = (): [number, number, number, number] => [
    this._root.width / 2,
    this._root.height / 2,
    SIZE,
    SIZE,
  ];
  private resize = () => {
    const config = this.getConfig();
    for (let i in this._rects) {
      const coords = themes[this._theme].state[i].coords;
      if (coords) {
        this._rects[i].translation.x = coords.x + config[0];
        this._rects[i].translation.y = coords.y + config[1];
      } else {
        this._rects[i].translation.x = config[0];
        this._rects[i].translation.y = config[1];
      }
    }
  };
  private setStyles = (name: string) => {
    const theme = themes[name];
    const config = this.getConfig();
    for (let i in this._rects) {
      if (+i % 2 === 0) {
        this._rects[i].fill = theme.secondary;
      } else {
        this._rects[i].fill = theme.primary;
      }
      const coords = themes[this._theme].state[i].coords;
      this._keyframes[i]
        .to(
          {
            x: coords?.x + config[0],
            y: coords?.y + config[1],
            rotation: theme.state[i].rotation,
            scale: theme.state[i].scale ?? 1,
          },
          100
        )
        .repeat(1)
        .delay(100)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate((o) => {
          this._rects[i].translation.x = o.x;
          this._rects[i].translation.y = o.y;
        })
        .start(1000);
      this._rects[i].noStroke();
    }
    this._root.render();
  };
}
