import { IPlayerConfig } from '../types/interfaces';

export class PlatformM {
  private state;
  get State() {
    return this.state;
  }

  private moveStep: number;
  private borderPos;
  get BorderPos() {
    return this.borderPos;
  }

  constructor({
    INIT_POS_X,
    INIT_POS_Y,
    MOVE_STEP,
    WIDTH,
    HEIGHT,
  }: IPlayerConfig) {
    this.state = {
      x: INIT_POS_X,
      y: INIT_POS_Y,
      directionY: 0,
    };
    this.moveStep = MOVE_STEP;
    this.borderPos = {
      top: () => this.state.y,
      bot: () => this.state.y + HEIGHT,
      left: () => this.state.x,
      right: () => this.state.x + WIDTH,
    };
  }

  update() {
    this.state.y += this.state.directionY;
  }

  onKeyDown() {
    this.state.directionY = this.moveStep;
  }

  onKeyUp() {
    this.state.directionY = -this.moveStep;
  }

  resetDirection() {
    this.state.directionY = 0;
  }
}
