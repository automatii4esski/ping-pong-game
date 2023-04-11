import { IPlayerConfig } from '../types/interfaces';

export class PlatformV {
  private width: number;
  private height: number;
  private color: string;
  constructor(
    private canvasContext: CanvasRenderingContext2D,
    { INIT_POS_X, INIT_POS_Y, WIDTH, HEIGHT, COLOR }: IPlayerConfig
  ) {
    this.canvasContext.fillStyle = COLOR;
    this.canvasContext.fillRect(INIT_POS_X, INIT_POS_Y, WIDTH, HEIGHT);
    this.width = WIDTH;
    this.height = HEIGHT;
    this.color = COLOR;
  }

  draw(x: number, y: number) {
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(x, y, this.width, this.height);
  }
}
