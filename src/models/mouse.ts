import Controls from "./controls";

export default class Mouse {
  x: number;
  y: number;
  onHeader: boolean;
  onIcon: boolean;
  private controls: Controls;

  constructor(controls: Controls) {
    this.controls = controls;
    this.x = 0;
    this.y = 0;
    this.onHeader = false;
    this.onIcon = false;
    this.init();
  }

  private init() {
    window.addEventListener("mousemove", (e: MouseEvent) => {
      this.x = e.x;
      this.y = e.y;
      this.onHeader = e.y <= this.controls.headerHeight;
      if (
        this.x >= this.controls.icon.x &&
        this.x <= this.controls.icon.x + this.controls.icon.width &&
        this.y >= this.controls.icon.y &&
        this.y <= this.controls.icon.y + this.controls.icon.height
      ) {
        this.controls.canvas.style.cursor = "pointer";
        this.onIcon = true;
      } else {
        this.controls.canvas.style.cursor = "default";
        this.onIcon = false;
      }
    });
  }
}
