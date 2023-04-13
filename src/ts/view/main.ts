import { PlatformV } from './platform';

export class View {
  private activePlatform: PlatformV;
  get ActivePlatform() {
    return this.activePlatform;
  }

  private platforms: [PlatformV, PlatformV];
  get Platforms() {
    return this.platforms;
  }

  private indexActivePlatform = 0;

  constructor(initPlatform: PlatformV, secondPlatform: PlatformV) {
    this.activePlatform = initPlatform;
    this.platforms = [initPlatform, secondPlatform];
  }

  switchActivePlatform() {
    const newActivePlatformIndex = this.indexActivePlatform === 0 ? 1 : 0;
    this.indexActivePlatform = newActivePlatformIndex;
    this.activePlatform = this.platforms[newActivePlatformIndex];
  }
}
