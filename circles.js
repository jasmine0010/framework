let booms = [];
let particles = [];

let circleplayer;
let circlemic;
let circleanalyzer;
let circlefft;
let lastBoomTime;

let circleuseMic = true;



class Circles extends Scene{
    constructor(){
        super('Circles');
    }

    setup() {6
        this.lastBoomTime = millis();
        createCanvas(windowWidth, windowHeight);

        this.circlefft = new p5.FFT(0.8, 1024);
        this.circleanalyzer = new p5.Amplitude();
        
        if (circleuseMic) {
            this.circlemic = new p5.AudioIn();
            this.circlemic.start(() => {
                this.circlefft.setInput(this.circlemic);
                this.circleanalyzer.setInput(this.circlemic);
            });
        } else {
            this.player = new p5.SoundFile("data/Whiplash.mp3", () => {
                this.player.play();
                this.fft.setInput(this.player);
                this.analyzer.setInput(this.player);
            });
        }
    }

    mouseClicked(){
        booms.push(new Booms(createVector(mouseX, mouseY), random(80,200)));
    }

    display(){
        background(0);
        // image(circleCapture, 0, 0, width, height);
        colorMode(RGB, 255);

        const amp = this.circleanalyzer.getLevel();

       if (millis() - this.lastBoomTime >= 500) {
            this.drawBooms(amp);
            this.lastBoomTime = millis();
        }
        // this.drawBar(amp);
        
        for(let boom of booms){
            boom.display();
            if(boom.isDone()){
                booms.splice(booms.indexOf(boom), 1);
            }
        }
    }

    drawBooms(amp){
        let amount = map(amp, 0, 0.1, 0, 10);
        for(let i = 0; i < amount; i++){
            booms.push(new Booms(createVector(random(width), random(height)), random(80,200)));
        }
    }

    // drawCircleBar(amp){
    //     let barHeight = map(amp, 0, 0.1, 0, height);
    //     fill(255);
    //     noStroke();
    //     rect(width/2 - 50, height - barHeight, 100, barHeight);
    // }
}

class Booms{
    constructor(position,radius){
        this.position = position;
        this.radius = radius;
        this.fade = 255;
        this.targetRadius = radius*(random(2, 3));
    }

    display(){

        stroke(223, 193, 247, this.fade);

        drawingContext.save();
        drawingContext.filter = 'blur(6px)';
        noFill();
        strokeWeight(10);

        ellipse(this.position.x, this.position.y, this.radius);

        drawingContext.restore();

        this.radius = lerp(this.radius, this.targetRadius, 0.1);

        if(this.fade > 0){
            this.fade -= 5;
        }
    }

    isDone(){
        if(this.fade <= 0){
            return true;
        }
        
        return false;
        
    }
}