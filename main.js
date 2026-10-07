let scenes = [];
let cur = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    scenes = [new BlackScreen(), new WhiteScreen()];
    for (let scene of scenes) {
        scene.setup();
    }
}

function draw() {
    scenes[cur].update();
    scenes[cur].display();
}

function keyPressed() {
    if (key == '1') cur = 0;
    else if (key == '2') cur = 1;
    scenes[cur].keyPressed();
}
