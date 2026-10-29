let camera;

class Camera extends Scene {
    constructor() {
        super('Camera');
    }

    setup() {
        pixelDensity(1);

        this.camera = createCapture(VIDEO);
        this.camera.size(windowWidth, windowHeight);
        this.camera.hide();
    }

    display() {
        background(0);
        image(this.camera, 0, 0, windowWidth, windowHeight);
    }
}