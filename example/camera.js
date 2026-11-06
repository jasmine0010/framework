let camera;

class Camera extends Scene {
    constructor() {
        super('Camera');

        this.kx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];

        this.ky = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        colorMode(HSL, 360, 100, 100, 1);
    }

    setup() {
        pixelDensity(1);

        this.camera = createCapture(VIDEO, { flipped: true }, () => {
            this.w = this.camera.width;
            this.h = this.camera.height;        
            
            this.edges = createImage(this.w, this.h);
            this.edges.loadPixels();

            this.scale = Math.min(windowWidth / this.w, windowHeight / this.h);
            this.displayWidth = this.w * this.scale;
            this.displayHeight = this.h * this.scale;
        });

        this.camera.hide();
    }

    display() {
        blendMode(BLEND);
        fill(0, 0, 0, 0.1);
        rect(0, 0, width, height);

        if (!this.edges) return;

        this.camera.loadPixels();
        const og = this.camera.pixels;
        const result = this.edges.pixels;

        for (let x = 1; x < this.w - 1; x++) {
            for (let y = 1; y < this.h - 1; y++) {
                let rx = 0, ry = 0;
                let gx = 0, gy = 0;
                let bx = 0, by = 0;

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const p = ((y + dy) * this.w + x + dx) * 4;
                        
                        rx += og[p] * this.kx[dx + 1][dy + 1];
                        ry += og[p] * this.ky[dx + 1][dy + 1];

                        gx += og[p + 1] * this.kx[dx + 1][dy + 1];
                        gy += og[p + 1] * this.ky[dx + 1][dy + 1];

                        bx += og[p + 2] * this.kx[dx + 1][dy + 1];
                        by += og[p + 2] * this.ky[dx + 1][dy + 1];
                    }
                }

                const p = (y * this.w + x) * 4;
                const r = sqrt(rx * rx + ry * ry);
                const g = sqrt(gx * gx + gy * gy);
                const b = sqrt(bx * bx + by * by);
                const shared = Math.min(r, g, b) * 0.5;
                
                result[p] = r - shared;
                result[p + 1] = g - shared;
                result[p + 2] = b - shared;
                result[p + 3] = 255;
            }
        }

        this.edges.updatePixels();
        blendMode(LIGHTEST);
        image(this.edges, (windowWidth - this.displayWidth) / 2, (windowHeight - this.displayHeight) / 2, this.displayWidth, this.displayHeight);
    }
}