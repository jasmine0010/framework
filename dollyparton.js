class DollyParton extends Scene {

    constructor() {
        super('Dolly Parton');
        this.img1 = loadImage("Skyline.png");
        this.img2 = loadImage("bird.png");

        // x, y, speed, size for each bird
        this.birds = [
            { x: -100, y: 100, speed: 1.8,   size: 0.13  },
            { x: -300, y: 180, speed: 1.5, size: 0.1 },
            { x: -500, y: 60,  speed: 2.5, size: 0.09 },
            { x: -700, y: 140, speed: 1.6,   size: 0.13 }
        ];
    }

    setup() {
    }

    display() {
        background(0);
        image(this.img1, 0, 0, windowWidth, windowHeight);

        for (let b of this.birds) {
            image(this.img2, b.x, b.y + sin(b.x * 0.03) * 30,
                  this.img2.width * b.size, this.img2.height * b.size);
                  
            
        }
    }

    update() {
        for (let b of this.birds) {
            b.x += b.speed;
        }
    }
}
