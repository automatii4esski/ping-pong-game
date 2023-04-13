import { ICoordinates } from '../types/interfaces';

export class Score {
  private score = 0;
  get Score() {
    return this.score;
  }

  private coordinates: ICoordinates;
  get Coordinates() {
    return this.coordinates;
  }

  constructor(x: number, y: number) {
    this.coordinates = {
      x,
      y,
    };
  }

  increase() {
    this.score++;
  }

  reset() {
    this.score = 0;
  }
}
