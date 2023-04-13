import { ICoordinates, ISize } from '../types/interfaces';

export class PlatformV {
  private size: ISize;
  private color = 'white';
  constructor(
    private canvasContext: CanvasRenderingContext2D,
    { x, y }: ICoordinates,
    { width, height }: ISize
  ) {
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(x, y, width, height);

    this.size = {
      width,
      height,
    };
  }

  draw(x: number, y: number) {
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(x, y, this.size.width, this.size.height);
  }
}
