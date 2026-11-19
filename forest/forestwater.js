class ForestWater extends Scene {
  constructor() {
    super('Forest Water');
  this.loaded = false;
  this.img = loadImage('forest/forest.png', () => this.loaded = true);
}


  setup() {

  }


  display() {
    if (!this.loaded) return;  
    background(0);
    this.drawForest();
  }

  drawForest() {
    let cropTop = 0.3;

    // The part of the original image we want to keep
    let sx = 0;
    let sy = this.img.height * cropTop;
    let sw = this.img.width;
    let sh = this.img.height - sy;

    // Zoom to cover the screen without stretching
    let scale = max(windowWidth / sw, height / sh);
    let w = sw * scale;
    let h = sh * scale;

    // Center left-to-right, line up with the bottom
    let x = (windowWidth - w) / 2;
    let y = windowHeight - h;

    image(this.img, x, y, w, h, sx, sy, sw, sh);
  }
}