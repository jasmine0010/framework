class Jellyfish extends Scene {
  constructor() {
    super('Jellyfish');
    this.showing = false;
    this.spaceWasDown = false; 
  }

  setup() {

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    if (!this.video) {

    this.video = createVideo('jellyfish/jellyfish.mp4');

    this.video.elt.muted = true;        // browsers only autoplay muted video
    this.video.elt.controls = false;    // no play bar
    this.video.attribute('autoplay', '');
    this.video.attribute('playsinline', '');
         
    this.video.position(0, 0);
    this.video.volume(0);
    this.video.hide();

    }
    this.video.time(0);
    this.video.loop();
    this.video.size(windowWidth, windowHeight);
  }
windowResized() {
  this.video.size(windowWidth, windowHeight);
}

display() {

    let spaceDown = keyIsDown(32);
    if (spaceDown && !this.spaceWasDown) {
      this.showing = !this.showing;
      if (this.showing) {
        this.video.loop();
      } else {
        this.video.pause();
      }
    }
    this.spaceWasDown = spaceDown;

    background(0);
    if (this.showing) {
      image(this.video, 0, 0, width, height);
    }
  } 

}