import { CanvasV } from './view/canvas';
import { PlatformV } from './view/platform';
import { BallV } from './view/ball';

import { PlatformM } from './model/platform';
import { BallM } from './model/ball';

import * as config from './config';

const canvas = new CanvasV();

const leftPlatformV = new PlatformV(canvas.Context, config.LEFT_PLAYER);
const leftPlatformM = new PlatformM(config.LEFT_PLAYER);

const rightPlatformV = new PlatformV(canvas.Context, config.RIGHT_PLAYER);
const rightPlatformM = new PlatformM(config.RIGHT_PLAYER);

const ballV = new BallV(canvas.Context, config.BALL);
const ballM = new BallM(config.BALL, config.INIT_PLATFORM);

class Controller {
  private activePlatform: PlatformM;
  private activeIndex = 0;
  private platformViews = [leftPlatformV, rightPlatformV];
  private platformModels = [leftPlatformM, rightPlatformM];

  constructor() {
    requestAnimationFrame(this.gameFlow.bind(this));
    window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
    window.addEventListener('keyup', this.onKeyUpHandler.bind(this));

    this.activePlatform =
      config.INIT_PLATFORM === 'left' ? leftPlatformM : rightPlatformM;
  }

  gameFlow(timestamp: number) {
    this.update();
    this.draw();
    requestAnimationFrame(this.gameFlow.bind(this));
  }

  onKeyDownHandler(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
      case 'ArrowDown':
        this.activePlatform.onKeyDown();
        break;
      case 'w':
      case 'ArrowUp':
        this.activePlatform.onKeyUp();
        break;
    }
  }

  onKeyUpHandler(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
      case 'ArrowDown':
      case 'w':
      case 'ArrowUp':
        this.activePlatform.resetDirection();
        break;
    }
  }

  draw() {
    canvas.clear();

    this.platformViews.forEach((view, i) => {
      let { x, y } = this.platformModels[i].State;
      view.draw(x, y);
    });

    ballV.draw(ballM.State.x, ballM.State.y);
  }

  update() {
    const border = this.activePlatform.BorderPos;
    this.activePlatform.update();
    ballM.update(
      border.left(),
      border.right(),
      border.top(),
      border.bot(),
      this.playerCollisionHandler.bind(this)
    );
  }

  playerCollisionHandler() {
    this.activePlatform =
      this.platformModels[
        this.activeIndex === 0 ? (this.activeIndex = 1) : (this.activeIndex = 0)
      ];
  }
}
const a = new Controller();
