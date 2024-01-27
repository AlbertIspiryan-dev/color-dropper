import Controls from "./controls";

export default class Icon {
  x: number;
  y: number;
  width: number;
  height: number;
  private controls: Controls;
  private image: HTMLImageElement;

  constructor(controls: Controls, image: HTMLImageElement) {
    this.controls = controls;
    this.image = image;
    this.width = this.controls.headerHeight / 2;
    this.height = this.controls.headerHeight / 2;
    this.x = (this.controls.headerHeight - this.width) / 2;
    this.y = (this.controls.headerHeight - this.width) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
