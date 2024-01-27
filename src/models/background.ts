import Controls from "./controls";

export default class Background {
  private controls: Controls;
  private image: HTMLImageElement;
  private width: number;
  private height: number;

  constructor(controls: Controls, image: HTMLImageElement) {
    this.controls = controls;
    this.image = image;
    this.width = this.controls.width;
    this.height = this.controls.height - this.controls.headerHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      0,
      this.controls.headerHeight,
      this.width,
      this.height
    );
  }
}
