let lalaplayer;
let lalamic;
let lalaanalyzer;
let lalafft;

let lalauseMic = true;

let land;
let foreground;


class LalaLand extends Scene {
    
    constructor() {
        super('LalaLand');
    }

    setup() {
        this.land = loadImage("backgroundLaLaLand.png");
        this.foreground = loadImage("foregroundLaLaLand.png");

        createCanvas(windowWidth, windowHeight);

        this.lalafft = new p5.FFT(0.8, 1024);
        this.lalaanalyzer = new p5.Amplitude();
        
        if (lalauseMic) {
            this.lalamic = new p5.AudioIn();
            this.lalamic.start(() => {
                this.lalafft.setInput(this.lalamic);
                this.lalaanalyzer.setInput(this.lalamic);
            });
        }
    }

    display() {
        background(255);
        image(this.land, 0, -500);

        const amp = this.lalaanalyzer.getLevel();

        this.drawSun(amp);

        image(this.foreground, 0, -500);

        this.land.resize(windowWidth, windowHeight*2);
        this.foreground.resize(windowWidth, windowHeight*2);

        // this.land.resize(windowWidth, windowHeight*2);
        // this.foreground.resize(windowWidth, windowHeight*2);
    }

    drawSun(amp){
        noStroke();
        fill(255, 211, 51);

        let sunRadius = map(amp, 0, 0.1, 200, 250);
        let rayRadius = map(amp, 0, 0.1, 250, 500);

        drawingContext.save();
        drawingContext.filter = 'blur(30px)';
        ellipse(windowWidth/2, windowHeight/2, sunRadius);
                drawingContext.restore();

        noFill();
        stroke(255, 211, 51);
        strokeWeight(4);

        for (let i = 0; i < 12; i++) {
            let angle = map(i, 0, 12, 0, TWO_PI);
            let x1 = windowWidth/2 + cos(angle) * sunRadius/2;
            let y1 = windowHeight/2 + sin(angle) * sunRadius/2;
            let x2 = windowWidth/2 + cos(angle) * rayRadius;
            let y2 = windowHeight/2 + sin(angle) * rayRadius;
            line(x1, y1, x2, y2);
        }
        noStroke();
        
        

    }

}