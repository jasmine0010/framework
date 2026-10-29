let player;
let mic;
let analyzer;
let fft;

let useMic = true;

class AudioExample extends Scene {
    constructor() {
        super('AudioExample')
    }

    setup() {
        this.fft = new p5.FFT(0.8, 1024);
        this.analyzer = new p5.Amplitude();
        
        if (useMic) {
            this.mic = new p5.AudioIn();
            this.mic.start(() => {
                this.fft.setInput(this.mic);
                this.analyzer.setInput(this.mic);
            });
        } else {
            this.player = new p5.SoundFile("data/Whiplash.mp3", () => {
                this.player.play();
                this.fft.setInput(this.player);
                this.analyzer.setInput(this.player);
            });
        }
    }

    display() {
        background(0);
        
        const amp = this.analyzer.getLevel();
        const spectrum = this.fft.analyze();

        this.drawAudioWave(spectrum);
        
        this.drawCircle(amp);
    }

    drawAudioWave(spectrum) {
        stroke(255);
        strokeWeight(windowWidth * 0.00208);
        
        let nBands = spectrum.length / 5;
        let bandWidth = windowWidth / nBands;
        
        for (let i = 0; i <= nBands / 2; i++) {
            let amp = spectrum[i];
            
            let x = i * bandWidth;
            let bandHeight = (amp/255) * windowHeight * 0.15 + windowHeight * 0.001;
            
            line(x, windowHeight/2 - bandHeight, x, windowHeight/2 + bandHeight);
            line(windowWidth - x, windowHeight/2 - bandHeight, windowWidth - x, windowHeight/2 + bandHeight);
        }
    }

    drawCircle(amp) {
        fill(0, 80);
        stroke(255);
        strokeWeight(windowWidth * 0.00208);
        let diameter = map(amp, 0, 0.3, windowWidth * 0.104, windowWidth * 0.167);
        
        ellipse(windowWidth/2, windowHeight/2, diameter, diameter);
    }
}