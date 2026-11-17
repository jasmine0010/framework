class CherryBlossoms extends Scene {

  constructor() {
    super('Cherry Blossoms')
  }

  setup() {
  }

  display() {
	colorMode(RGB)
    angleMode(DEGREES)
    randomSeed(1)   // same random tree every frame, so it doesn't flicker
    background(0)

    push()
    translate(width / 2, height / 2 + 200)
    this.branch(100)
    pop()
  }

  update() {
  }

  branch(len) {
    push()
    if (len > 10) {
      strokeWeight(map(len, 10, 100, 1, 15))
      stroke(70, 40, 20)
      line(0, 0, 0, -len)
      translate(0, -len)
      rotate(random(-20, -30))
      this.branch(len * random(0.7, 0.9))
      rotate(random(50, 60))
      this.branch(len * random(0.7, 0.9))
    } else {
      var r = 220 + random(-20, 20)
      var g = 120 + random(-20, 20)
      var b = 170 + random(-20, 20)
      fill(r, g, b, 150)
      noStroke()

      beginShape()
      for (var i = 45; i < 135; i++) {
        var rad = 15
        var x = rad * cos(i)
        var y = rad * sin(i)
        vertex(x, y)
      }
      for (var i = 135; i > 40; i--) {
        var rad = 15
        var x = rad * cos(i)
        var y = rad * sin(-i) + 20
        vertex(x, y)
      }
      endShape(CLOSE)
    }
    pop()
  }
}
