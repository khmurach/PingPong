import Sprite from "./sprite";

export default class Ball extends Sprite {
  constructor(game, x, y, r, style) {
    super(x, y, 2 * r, 2 * r);
    this.game = game;
    this.r = r;
    this.style = style || "#00f";
    this.sx = 5;
    this.sy = 5;
  }

  draw(ctx) {
    ctx.fillStyle = this.style;
    ctx.beginPath();
    ctx.arc(this.x + this.r, this.y + this.r, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(dt) {
    if (this.sx * this.sy === 0) return;
    this.x += this.sx;
    this.y += this.sy;

    // top border
    if (this.y <= 0) {
      this.y = 0;
      this.sy = -this.sy;
    }
    // right border
    if (this.x + this.w >= this.game.w) {
      this.x = this.game.w - this.w;
      this.sx = -this.sx;
    }
    // left border
    if (this.x <= 0) {
      this.x = 0;
      this.sx = -this.sx;
    }
    // bottom border
    if (this.y + this.h >= this.game.h) {
      this.y = this.game.h - this.h;
      this.stop();
      this.game.fail();
    }

    this.game.objects.forEach(o => {
      if (this.bounce(o) === 1) {
        this.sy = -this.sy;
        o.destroy();
        this.y = o.y - this.h;
      }
      if (this.bounce(o) === 2) {
        this.sx = -this.sx;
        o.destroy();
        this.x = o.x + o.w;
      }
      if (this.bounce(o) === 3) {
        this.sy = -this.sy;
        o.destroy();
        this.y = o.y + o.h;
      }
      if (this.bounce(o) === 4) {
        this.sx = -this.sx;
        o.destroy();
        this.x = o.x - this.w;
      }
    });
  }

  stop() {
    this.sx = 0;
    this.sy = 0;
  }
}
