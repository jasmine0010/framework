let scenes = [];
let cur = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    scenes = [new BlackScreen(), new WhiteScreen(), new AudioExample(), new Cursive(), new Camera(), new Fluids(), new Circles(), new DollyParton(), new CherryBlossoms()];

    for (let scene of scenes) {
        scene.setup();
    }
}

function draw() {
    scenes[cur].update();
    scenes[cur].display();
}

function keyPressed() {
    if (key >= '1' & key <= '6') {
        cur = key-'0'-1;
        scenes[cur].setup();
    }
    scenes[cur].keyPressed();
}

function mouseClicked() {
    scenes[cur].mouseClicked();
}
