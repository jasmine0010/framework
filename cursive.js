class Cursive extends Scene {
    constructor() {
        super('Cursive');
    }

    setup() {
        this.font = loadFont('fonts/Ms_Madi/MsMadi-Regular.ttf');
    }

    display() {
        background(0);

        textFont(this.font);
        textSize(100);
        fill(255);
        text('Hello', windowWidth/2, windowHeight/2);
    }
}