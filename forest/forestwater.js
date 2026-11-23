class ForestWater extends Scene {
  constructor() {
    super('Forest Water');
  this.loaded = false;
  this.img = loadImage('forest/blue.jpg', () => this.loaded = true);

 this.points = [];
    this.spacing = 12;
    this.radius = 100;
    this.pushAmount = 0.3;
    this.built = false;

}

setup(){

}
build() {
    this.img.resize(width, height);

    this.points = [];
    for (let x = 0; x <= width; x += this.spacing) {
      for (let y = 0; y <= height; y += this.spacing) {
        this.points.push({
          x: x, y: y,
          homeX: x, homeY: y,
          vx: 0, vy: 0
        });
      }
    }
    this.built = true;
  }

  display() {
    if (!this.loaded) return;
    if (!this.built) this.build();

    background('#2f4a6b');

    let dx = mouseX - pmouseX;
    let dy = mouseY - pmouseY;
    let sp = this.spacing;
    let s = sp * 2;

    for (let p of this.points) {
      let d = dist(p.x, p.y, mouseX, mouseY);
      if (d < this.radius) {
        let strength = 1 - d / this.radius;
        p.vx += dx * strength * this.pushAmount;
        p.vy += dy * strength * this.pushAmount;
      }

      p.vx += (p.homeX - p.x) * 0.05;
      p.vy += (p.homeY - p.y) * 0.05;
      p.vx *= 0.9;
      p.vy *= 0.9;
      p.x += p.vx;
      p.y += p.vy;

      image(this.img, p.x - sp/2, p.y - sp/2, s, s,
            p.homeX - sp/2, p.homeY - sp/2, s, s);
    }
  }
}



/* the original forest code:

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

*/