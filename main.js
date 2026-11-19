let scenes = [];
let cur = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    scenes = [new BlackScreen(), new AudioExample(), new Cursive(), new Fluids(), new DollyParton(), new CherryBlossoms(), new Circles(), new LalaLand()];

    for (let scene of scenes) {
        scene.setup();
    }
}

function draw() {
    scenes[cur].update();
    scenes[cur].display();
}

function keyPressed() {
    if (key >= '1' & key <= '9') {
        cur = key-'0'-1;
        scenes[cur].setup();
    }
    scenes[cur].keyPressed();
}

function mouseClicked() {
    scenes[cur].mouseClicked();
}
