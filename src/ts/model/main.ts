import { PlatformM } from './platform';
import { Score } from './score';

export class Model {
  private activePlatform: PlatformM;
  get ActivePlatform() {
    return this.activePlatform;
  }

  private platforms: [PlatformM, PlatformM];
  get Platforms() {
    return this.platforms;
  }

  private activeScore: Score;
  get ActiveScore() {
    return this.activeScore;
  }

  private scores: [Score, Score];
  get Scores() {
    return this.scores;
  }

  private indexActivePlatform = 0;

  constructor(initPlatform: PlatformM, secondPlatform: PlatformM) {
    this.activePlatform = initPlatform;
    this.platforms = [initPlatform, secondPlatform];

    const leftScore = new Score(window.innerWidth * 0.25, 100);
    const rightScore = new Score(window.innerWidth * 0.75, 100);

    this.activeScore = leftScore;
    this.scores = [leftScore, rightScore];
  }

  switchActivePlatform() {
    const newActivePlatformIndex = this.indexActivePlatform === 0 ? 1 : 0;
    this.indexActivePlatform = newActivePlatformIndex;
    this.activePlatform.resetDirection();
    this.activePlatform = this.platforms[newActivePlatformIndex];

    this.activeScore = this.scores[newActivePlatformIndex];
  }
}
