import { PlatformV } from './platform';

export class View {
  private activePlatform: PlatformV;
  private indexActivePlatform = 0;
  private platforms: [PlatformV, PlatformV];

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
