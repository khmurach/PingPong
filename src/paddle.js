import Sprite from "./sprite";

export default class Paddle extends Sprite {
  constructor(game, x, y, w, h, style) {
    super(x, y, w, h);
    this.game = game;
    this.style = style || "#0f0";
    this.speed = 0;
    this.maxSpeed = 7;
  }

  draw(ctx) {
    let style = ctx.fillStyle;
    ctx.fillStyle = this.style;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = style;
  }

  update(dt) {
    this.x += this.speed;

    if (this.x < 0) this.x = 0;
    if (this.x + this.w > this.game.w) this.x = this.game.w - this.w;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }
}
