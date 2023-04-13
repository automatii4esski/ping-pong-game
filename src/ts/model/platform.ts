import { ICoordinates, ISize, IGetBorderPos } from '../types/interfaces';

export class PlatformM {
  private state: ICoordinates & Record<any, any> = {
    x: 50,
    y: window.innerHeight / 2,
    movespeedY: 0,
  };
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

  constructor() {
    this.getBorderPos = {
      top: () => this.state.y,
      bot: () => this.state.y + this.size.height,
      left: () => this.state.x,
      right: () => this.state.x + this.size.width,
    };
  }

  update() {
    this.state.y += this.state.movespeedY;
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
