import Two from 'two.js';

type Rect = Two.Rectangle;

export default class Squares {
  public static SIZE = 140;
  public static RATIO = 2.64;
  private $root: Two;
  private $rects: [Rect, Rect, Rect, Rect, Rect];
  constructor(root: HTMLDivElement) {
    this.$root = new Two({ fullscreen: false, autostart: true }).appendTo(root);
    const config: [number, number, number, number] = [
      this.$root.width / 2,
      this.$root.height / 2,
      Squares.SIZE,
      Squares.SIZE,
    ];
    this.$rects = [
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(...config),
      this.$root.makeRectangle(
        config[0],
        config[1],
        Squares.SIZE / Squares.RATIO,
        Squares.SIZE / Squares.RATIO
      ),
    ];
  }
}
