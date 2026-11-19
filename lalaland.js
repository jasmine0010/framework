let lalaplayer;
let lalamic;
let lalaanalyzer;
let lalafft;

let lalauseMic = true;

let background;
let foreground;

class LalaLand extends Scene {
    
    constructor() {
        super('LalaLand');
    }

    setup() {
        this.background = loadImage("backgroundLaLaLand.png");
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
        image(this.background, 0, 0);
        image(this.foreground, 0, 0);
    }
}