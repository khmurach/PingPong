import Sprite from "./sprite";

export default class Brick extends Sprite {
  constructor(game, x, y, w, h, style) {
    super(x, y, w, h);
    this.game = game;
    this.style = style || "#f60";
    this.destroyable = true;
  }

  draw(ctx) {
    if (this.destroyed) return;

    ctx.fillStyle = this.style;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  update(dt) {}
}
