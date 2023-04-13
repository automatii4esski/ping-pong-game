import { PlatformM } from './platform';

export class Model {
  private activePlatform: PlatformM;
  get ActivePlatform() {
    return this.activePlatform;
  }

  private platforms: [PlatformM, PlatformM];
  get Platforms() {
    return this.platforms;
  }

  private indexActivePlatform = 0;

  constructor(initPlatform: PlatformM, secondPlatform: PlatformM) {
    this.activePlatform = initPlatform;
    this.platforms = [initPlatform, secondPlatform];
  }

  switchActivePlatform() {
    const newActivePlatformIndex = this.indexActivePlatform === 0 ? 1 : 0;
    this.indexActivePlatform = newActivePlatformIndex;
    this.activePlatform = this.platforms[newActivePlatformIndex];
  }
}
