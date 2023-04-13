export interface ISize {
  width: number;
  height: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGetBorderPos {
  top: () => number;
  bot: () => number;
  left: () => number;
  right: () => number;
}

export interface IBallConfig {
  INIT_POS_X: number;
  INIT_POS_Y: number;
  RADIUS: number;
  COLOR: string;
}
