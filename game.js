let maxBall = 100;

let badballscount = 2;
let dificult = 1;
let rects = 1;
let badballs = [];
let collide = false;
let time_respawn = 5000;
let points = 0;

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
		this.positionX = mouseX;
		this.positionY = mouseY;
		this.cont = 0;
		this.size = 10;
		this.maxpos = false;
	}

	display() {
		fill(255,0,199);
		ellipse(this.positionX,this.positionY,this.size);
	}

	move() {
		this.positionX = this.positionX;
		this.positionY -= 20;
		if(this.positionY < 0 || this.positionY > height){
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
		this.lifes = 2;
		this.c = color(255,0,0); 
		this.currentCount = 5;
		this.countR = 3 + badballs.length;
		this.speedX = random(5,10);
		this.speedY = random(5,10);
		this.size = 30;
		this.positionY = 0;
		this.positionX = random(windowWidth);
	}

	display() {
		fill(this.c);
		rect(this.positionX,this.positionY,this.size * 2, this.size);
	}

	move() {

		this.positionX += this.speedX;
		this.positionY += this.speedY;

		if (this.positionX < 0 || this.positionX > width) {
			this.positionX = 0;

		if (badballs.length == 1 && this.currentCount == 5 && badballs.length <= maxBall) {
			this.currentCount--;
			setTimeout(function(){badballs.push(new Badball());},2000);

		}else if (this.currentCount > 0 && badballs.length <= maxBall) {
			this.currentCount--;

		}else if (this.currentCount == 0 && badballs.length <= maxBall) {
			this.currentCount = this.countR + 5;
			setTimeout(function(){badballs.push(new Badball());},2000);
			}
		}


		if (this.positionY < 0 || this.positionY > height) {
			this.speedY *= -1;

		if (badballs.length == 1 && this.currentCount == 5 && badballs.length <= maxBall) {
			this.currentCount--;
			setTimeout(function(){badballs.push(new Badball());},5000);

		}else if (this.currentCount > 0 && badballs.length <= maxBall ) {
			this.currentCount--;

		}else if(this.currentCount == 0 && badballs.length <= maxBall ) {
			this.currentCount = this.countR + 5;
			setTimeout( function() 
				{ badballs.push(new Badball()); } ,time_respawn);
			}
			time_respawn += 1000;
		}
	}

	collision(other) {
	
		let hit = collideRectCircle(this.positionX,this.positionY,this.size * 2, this.size,other.positionX,other.positionY,other.size);
		if(hit) {
			if(myshot.includes(other)) {
				if( this.lifes == 2) {
					this.lifes -= 1;
					this.c = color(0,0,255);
					myshot.splice(myshot.indexOf(other),1);
					collide = true;
				}
				else {
					collide = true;
					badballs.splice(badballs.indexOf(this),1);
					myshot.splice(myshot.indexOf(other),1);
					setTimeout( function() 
				{ 
					generateBad(); } ,5000);
				}
			}
			else if(other instanceof Ball) {
				endGame();
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
}


function draw() {
	background(165,255,255);
	myBall.move();
	myBall.display();


	for(i = 0; i < myshot.length; i++) {

	if(myshot.length != 0){
		myshot[i].move();
		myshot[i].display();	
	}

	if(myshot[i].maxpos) {
			myshot.splice(i,1);
	}

}
	collide = false;
	
		for(y = 0; y < myshot.length && !collide; y++){
			for(x = 0; x < badballs.length && !collide; x++) {
				badballs[x].collision(myshot[y]);
			}
		}

	collide = false;	

		for(x = 0; x < badballs.length && !collide; x++){
		badballs[x].collision(myBall);
		badballs[x].move();
		badballs[x].display();
	}
}



function mouseClicked() {
	myshot.push(new Shot());
}

function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
}

function endGame(){
	alert('Game Over');
	location.reload();
}

function generateBad(){
	if(dificult <= 20) {
		for(x = 0; x < rects; x++) {
			badballs.push(new Badball());
		}

	}else if(dificult <= 40){
		rects++;
		for(x = 0; x < rects; x++) {
			badballs.push(new Badball());
		}
	}else {
		rects ++;
		for(x = 0; x < rects; x++) {
			badballs.push(new Badball());
		}
	}
	dificult ++;
}
