import { IBallConfig } from '../types/interfaces';
import { platformName } from '../types/types';

export class BallM {
  public state;
  get State() {
    return this.state;
  }

  private borderPos;
  private radius: number;
  private checkCollision: (...args: any) => any;

  constructor(
    { INIT_POS_X, INIT_POS_Y, RADIUS }: IBallConfig,
    initialPlayer: platformName
  ) {
    this.state = {
      x: INIT_POS_X,
      y: INIT_POS_Y,
      directionX: initialPlayer === 'left' ? -2 : 2,
      directionY: -2,
    };
    // Math.random() > 0.5 ? 2 : -2

    this.radius = RADIUS;
    this.checkCollision =
      this.state.directionY === -2
        ? this.checkCollisionOnTopMove
        : this.checkCollisionOnBottomMove;

    this.borderPos = {
      top: () => this.state.y - this.radius,
      bot: () => this.state.y + this.radius,
      left: () => this.state.x - this.radius,
      right: () => this.state.x + this.radius,
    };

    console.log(this.checkCollision, this.state);
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
      this.borderPos.top() <= elBot
    ) {
      this.state.directionX *= -1;
      onPlayerCollision();
    }
  }
}
