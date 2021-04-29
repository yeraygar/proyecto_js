let maxBall = 100;
let badballscount = 2;
let positionX = [];
let positionY = [];
let size = [];
let badballs = [];
let shots = [];
class Ball {
	constructor() {
	this.positionX = mouseX;
	this.positionY = mouseY;
	this.size = 20;
	}

	display() {
		fill(255,215,0);
		ellipse(this.positionX,this.positionY,this.size);
	}

	move() {
		this.positionX = mouseX;
		this.positionY = mouseY;
	}

	shot() {
		myshot = new shot();
		shots.push(myshot);
		myshot.display();
	}
}

class shot {
	constructor() {
		this.positionX = mouseX;
		this.positionY = mouseY;
		this.speedX = 8;
		this.size = 7;
	}

	display(){
		fill(255,255,0);
		ellipse(this.positionX,this.positionY,this.size);
	}

}


class Badball {
	constructor() {
		this.currentCount = 5;
		this.countR = 5 + badballs.length;
		this.speedX = random(3,10);
		this.speedY = random(3,10);
		this.size = 30;
		this.positionY = 0;
		this.positionX = random(windowWidth);
	}

	display() {
		fill(255,0,0);
		rect(this.positionX,this.positionY,this.size * 2, this.size);
	}

	move() {

		this.positionX += this.speedX;
		this.positionY += this.speedY;

		if (this.positionX < 0 || this.positionX > width) {
			//this.speedX *= -1;
			this.positionX -= this.positionX;

		if (badballs.length == 1 && this.currentCount == 5 && badballs.length <= maxBall) {
			this.currentCount--;
			setTimeout(function(){badballs.push(new Badball());},5000);

		}else if (this.currentCount > 0 && badballs.length <= maxBall) {
			this.currentCount--;

		}else if (this.currentCount == 0 && badballs.length <= maxBall) {
			this.currentCount = this.countR + 5;
			setTimeout(function(){badballs.push(new Badball());},5000);
			}
		}


		if (this.positionY < 0 || this.positionY > height) {
			this.speedY *= -1;
			//this.positionY -= this.positionY;

		if (badballs.length == 1 && this.currentCount == 5 && badballs.length <= maxBall) {
			this.currentCount--;
			setTimeout(function(){badballs.push(new Badball());},5000);

		}else if (this.currentCount > 0 && badballs.length <= maxBall ) {
			this.currentCount--;

		}else if(this.currentCount == 0 && badballs.length <= maxBall ) {
			this.currentCount = this.countR + 5;
			setTimeout(function(){badballs.push(new Badball());},5000);
			}
		}
	}
}

let myBall;
function setup() {
	noStroke();
	createCanvas(windowWidth, windowHeight);
	myBall = new Ball();
	badballs.push(new Badball());
}


function draw() {
	background(165,255,255);
	myBall.move();
	myBall.display();
	for(i = 0; i < badballs.length; i++){
		badballs[i].move();
		badballs[i].display();
	}
}
function mouseClicked(){
myBall.shot();
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}
