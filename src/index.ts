import Controls from "./models/controls";

window.addEventListener("load", () => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  setCanvasSize(canvas);
  const ctx = canvas.getContext("2d")!;
  const background = document.getElementById(
    "backgroundImg"
  ) as HTMLImageElement;
  const icon = document.getElementById("iconImg") as HTMLImageElement;
  const controls = new Controls(canvas, background, icon);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    controls.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();

  canvas.addEventListener(
    "click",
    () => (
      controls.activateControls(),
      controls.colors.setSelectedColor(),
      controls.text.controlMessageVisible(2000)
    )
  );
  canvas.addEventListener("mousemove", (e) => controls.colors.setColor(e, ctx));
  window.addEventListener("resize", () => {
    setCanvasSize(canvas);
    controls.reset(canvas, background, icon);
  });

  function setCanvasSize(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
