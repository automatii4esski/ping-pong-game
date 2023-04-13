import { BallM } from './ball';
import { PlatformM } from './platform';
import { Score } from './score';

export class Model {
  private activePlatform: PlatformM;
  get ActivePlatform() {
    return this.activePlatform;
  }

  private leftPlatform: PlatformM;
  get LeftPlatform() {
    return this.leftPlatform;
  }
  private rightPlatform: PlatformM;
  get RightPlatform() {
    return this.rightPlatform;
  }

  private platforms: [PlatformM, PlatformM];
  get Platforms() {
    return this.platforms;
  }

  private activeScore: Score;
  get ActiveScore() {
    return this.activeScore;
  }

  private leftScore: Score;
  get LeftScore() {
    return this.leftScore;
  }
  private rightScore: Score;
  get RightScore() {
    return this.rightScore;
  }

  private scores: [Score, Score];
  get Scores() {
    return this.scores;
  }

  private ball: BallM;
  get Ball() {
    return this.ball;
  }

  private indexActivePlatform = 0;

  constructor() {
    this.leftScore = new Score(window.innerWidth * 0.25, 100);
    this.rightScore = new Score(window.innerWidth * 0.75, 100);

    const sideGap = 50;
    this.leftPlatform = new PlatformM(sideGap, window.innerHeight / 2);
    this.rightPlatform = new PlatformM(
      window.innerWidth - sideGap,
      window.innerHeight / 2,
      true
    );

    this.activePlatform = this.leftPlatform;
    this.platforms = [this.leftPlatform, this.rightPlatform];

    this.activeScore = this.leftScore;
    this.scores = [this.leftScore, this.rightScore];

    this.ball = new BallM();
  }

  switchActivePlatform() {
    const newActivePlatformIndex = this.indexActivePlatform === 0 ? 1 : 0;
    this.indexActivePlatform = newActivePlatformIndex;
    this.activePlatform.resetDirection();
    this.activePlatform = this.platforms[newActivePlatformIndex];

    this.activeScore = this.scores[newActivePlatformIndex];
  }
}
