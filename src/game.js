import Paddle from './paddle';
import Ball from './ball';
import Brick from './brick';

export default class Game {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.ballRadius = 10;
    this.ballStyle = '#00f';
    this.paddleWidth = 200;
    this.paddleHeight = 20;
    this.paddleStyle = '#0f0';
    this.objects = [];
    this.level = 1;
    this.lives = 3;
    this.maxLevel = 6;
    this.states = {
      Welcome: 1,
      LevelWelcome: 2,
      Play: 3,
      Pause: 4,
      LevelDone: 5,
      LevelFailed: 6,
      GameDone: 7,
      GameOver: 8
    };
    this.state = this.states.Welcome;
  }

  update(dt) {
    if (this.state !== this.states.Play) return;

    this.objects.forEach(x => x.update(dt));

    var bricks = 0;

    this.bricks.forEach(x => (bricks += !x.destroyed ? 1 : 0));

    if (bricks === 0) {
      this.state = this.states.LevelDone;
    }
  }

  draw(ctx) {
    switch (this.state) {
      case this.states.Welcome:
        this.welcomeScreen(ctx);
        break;
      case this.states.LevelWelcome:
        this.levelWelcomeScreen(ctx);
        break;
      case this.states.Play:
        this.objects.forEach(x => x.draw(ctx));
        break;
      case this.states.Pause:
        this.pauseScreen(ctx);
        break;
      case this.states.LevelDone:
        this.levelDoneScreen(ctx);
        break;
      case this.states.LevelFailed:
        this.levelFailedScreen(ctx);
        break;
      case this.states.GameDone:
        this.gameDoneScreen(ctx);
        break;
      case this.states.GameOver:
        this.gameOverScreen(ctx);
        break;
      default:
        break;
    }
  }

  start() {
    this.paddle = new Paddle(
      this,
      0,
      0,
      this.paddleWidth,
      this.paddleHeight,
      this.paddleStyle
    );

    this.maxSpeed = 8;

    this.ball = new Ball(this, 0, 0, this.ballRadius, this.ballStyle);

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 37: //left
          this.paddle.moveLeft();
          break;
        case 39: //right
          this.paddle.moveRight();
          break;
        default:
          break;
      }
    });

    document.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case 37: //left
          if (this.paddle.speed < 0) this.paddle.stop();
          break;
        case 39: //right
          if (this.paddle.speed > 0) this.paddle.stop();
          break;
        case 32:
          this.nextState();
          break;
        default:
          break;
      }
    });

    this.reset();
  }

  fail() {
    if (this.lives > 1) {
      this.lives--;
      this.state = this.states.LevelFailed;
    } else {
      this.state = this.states.GameOver;
    }
  }

  welcomeScreen(ctx) {
    ctx.fillStyle = '#00f';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText('Ping Pong', this.w / 2, this.h / 2);
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 50);
  }

  levelWelcomeScreen(ctx) {
    ctx.fillStyle = '#00f';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText('Level ' + this.level, this.w / 2, this.h / 2);
    ctx.fillStyle = '#ff0';
    ctx.font = '16px Arial';
    ctx.fillText('Lives: ' + this.lives, this.w / 2, this.h / 2 + 50);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 80);
  }

  levelDoneScreen(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText(
      'Level ' + this.level + ' is completed',
      this.w / 2,
      this.h / 2
    );
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 50);
  }

  levelFailedScreen(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText('Level is failed', this.w / 2, this.h / 2);
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 50);
  }

  pauseScreen(ctx) {
    ctx.fillStyle = '#00f';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText('Paused', this.w / 2, this.h / 2);
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 50);
  }

  gameOverScreen(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText('Game Over', this.w / 2, this.h / 2);
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 50);
  }

  gameDoneScreen(ctx) {
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '48px Comic Sans MS';
    ctx.fillText('Game is completed', this.w / 2, this.h / 2);
    ctx.font = '14px Arial';
    ctx.fillText('Press Space', this.w / 2, this.h / 2 + 50);
  }

  nextState() {
    switch (this.state) {
      case this.states.Welcome:
        this.level = 1;
        this.lives = 3;
        this.state = this.states.LevelWelcome;
        break;
      case this.states.LevelWelcome:
        this.reset();
        this.state = this.states.Play;
        break;
      case this.states.Play:
        this.state = this.states.Pause;
        this.ball._sx = this.ball.sx;
        this.ball._sy = this.ball.sy;
        this.ball.stop();
        break;
      case this.states.Pause:
        this.state = this.states.Play;
        this.ball.sx = this.ball._sx;
        this.ball.sy = this.ball._sy;
        break;
      case this.states.LevelDone:
        if (this.level < this.maxLevel) {
          this.level++;
          this.state = this.states.LevelWelcome;
        } else {
          this.state = this.states.GameDone;
        }
        break;
      case this.states.LevelFailed:
        this.state = this.states.LevelWelcome;
        break;
      case this.states.GameDone:
        this.state = this.states.Welcome;
        break;
      case this.states.GameOver:
        this.state = this.states.Welcome;
        break;
      default:
        break;
    }
  }

  reset() {
    this.objects = [];
    this.objects.push(this.paddle);
    this.objects.push(this.ball);
    this.bricks = [];

    for (let i = 0; i < this.level; i++) {
      let shift = i % 2 === 1 ? 30 : 0;
      for (let j = 0; j < (shift > 0 ? 8 : 9); j++) {
        let b = new Brick(this, 30 + shift + j * 60, 15 + i * 30, 60, 30);
        this.bricks.push(b);
        this.objects.push(b);
      }
    }

    this.ball.x = this.w / 2;
    this.ball.y = this.h / 2;

    this.ball.sx = this.random(2, 5);
    this.ball.sy = Math.round(Math.sqrt(50.0 - Math.pow(this.ball.sx, 2)), 2);

    this.paddle.x = this.w / 2 - this.paddleWidth / 2; //x
    this.paddle.y = this.h - this.paddleHeight - 10; //y
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
