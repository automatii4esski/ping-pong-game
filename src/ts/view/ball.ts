import { IBallConfig } from '../types/interfaces';

export class BallV {
  private radius: number;
  private color: string;
  constructor(
    private canvasContext: CanvasRenderingContext2D,
    { INIT_POS_X, INIT_POS_Y, RADIUS, COLOR }: IBallConfig
  ) {
    this.canvasContext.fillStyle = COLOR;
    this.canvasContext.arc(INIT_POS_X, INIT_POS_Y, RADIUS, 0, Math.PI * 2);
    this.canvasContext.fill();
    this.color = COLOR;
    this.radius = RADIUS;
  }

  draw(x: number, y: number) {
    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, this.radius, 0, Math.PI * 2);
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fill();
  }
}
