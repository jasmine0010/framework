class DollyParton extends Scene {

    constructor() {
        super('Dolly Parton');
        this.img1 = loadImage("Skyline1.png");
        this.img2 = loadImage("bird.png");
        this.pics = [
			loadImage("dp4.png"),
			loadImage("dp2.png"),
			loadImage("dp1.png"),
			loadImage("dp5.png")
		];

        this.buildings = [
			{ x: 0.87, y: 0.6, w: 0.06 },
			{ x: 0.17, y: 0.40, w: 0.07 },
			{ x: 0.60, y: 0.45, w: 0.05 },
            { x: 0.37, y: 0.48, w: 0.06 }
        ]
        
        // x, y, speed, size for each bird
        this.birds = [
            { x: -100, y: 100, speed: 1.8,   size: 0.13  },
            { x: -300, y: 180, speed: 1.5, size: 0.1 },
            { x: -500, y: 60,  speed: 2.5, size: 0.09 },
            { x: -700, y: 140, speed: 1.6,   size: 0.13 }
        ];
    }

    setup() {
		this.dollys = [];
		this.order = [2, 0, 3, 1];
		this.stops = [0.145 , 0.2, 0.15, 0.055]; 
    }
    
   keyPressed() {
	   let n = this.dollys.length; 
	   
	   
	   if (this.dollys.length<4){
		   let dolly = {
			   pic: this.pics[n],
			   b: this.buildings[this.order[n]],
			   y: height,
			   speed: 0.1,
			   stop: this.stops[n],
			   
		   };
		   
		   this.dollys.push(dolly);
	}       
    }
    
    update() {
		for (let d of this.dollys) {
			let stop = height * d.stop;         
			if (d.y > stop) {
				d.speed += 0.08;
				d.y = max(d.y - d.speed, stop);
			}
		}	
		
		
        for (let b of this.birds) {
            b.x += b.speed;
            
            if (b.x > width){
				b.x = -this.img2.width * b.size;
			}
        }
    }

    display() {
       background(135, 190, 220);
       
       
       
        for (let d of this.dollys) {
			
			let h = height * 0.4;                        // size of every photo
			let w = h * d.pic.width / d.pic.height;      // keep proportions
			let x = (d.b.x + d.b.w / 2) * width - w / 2; // centered on the building
			image(d.pic, x, d.y, w, h);
		}
		
		
        image(this.img1, 0, 0, width, height);
        
        fill(26, 24, 25);
       noStroke();
       rect(width * 0.402, height * 0.51, width * 0.05, height * 0.7);
        
        for (let b of this.birds) {
            image(this.img2, b.x, b.y, this.img2.width * b.size, this.img2.height * b.size);
        }
        
        
    }
}
