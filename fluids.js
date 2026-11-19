class Fluids extends Scene {

    constructor() {
        super('fluids');
    }

    setup() {
        this.W = windowWidth;
        this.H = windowHeight;
        const n = this.W * this.H;
        const [u, v, u2, v2, p, p2, c, c2] = [[], [], [], [], [], [], [], []];
    }

    display() {
        blendMode(BLEND);
        background(0);
    }

    advect() {
        
    }
    
    keyPressed() {
    }
}