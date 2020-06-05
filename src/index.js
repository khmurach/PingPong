import Game from "./game";

let stg = document.getElementById("stage");
let ctx = stg.getContext("2d");
let gameWidth = stg.clientWidth;
let gameHeight = stg.clientHeight;
let game = new Game(gameWidth, gameHeight);

game.start();

let lastTime = 0;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  game.update(dt);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
