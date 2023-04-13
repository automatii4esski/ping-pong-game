import { CanvasV } from './view/canvas';
import { PlatformV } from './view/platform';
import { BallV } from './view/ball';
import { View } from './view/main';

import { PlatformM } from './model/platform';
import { BallM } from './model/ball';
import { Model } from './model/main';

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
  constructor() {
    requestAnimationFrame(this.gameFlow.bind(this));
    window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
    window.addEventListener('keyup', this.onKeyUpHandler.bind(this));
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
        model.ActivePlatform.onKeyDown();
        break;
      case 'w':
      case 'ArrowUp':
        model.ActivePlatform.onKeyUp();
        break;
    }
  }

  onKeyUpHandler(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
      case 'ArrowDown':
      case 'w':
      case 'ArrowUp':
        model.ActivePlatform.resetDirection();
        break;
    }
  }

  draw() {
    canvas.clear();

    view.Platforms.forEach((view, i) => {
      let { x, y } = model.Platforms[i].State;
      view.draw(x, y);
    });

    ballV.draw(ballM.State.x, ballM.State.y);
  }

  update() {
    const border = model.ActivePlatform.BorderPos;
    model.ActivePlatform.update();
    ballM.update(
      border.left(),
      border.right(),
      border.top(),
      border.bot(),
      this.playerCollisionHandler.bind(this)
    );
  }

  playerCollisionHandler() {
    model.switchActivePlatform();
  }
}
const a = new Controller();
