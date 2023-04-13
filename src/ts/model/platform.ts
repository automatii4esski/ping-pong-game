import { ICoordinates, ISize, IGetBorderPos } from '../types/interfaces';

export class PlatformM {
  private state: ICoordinates & Record<any, any>;
  get State() {
    return this.state;
  }

  private size: ISize = {
    width: 30,
    height: 150,
  };
  get Size() {
    return this.size;
  }

  private getBorderPos: IGetBorderPos;
  get BorderPos() {
    return this.getBorderPos;
  }

  private moveStep = 5;

  constructor(x: number, y: number, isRightPlatform: boolean = false) {
    this.state = {
      x: isRightPlatform ? x - this.Size.width : x,
      y,
      movespeedY: 0,
    };

    this.getBorderPos = {
      top: () => this.state.y,
      bot: () => this.state.y + this.size.height,
      left: () => this.state.x,
      right: () => this.state.x + this.size.width,
    };
  }

  update() {
    const potentialY = this.state.y + this.state.movespeedY;
    if (potentialY + this.size.height > window.innerHeight) {
      this.state.y = window.innerHeight - this.size.height;
      return;
    }
    if (potentialY < 0) {
      this.state.y = 0;
      return;
    }

    this.state.y = potentialY;
  }

  onKeyDown() {
    this.state.movespeedY = this.moveStep;
  }

  onKeyUp() {
    this.state.movespeedY = -this.moveStep;
  }

  resetDirection() {
    this.state.movespeedY = 0;
  }
}
