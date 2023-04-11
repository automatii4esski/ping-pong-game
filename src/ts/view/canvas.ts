export class CanvasV {
  private canvas = document.querySelector<HTMLCanvasElement>('.canvas')!;
  get Canvas() {
    return this.canvas;
  }

  private ctx = this.canvas.getContext('2d')!;
  get Context() {
    return this.ctx;
  }

  constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log(window.innerWidth);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
