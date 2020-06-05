export default class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.destroyable = false;
    this.destroyed = false;
  }

  update(dt) {}

  draw(ctx) {}

  destroy() {
    if (!this.destroyable) {
      return;
    }
    this.destroyed = true;
  }

  bounce(o) {
    if (o.destroyed) return 0;

    let m = this;

    // top
    if (
      m.y < o.y && //top m is over top o
      m.y + m.h >= o.y && //bottom m is on/under top o
      ((m.x >= o.x && m.x <= o.x + o.w) ||
        (m.x + m.w >= o.x && m.x + m.w <= o.x + o.w))
    ) {
      return 1;
    }

    // right
    if (
      m.x + m.w > o.x + o.w && //right m is right of right o
      m.x <= o.x + o.w && //left m is on/left right o
      ((m.y >= o.y && m.y <= o.y + o.h) ||
        (m.y + m.h >= o.y && m.y + m.h <= o.y + o.h))
    ) {
      return 2;
    }

    // bottom
    if (
      m.y + m.h > o.y + o.h && //bottom m is under bottom o
      m.y <= o.y + o.h && //top m is on/over bottom o
      ((m.x >= o.x && m.x <= o.x + o.w) ||
        (m.x + m.w >= o.x && m.x + m.w <= o.x + o.w))
    ) {
      return 3;
    }

    // left
    if (
      m.x < o.x && //left m is left of left o
      m.x + m.w >= o.x && //right m is on/right left o
      ((m.y >= o.y && m.y <= o.y + o.h) ||
        (m.y + m.h >= o.y && m.y + m.h <= o.y + o.h))
    ) {
      return 4;
    }

    return 0;
  }
}
