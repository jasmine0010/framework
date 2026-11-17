class Fluids extends Scene {

    constructor() {
        super('fluids');
    }

    setup() {
        this.W = windowWidth;
        this.H = windowHeight;
        const n = this.W * this.H;
        const [u, v, u2, v2, p, p2, c, c2] = [[], [], [], [], [], [], [], []];
        this.img = createImage(this.W, this.H);
        this.img.loadPixels();
    }

    display() {
        blendMode(BLEND);
        background(0);
        image(this.camera, (windowWidth - this.displayWidth) / 2, (windowHeight - this.displayHeight) / 2, this.displayWidth, this.displayHeight)
    }

    advect() {
        
    }
    
    keyPressed() {
    }
}