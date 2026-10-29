let scenes = [];
let cur = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    scenes = [new BlackScreen(), new WhiteScreen(), new AudioExample(), new Cursive(), new Camera()];
    for (let scene of scenes) {
        scene.setup();
    }
}

function draw() {
    scenes[cur].update();
    scenes[cur].display();
}

function keyPressed() {
    if (key > '0' & key < '9') {
        cur = key-'0'-1;
        scenes[cur].setup();
    }
    scenes[cur].keyPressed();
}
