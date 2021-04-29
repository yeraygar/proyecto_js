let maxBall = 100;

let badballscount = 2;

let BallposX;
let BallposY;
//let size = [];
let badballs = [];
let shots = [];
let boolShot = false;



/***************
*			   *
*			   *
*  Class Ball  *
*			   *
*			   *
***************/

class Ball {
	constructor() {
	this.positionX = mouseX;
	this.positionY = mouseY;
	this.size = 20;
	//BallposX = this.positionX;
	//BallposY = this.positionY
	}

	display() {
		fill(255,215,0);
		ellipse(this.positionX,this.positionY,this.size);
	}

	move() {
		this.positionX = mouseX;
		this.positionY = mouseY;
	}

}


/***************
*			   *
*			   *
*  Class Shot  *
*			   *
*			   *
***************/

class Shot {
	constructor() {
		this.posX = mouseX;
		this.posY = mouseY;
		this.cont = 0;
		this.size = 10;
		this.maxpos = false;
	}

	display() {
		fill(255,0,0);
		ellipse(this.posX,this.posY,this.size);
	}

	move() {
		this.posX = this.posX;
		this.posY -= 30;
		if(this.posY < 0 || this.posY > height){
			this.maxpos = true;
		}
	}

}

/*****************
*			     *
*			     *
*  Class Badball *
*			     *
*			     *
*****************/

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
let myshot = [];

function setup() {
	noStroke();
	createCanvas(windowWidth, windowHeight);
	myBall = new Ball();
	badballs.push(new Badball());
	myshot.push(new Shot());
}


function draw() {
	background(165,255,255);
	myBall.move();
	myBall.display();
	for(i = 0; i < myshot.length; i++) {
	if(myshot[i].maxpos) {
			myshot.splice(i,1);
		}

		else if(boolShot) {
		
		if(myshot[i].cont == 0) {
			myshot[i].posX = mouseX;
			myshot[i].posY = mouseY;
			myshot[i].cont++;
		}
		myshot[i].move();
		myshot[i].display();
	}
}

	for(i = 0; i < badballs.length; i++){
		badballs[i].move();
		badballs[i].display();
	}
}

function mouseClicked() {
	boolShot = true;
	myshot.push(new Shot());
}

function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
}
