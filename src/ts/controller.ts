import { CanvasV } from './view/canvas';
import { PlatformV } from './view/platform';
import { BallV } from './view/ball';
import { Score } from './view/score';
import { View } from './view/main';

import { PlatformM } from './model/platform';
import { BallM } from './model/ball';
import { Model } from './model/main';

const model = new Model();
const view = new View(
  model.LeftPlatform.State,
  model.LeftPlatform.Size,
  model.RightPlatform.State,
  model.RightPlatform.Size,
  model.LeftScore.Coordinates,
  model.RightScore.Coordinates,
  model.Ball.State,
  model.Ball.Radius
);

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
    view.Canvas.clear();

    view.Platforms.forEach((view, i) => {
      let { x, y } = model.Platforms[i].State;
      view.draw(x, y);
    });

    view.LeftScore.draw(model.Scores[0].Score);
    view.RightScore.draw(model.Scores[1].Score);

    view.Ball.draw(model.Ball.State.x, model.Ball.State.y);
  }

  update() {
    const border = model.ActivePlatform.BorderPos;
    model.ActivePlatform.update();
    model.Ball.update(
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
