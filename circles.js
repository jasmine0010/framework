let booms = [];
let particles = [];
let circleCapture;
let threshold = 50;
let scaler = 10;
let prev_frame;
let hasPreviousFrame = false;
let lastBoomTime = 0;
const boomCooldown = 500; // milliseconds
const minMotionPixels = 8; // ignore small amounts of noise

class Circles extends Scene{
    constructor(){
        super('Circles');
    }

    setup() {
        createCanvas(windowWidth, windowHeight);
        pixelDensity(1);
        circleCapture = createCapture(VIDEO);
        circleCapture.size(
            Math.ceil(windowWidth / scaler),
            Math.ceil(windowHeight / scaler)
        );
        circleCapture.hide();
        prev_frame = createImage(circleCapture.width, circleCapture.height);
        
        // logicalCamera = createCapture(VIDEO, { flipped: true }, () => {
        //     this.w = logicalCamera.width;
        //     this.h = logicalCamera.height;
        // });
    }

    mouseClicked(){
        booms.push(new Booms(createVector(mouseX, mouseY), random(80,200)));
    }

    display(){
        background(0);6
        image(circleCapture, 0, 0, width, height);
        colorMode(RGB, 255);

        if (!circleCapture.elt || circleCapture.elt.readyState < 2) return;

        circleCapture.loadPixels();
        prev_frame.loadPixels();

        if (!hasPreviousFrame) {
            prev_frame.copy(
                circleCapture, 0, 0, circleCapture.width, circleCapture.height,
                0, 0, circleCapture.width, circleCapture.height
            );
            hasPreviousFrame = true;
            return;
        }

        let motionX = 0;
        let motionY = 0;
        let motionCount = 0;
        
        for(let y = 0; y < circleCapture.height; y++){
            for(let x = 0; x < circleCapture.width; x++){
                let index = (x + y * circleCapture.width) * 4;
                let pr = prev_frame.pixels[index];
                let pg = prev_frame.pixels[index + 1];
                let pb = prev_frame.pixels[index + 2];
                let pbright = (pr + pg + pb) / 3;

                let r = circleCapture.pixels[index];
                let g = circleCapture.pixels[index + 1];
                let b = circleCapture.pixels[index + 2];
                let bright = (r + g + b) / 3;

                let diff = dist(r,g,b, pr,pg,pb);

                if(diff > threshold){
                    // fill(bright);
                    motionX += x;
                    motionY += y;
                    motionCount++;
                } 
            }
        }

        if (
            motionCount >= minMotionPixels &&
            millis() - lastBoomTime >= boomCooldown
        ) {
            const avgX = motionX / motionCount;
            const avgY = motionY / motionCount;

            booms.push(new Booms(
                createVector(
                    map(avgX, 0, circleCapture.width, 0, width),
                    map(avgY, 0, circleCapture.height, 0, height)
                ),
                random(80, 200)
            ));

            lastBoomTime = millis();
        }
        
        for(let boom of booms){
            boom.display();
            if(boom.isDone()){
                booms.splice(booms.indexOf(boom), 1);
            }
        }
    }
}

class Booms{
    constructor(position,radius){
        this.position = position;
        this.radius = radius;
        this.fade = 255;
        this.targetRadius = radius*(random(1, 2));
    }

    display(){

        drawingContext.save();
        drawingContext.filter = 'blur(6px)';
        noFill();
        strokeWeight(10);
        stroke(223, 193, 247, this.fade);

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