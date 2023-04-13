import { ICoordinates } from '../types/interfaces';

export class Score {
  private coordinates: ICoordinates;
  private color = 'red';

  constructor(
    private canvasContext: CanvasRenderingContext2D,
    { x, y }: ICoordinates
  ) {
    this.coordinates = {
      x,
      y,
    };

    canvasContext.font = '48px serif';
    canvasContext.fillStyle = this.color;
    canvasContext.fillText('0', x, y);
  }

  draw(score: number) {
    this.canvasContext.fillStyle = this.color;

    this.canvasContext.fillText(
      `${score}`,
      this.coordinates.x,
      this.coordinates.y
    );
  }
}
