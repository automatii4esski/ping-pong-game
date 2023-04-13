import { PlatformV } from './platform';
import { BallV } from './ball';
import { CanvasV } from './canvas';
import { Score } from './score';
import { ICoordinates, ISize } from '../types/interfaces';

export class View {
  private activePlatform: PlatformV;
  get ActivePlatform() {
    return this.activePlatform;
  }

  private leftPlatform: PlatformV;
  get LeftPlatform() {
    return this.leftPlatform;
  }

  private rightPlatform: PlatformV;
  get ReftPlatform() {
    return this.rightPlatform;
  }

  private platforms: [PlatformV, PlatformV];
  get Platforms() {
    return this.platforms;
  }

  private leftScore: Score;
  get LeftScore() {
    return this.leftScore;
  }
  private rightScore: Score;
  get RightScore() {
    return this.rightScore;
  }

  private canvas = new CanvasV();
  get Canvas() {
    return this.canvas;
  }

  private ball: BallV;
  get Ball() {
    return this.ball;
  }

  private indexActivePlatform = 0;

  constructor(
    leftPlatformCoordintaes: ICoordinates,
    leftPlatformSize: ISize,
    rightPlatformCoordintaes: ICoordinates,
    rightPlatformSize: ISize,
    leftScoreCoordintaes: ICoordinates,
    rightScoreCoordintaes: ICoordinates,
    ballCoordinates: ICoordinates,
    ballRadius: number
  ) {
    this.leftPlatform = new PlatformV(
      this.canvas.Context,
      leftPlatformCoordintaes,
      leftPlatformSize
    );

    this.rightPlatform = new PlatformV(
      this.canvas.Context,
      rightPlatformCoordintaes,
      rightPlatformSize
    );

    this.leftScore = new Score(this.canvas.Context, leftScoreCoordintaes);
    this.rightScore = new Score(this.canvas.Context, rightScoreCoordintaes);

    this.ball = new BallV(this.canvas.Context, ballCoordinates, ballRadius);

    this.activePlatform = this.leftPlatform;
    this.platforms = [this.leftPlatform, this.rightPlatform];
  }

  switchActivePlatform() {
    const newActivePlatformIndex = this.indexActivePlatform === 0 ? 1 : 0;
    this.indexActivePlatform = newActivePlatformIndex;
    this.activePlatform = this.platforms[newActivePlatformIndex];
  }
}
