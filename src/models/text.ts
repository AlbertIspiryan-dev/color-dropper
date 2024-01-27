import Controls from "./controls";

export default class Text {
  showMessage: boolean;
  messageTimeoutId: NodeJS.Timeout;
  private controls: Controls;

  constructor(controls: Controls) {
    this.controls = controls;
    this.showMessage = false;
    this.messageTimeoutId = null;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.controls.colors.selectedColor) return;
    this.drawText(ctx);
    if (this.showMessage) this.drawMessage(ctx);
  }

  private drawText(ctx: CanvasRenderingContext2D) {
    this.controls.colors.toggleShadow(ctx, true);
    ctx.font = `20px Arial`;
    ctx.fillStyle = this.controls.colors.selectedColor;
    ctx.fillText(
      this.controls.colors.selectedColor,
      this.controls.width / 2 - 60,
      this.controls.headerHeight / 2
    );
    this.controls.colors.toggleShadow(ctx, false);
  }

  private drawMessage(ctx: CanvasRenderingContext2D) {
    ctx.font = "italic 13px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(
      "Copied to clipboard!",
      this.controls.width / 2 - 60 - 13,
      this.controls.headerHeight / 2 + 20
    );
  }

  controlMessageVisible(time: number) {
    if (this.controls.mouse.onHeader) return;
    clearTimeout(this.messageTimeoutId);
    this.showMessage = true;
    this.messageTimeoutId = setTimeout(() => {
      this.showMessage = false;
    }, time);
  }
}
