import Controls from "./controls";

export default class Colors {
  selectedColor: string;
  color: string;
  private controls: Controls;

  constructor(controls: Controls) {
    this.controls = controls;
    this.color = "";
    this.selectedColor = "";
  }

  setColor(context: CanvasRenderingContext2D) {
    if (this.controls.mouse.onHeader) return;
    const imageData = context.getImageData(
      this.controls.mouse.x,
      this.controls.mouse.y,
      1,
      1
    ).data;
    this.color = this.rgbToHex(
      `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`
    );
  }

  setSelectedColor() {
    if (this.controls.mouse.onIcon) return (this.selectedColor = "");
    if (this.controls.mouse.onHeader) return;
    this.selectedColor = this.color;
    navigator.clipboard.writeText(this.selectedColor);
  }

  private rgbToHex(rgbString: string): string {
    const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const matches = rgbString.match(regex);
    let data = { r: 0, g: 0, b: 0 };
    if (matches) {
      const [r, g, b] = matches.slice(1).map(Number);
      data = { r, g, b };
    }

    const toHex = (value: number): string => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(data.r)}${toHex(data.g)}${toHex(data.b)}`;
  }

  toggleShadow(ctx: CanvasRenderingContext2D, add: boolean) {
    ctx.shadowColor = add ? "black" : "transparent";
    ctx.shadowBlur = add ? 1 : 0;
    ctx.shadowOffsetX = add ? 1 : 0;
    ctx.shadowOffsetY = add ? 1 : 0;
  }
}
