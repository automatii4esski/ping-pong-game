import { IBallConfig, ICoordinates, IGetBorderPos } from '../types/interfaces';
import { INIT_PLATFORM } from '../config';

export class BallM {
  private state: ICoordinates & Record<any, any>;
  get State() {
    return this.state;
  }

  private borderPos: IGetBorderPos;
  get BorderPos() {
    return this.borderPos;
  }

  private radius = 25;
  get Radius() {
    return this.radius;
  }
  private moveSpeed = 4;
  private checkCollision: (...args: any) => any;

  constructor() {
    this.state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      directionX: INIT_PLATFORM === 'left' ? -this.moveSpeed : this.moveSpeed,
      directionY: Math.random() > 0.5 ? this.moveSpeed : -this.moveSpeed,
    };

    this.checkCollision =
      this.state.directionY === -this.moveSpeed
        ? this.checkCollisionOnTopMove
        : this.checkCollisionOnBottomMove;

    this.borderPos = {
      top: () => this.state.y - this.radius,
      bot: () => this.state.y + this.radius,
      left: () => this.state.x - this.radius,
      right: () => this.state.x + this.radius,
    };
  }

  update(
    elLeft: number,
    elRight: number,
    elTop: number,
    elBot: number,
    onPlayerCollision: () => void
  ) {
    this.checkCollision(elLeft, elRight, elTop, elBot, onPlayerCollision);
    this.state.y += this.state.directionY;
    this.state.x += this.state.directionX;
  }

  checkCollisionOnBottomMove(
    elLeft: number,
    elRight: number,
    elTop: number,
    elBot: number,
    onPlayerCollision: () => void
  ) {
    if (this.borderPos.bot() >= window.innerHeight) {
      this.state.directionY *= -1;
      this.checkCollision = this.checkCollisionOnTopMove;
    } else if (
      this.borderPos.right() >= elLeft &&
      this.borderPos.left() <= elRight &&
      this.borderPos.bot() >= elTop &&
      this.borderPos.top() <= elBot
    ) {
      this.state.directionX *= -1;
      onPlayerCollision();
    }
  }

  checkCollisionOnTopMove(
    elLeft: number,
    elRight: number,
    elTop: number,
    elBot: number,
    onPlayerCollision: () => void
  ) {
    if (this.borderPos.top() <= 0) {
      this.state.directionY *= -1;
      this.checkCollision = this.checkCollisionOnBottomMove;
    } else if (
      this.borderPos.right() >= elLeft &&
      this.borderPos.left() <= elRight &&
      this.borderPos.bot() >= elTop &&
      -this.borderPos.top() <= elBot
    ) {
      this.state.directionX *= -1;
      onPlayerCollision();
    }
  }
}
