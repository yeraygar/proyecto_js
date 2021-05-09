
/************************************************
*												*
*				 Main Variables					*
*												*
************************************************/

let backColor = [0,0,0];
let maxBall = 100;
let badballscount = 2;
let dificult = 1;
let rounds = 1;
let rects = 1;
let badballs = [];
let collide = false;
let time_respawn = 5000;
//let time = [0,0];
let points = 0;
let myBall;
let myshot = [];
let isClean = false;
let timeout = [];

//setInterval(function(){String_time();},1000);


/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/



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


/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/



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


/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/



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

			if (rounds == 2) {
			this.lifes = 4;
			this.c = color(0,255,255);
			this.currentCount = 5;
			this.countR = 3 + badballs.length;
			this.speedX = random(10,12);
			this.speedY = random(10,12);
			this.size = 100;
			this.positionX = random(windowWidth);
			this.positionY = 0;
		}
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
		}


		if (this.positionY < 0 || this.positionY > height) {
			this.speedY *= -1;
	}
}

	collision(other) {
	
		let hit = collideRectCircle(this.positionX,this.positionY,this.size * 2, this.size,other.positionX,other.positionY,other.size);
		if(hit) {
			if(myshot.includes(other)) {
				if (this.lifes == 4) {
					this.lifes -= 1;
					this.c = color(255,255,0);
					myshot.splice(myshot.indexOf(other),1);
					collide = true;
				} 
				else if (this.lifes == 3) {
					this.lifes -= 1;
					this.c = color(255,0,0);
					myshot.splice(myshot.indexOf(other),1);
					collide = true;
				}
				else if ( this.lifes == 2) {
					this.lifes -= 1;
					this.c = color(0,0,255);
					myshot.splice(myshot.indexOf(other),1);
					collide = true;
				}
				else {
					collide = true;
					badballs.splice(badballs.indexOf(this),1);
					myshot.splice(myshot.indexOf(other),1);
					timeGenerate(2);
					points++;
					if (points >= 20 && points <= 40) {
						if (!isClean) {
							badballs.splice(0,badballs.length);
							timeout.forEach(e => {
								if(timeout.indexOf(e) != timeout.length -1 && timeout.indexOf(e) != timeout.length -2 ) {
									clearTimeout(e);
								}
							})
							timeout = timeout.slice(timeout.length -2);
							isClean = true;
						}
						rounds  = 2;
						if(points == 39) {
							isClean = false;
						}

					} else if (points >= 40 && points <= 100) {
						if(!isClean) {
							badballs.splice(0,badballs.length);
							timeout.forEach( e => {
								clearTimeout(e);
							});
							timeout = timeout.splice(0,timeout.length);
							isClean = true;
						}

					}
				}
			}
			else if(other instanceof Ball) {
				endGame();
			}
		}
	}
}


/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/





/************************************************
*												*
*				   Functions					*
*												*
************************************************/




/* [Setup] */

function setup() {
	noStroke();
	createCanvas(windowWidth, windowHeight);
	myBall = new Ball();
	badballs.push(new Badball());
}

/************************************************************************/




/* [Draw] */

function draw() {
	background(backColor[0],backColor[1],backColor[2]);
	myBall.move();
	myBall.display();


	for(i = 0; i < myshot.length; i++) {

	if(myshot.length != 0) {
		myshot[i].move();
		myshot[i].display();	
	}

	if(myshot[i].maxpos) {
			myshot.splice(i,1);
	}

}
	collide = false;
	
		for(y = 0; y < myshot.length && !collide; y++) {
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

/************************************************************************/





/* [Mouse Clicked] */

function mouseClicked() {
	myshot.push(new Shot());
}




function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
}

/************************************************************************/





/* [End game] */

function endGame() {
	alert('Game Over');
	location.reload();
}

/************************************************************************/




/* [Generate BadBalls] */

function generateBad() {
	badballs.push(new Badball());
}

/************************************************************************/

function timeGenerate (t) {
	let x = 1;
	let time;
	if (badballs.length < 6) {
	while (x <= t) {
		if (x == 1) {
			if (rounds == 2) {
				time = setTimeout( function() {
					generateBad();
				},2000);
				timeout.push(time);
			} else {
				time = setTimeout( function() {
					generateBad();
				},1000);
				timeout.push(time);
			}
				x++;
		} else if (x == 2){
			time = setTimeout( function() {
				generateBad();
			},7000);
			timeout.push(time);
			x++;
		}
	 }
	}
}



/* [Timer] */

function String_time() {
	let my_return = '';
		if(time[1] == 59) {
			time[1] == 0;
			time[0]+= 1;
		}else {
			time[1] += 1;
		}

		if(time[0] < 10) {
			my_return = '0' + time[0];
		}else {
			my_return = time[0];
		}

		if(time[1] < 10) {
			my_return += ':0' + time[1];
		}else {
			my_return += ':' + time[1];
		}

		console.log(my_return);
}

/************************************************************************/

function victory() {
	alert('You win');
	location.reload();
}