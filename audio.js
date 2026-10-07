class Audio {
    constructor() {
    }

    display() {
    }
}

/*
import processing.sound.*;

SoundFile player;
AudioIn mic;
Amplitude analyzer;
FFT fft;

float[] smoothedBands;

boolean useMic = false;
static int WIDTH, HEIGHT, X, Y;

void setup() {  
  mic = new AudioIn(this, 0);
  player = new SoundFile(this, "Whiplash.mp3");
  
  fft = new FFT(this, 1024);
  analyzer = new Amplitude(this);
  
  smoothedBands = new float[fft.spectrum.length];
  
  if (useMic) {
    mic.start();
    fft.input(mic);
    analyzer.input(mic);
  } else {
    player.play();
    fft.input(player);
    analyzer.input(player);
  }
}

void draw() {
  float amp = analyzer.analyze();
  fft.analyze();

  drawAudioWave(fft);
  
  drawCircle(amp);
}

void drawAudioWave(FFT fft) {
  stroke(255);
  strokeWeight(WIDTH * 0.00208);
  
  int nBands = fft.spectrum.length / 5;
  float bandWidth = (float) WIDTH / nBands;
  
  for (int i = 0; i <= nBands / 2; i++) {
    float amp = fft.spectrum[i];
    smoothedBands[i] = lerp(smoothedBands[i], amp, 0.5);
    
    float x = i * bandWidth;
    float bandHeight = smoothedBands[i] * WIDTH * 0.521;

    line(X + x, Y + HEIGHT/2 - bandHeight, X + x, Y + HEIGHT/2 + bandHeight);
    line(X + WIDTH - x, Y + HEIGHT/2 - bandHeight, X + WIDTH - x, Y + HEIGHT/2 + bandHeight);
  }
}*/