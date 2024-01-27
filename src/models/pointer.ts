import Controls from "./controls";

export default class Pointer {
  private controls: Controls;
  private radius: number;
  private fontSize: number;
  private lineWidth: number;
  private textWidth: number;

  constructor(controls: Controls) {
    this.controls = controls;
    this.radius = 60;
    this.fontSize = 12;
    this.lineWidth = 15;
    this.textWidth = 50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.controls.mouse.onHeader) return;
    this.drawZoomArea(ctx);
    this.drawCircle(ctx);
    this.drawTextBackground(ctx);
    this.drawText(ctx);
  }

  drawZoomArea(context: CanvasRenderingContext2D) {
    const pixelCount = 9;
    const middleItemIndex = Math.ceil((pixelCount * pixelCount) / 2) - 1;
    const pixelData = context.getImageData(
      this.controls.mouse.x - pixelCount / 2,
      this.controls.mouse.y - pixelCount / 2,
      pixelCount,
      pixelCount
    ).data;

    let zoomAreaItemData = [];
    const zoomAreaItems = [];
    pixelData.forEach((item, index) => {
      const nextIndex = index % 4;
      if (zoomAreaItemData.length < 4)
        zoomAreaItemData[nextIndex] =
          nextIndex === 3 ? +(item / 255).toFixed(2) : item;
      if (zoomAreaItemData.length === 4) {
        zoomAreaItems.push(
          `rgba(${zoomAreaItemData[0]}, ${zoomAreaItemData[1]}, ${zoomAreaItemData[2]}, ${zoomAreaItemData[3]})`
        );
        zoomAreaItemData = [];
      }
    });

    let counterX = 0;
    let counterY = 0;
    for (let index = 0; index < zoomAreaItems.length; index++) {
      const leftTop = 0;
      const rightTop = pixelCount - 1;
      const rightBottom = pixelCount * pixelCount - pixelCount;
      const leftBottom = pixelCount * pixelCount - 1;
      if ([leftTop, rightTop, rightBottom, leftBottom].includes(index)) {
        counterX++;
        if (index % pixelCount === pixelCount - 1) {
          counterY++;
          counterX = 0;
        }
        continue;
      }

      const zoomAreaItemWidth = 12;
      const areaWidth = zoomAreaItemWidth * pixelCount;
      const x =
        this.controls.mouse.x + counterX * zoomAreaItemWidth - areaWidth / 2;
      const y =
        this.controls.mouse.y + counterY * zoomAreaItemWidth - areaWidth / 2;

      context.fillStyle = zoomAreaItems[index];
      context.fillRect(x, y, zoomAreaItemWidth, zoomAreaItemWidth);
      if (index === middleItemIndex) {
        this.controls.colors.toggleShadow(context, true);
        context.lineWidth = 1;
        context.strokeRect(x, y, zoomAreaItemWidth, zoomAreaItemWidth);
        this.controls.colors.toggleShadow(context, false);
      }
      counterX++;
      if (index % pixelCount === pixelCount - 1) {
        counterY++;
        counterX = 0;
      }
    }
  }

  private drawCircle(ctx: CanvasRenderingContext2D) {
    this.controls.colors.toggleShadow(ctx, true);
    ctx.beginPath();
    ctx.arc(
      this.controls.mouse.x,
      this.controls.mouse.y,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = this.controls.colors.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();
    this.controls.colors.toggleShadow(ctx, false);
  }

  private drawText(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillStyle = "#000";
    ctx.fillText(
      this.controls.colors.color,
      this.controls.mouse.x - this.textWidth / 2,
      this.controls.mouse.y + this.fontSize * 2.5
    );
  }

  private drawTextBackground(ctx: CanvasRenderingContext2D) {
    const padding = 18;
    const x = this.controls.mouse.x - this.textWidth / 2 - padding / 2;
    const y = this.controls.mouse.y + this.fontSize * 1.25;
    const height = this.fontSize * 1.75;
    const width = this.textWidth + padding;
    const radius = 10;
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  }
}
