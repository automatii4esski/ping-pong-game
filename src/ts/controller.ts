import { CanvasV } from './view/canvas';
import { PlatformV } from './view/platform';
import { BallV } from './view/ball';
import { View } from './view/main';

import { PlatformM } from './model/platform';
import { BallM } from './model/ball';
import { Model } from './model/main';

import * as config from './config';

const canvas = new CanvasV();

const sideGap = 50;

const leftPlatformM = new PlatformM(sideGap, window.innerHeight / 2);
const leftPlatformV = new PlatformV(
  canvas.Context,
  leftPlatformM.State,
  leftPlatformM.Size
);

const rightPlatformM = new PlatformM(
  window.innerWidth - sideGap,
  window.innerHeight / 2,
  true
);
const rightPlatformV = new PlatformV(
  canvas.Context,
  rightPlatformM.State,
  rightPlatformM.Size
);

const ballM = new BallM();
const ballV = new BallV(canvas.Context, ballM.State, ballM.Radius);

const model = new Model(leftPlatformM, rightPlatformM);
const view = new View(leftPlatformV, rightPlatformV);

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
