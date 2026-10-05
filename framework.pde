Scene[] scenes;
int cur = 0;

void setup() {
  fullScreen();
  scenes = new Scene[] { new BlackScreen(), new WhiteScreen() };
  for (Scene scene : scenes) {
    scene.setup();
  }
}


void draw() {
  scenes[cur].update();
  scenes[cur].display();
}

void keyPressed() {
  if (key == '1') cur = 0;
  else if (key == '2') cur = 1;
  scenes[cur].keyPressed();
}
