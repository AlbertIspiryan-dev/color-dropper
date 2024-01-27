import Colors from "./colors";
import Pointer from "./pointer";
import Background from "./background";
import Icon from "./icon";
import Text from "./text";
import Mouse from "./mouse";

export default class Controls {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  headerHeight: number;
  text: Text;
  colors: Colors;
  mouse: Mouse;
  icon: Icon;
  private active: boolean;
  private pointer: Pointer;
  private background: Background;

  constructor(
    canvas: HTMLCanvasElement,
    background: HTMLImageElement,
    icon: HTMLImageElement
  ) {
    this.reset(canvas, background, icon);
  }

  activateControls() {
    if (this.mouse.onIcon) this.active = !this.active;
  }

  render(context: CanvasRenderingContext2D) {
    this.icon.draw(context);
    this.background.draw(context);
    if (!this.active) return;
    this.text.draw(context);
    this.pointer.draw(context);
  }

  reset(
    canvas: HTMLCanvasElement,
    background: HTMLImageElement,
    icon: HTMLImageElement
  ) {
    this.canvas = canvas;
    this.active = false;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.headerHeight = 80;
    this.mouse = new Mouse(this);
    this.colors = new Colors(this);
    this.pointer = new Pointer(this);
    this.background = new Background(this, background);
    this.icon = new Icon(this, icon);
    this.text = new Text(this);
  }
}
