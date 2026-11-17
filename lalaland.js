class LalaLand extends Scene {
    constructor() {
        super('LalaLand');
    }

    setup() {
        createCanvas(windowWidth, windowHeight);
        this.fft = new p5.FFT(0.8, 1024);
        this.analyzer = new p5.Amplitude();
        
        if (useMic) {
            this.mic = new p5.AudioIn();
            this.mic.start(() => {
                this.fft.setInput(this.mic);
                this.analyzer.setInput(this.mic);
            });
        }
    }

    display() {
        background(0);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Welcome to LalaLand!', width / 2, height / 2);
    }
}