import { ICoordinates, ISize } from '../types/interfaces';

export class BallV {
  private color = 'red';
  constructor(
    private canvasContext: CanvasRenderingContext2D,
    { x, y }: ICoordinates,
    private radius: number
  ) {
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.arc(x, y, radius, 0, Math.PI * 2);
    this.canvasContext.fill();
    this.color = this.color;
    this.radius = radius;
  }

  draw(x: number, y: number) {
    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, this.radius, 0, Math.PI * 2);
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fill();
  }
}
