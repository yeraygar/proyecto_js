
/************************************************
*												*
*				 Main Variables					*
*												*
************************************************/

let backColor = [0,0,0];
let rounds = 1;
let badballs = [];
let collide = false;
let enemyCollide = false;
let points = 0;
let myBall;
let myshot = [];
let isClean = false;
let timeout = [];
let isFinalRound = false;
let finalBoss;
let number_enemyShots = 3;
let enemyShots = [];
let enemyShoted = false;

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
	this.c = color(255,215,0);
	this.size = 20;
	}

	display() {
		fill(this.c);
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
			this.speedX = random(5,10);
			this.speedY = random(5,10);
			this.size = 30;
			this.positionY = 0;
			this.positionX = random(windowWidth);

			if (rounds == 2) {
				this.lifes = 4;
				this.c = color(255,255,0);
				this.speedX = random(11,13);
				this.speedY = random(11,13);
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
					if (points >= 2 && points < 4) {

						if(rounds == 1) {
							rounds  = 2;
						}

						if (!isClean) {
							badballs.splice(0,badballs.length);
							timeout.forEach(e => {
									clearTimeout(e);
							});
							timeout.splice(0,timeout.length);
							setTimeout(function() {badballs.push(new Badball())}, 2000);
							isClean = true;
						}

						if(points == 3) {
							isClean = false;
						}


					} else if (points == 4) {
						if(!isClean) {
							badballs.splice(0,badballs.length);
							timeout.forEach( e => { clearTimeout(e);});
							timeout = timeout.splice(0,timeout.length);
							isClean = true;
							setTimeout(function() {finalRound()}, 3000);
						}
						if (rounds == 2) {
							rounds = 3;
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

/***************
*			   *
*			   *
*  Class Boss  *
*			   *
*			   *
***************/

class Boss {
	constructor() {
			this.lifes = 500;
			this.c = color(0,255,0); 
			this.speedX = 10;
			this.speedY = random(5,10);
			this.size = 400;
			this.positionY = 20;
			this.positionX = (width / 2)-this.size;
	}

	display() {
		fill(this.c);
		rect(this.positionX,this.positionY,this.size * 2, this.size);
	}

	move() {

		this.positionX += this.speedX;
		this.positionY = this.positionY;

		if (this.positionX < 0 || this.positionX > (windowWidth -(this.size *2))) {
				this.speedX *= -1
		}


		if (this.positionY < 0 || this.positionY > height) {
			this.speedY *= -1;
		}
	}

	collision(other) {

		let hit = collideRectCircle(this.positionX,this.positionY,this.size * 2, this.size,other.positionX,other.positionY,other.size);
		if (hit) {
			if (other instanceof Ball) {
				endGame();
			}else if (myshot.includes(other)) {
				this.lifes -= 1;
				myshot.splice(myshot.indexOf(other),1);
				collide = true;
				if (this.lifes <= 300 && this.lifes > 200) {
					this.c = color(255,255,0);
					number_enemyShots = 5;

				} else if (this.lifes <= 200 && this.lifes > 100) {
					this.c = color(255,150,0);
					number_enemyShots = 10;

				} else if (this.lifes <= 100 && this.lifes > 50) {
				   this.c = color(255,0,0);
				   number_enemyShots = 20;
				   
				} else if (this.lifes == 0) {
					victory();
				}
				console.log(this.lifes);
			}
		}
	}
}


/********************
*			        *
*			        *
*  Class ShotEnemy  *
*			        *
*			        *
********************/

class ShotEnemy {
	constructor(posY) {
		this.positionX = finalBoss.positionX+finalBoss.size;
		this.positionY = finalBoss.positionY+finalBoss.size;
		this.size = 50;
		this.maxpos = false;
		this.c = color(generateColor(),generateColor(),generateColor());
	}

	display() {
		fill(this.c);
		ellipse(this.positionX,this.positionY,this.size);
	}

	move() {
		this.positionX = this.positionX;
		this.positionY += 20;
		if(this.positionY > height) {
			this.maxpos = true;
		}
	}

	collision(other) {
		let hit = collideCircleCircle(this.positionX,this.positionY,this.size,other.positionX,other.positionY,other.size);
		if(hit) {
			endGame();
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
	finalBoss = new Boss();
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
	
	if (rounds == 1 || rounds == 2) {
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
	}else {
		badballs = null;
		if(isFinalRound) {
			for (x = 0; x < myshot.length && !collide; x++) {
				finalBoss.collision(myshot[x]);
			}
			
			if(!enemyShoted) {
				let time = 50;
				for(x = 0; x < number_enemyShots; x++) {
					setTimeout(function() {enemyShots.push(new ShotEnemy(finalBoss.positionY))}, time);
					time += 100;
				}
				time = 50;
				if (!enemyShoted) {
					for (y = 0; y < number_enemyShots; y++) {
						setTimeout(function() {enemyShots.push(new ShotEnemy(random(finalBoss.size)))}, time);
						time += random(100,1000);
					}
					enemyShoted = true;

				}
				setTimeout(function() {enemyShoted = false}, 4000);
		}

			for (x = 0; x < enemyShots.length; x++) {
				if (enemyShots.length != 0) {
						enemyShots[x].display();
						enemyShots[x].collision(myBall);
						enemyShots[x].move();
						if (enemyShots[x].maxpos) {
							enemyShots.splice(x,1);
							break;
						}
				}

			}

			finalBoss.collision(myBall);
			finalBoss.move();
			finalBoss.display();
		}
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
	if(rounds == 2) {
		if (badballs.length < 4) {
			while (x <= t) {
				if (x == 1) {
					time = setTimeout( function() { generateBad(); }, 2000);
					timeout.push(time);
					x++;
				}else if (x == 2) {
					time = setTimeout( function() { generateBad(); }, 7000);
					timeout.push(time);
					x++;
				}
			}
		}
	}else if (rounds == 1) {
		if (badballs.length < 6) {
			while (x <= t) {
				if (x == 1) {
					time = setTimeout( function() { generateBad(); }, 1000);
					timeout.push(time);
					x++;
				}else if (x == 2) {
					time = setTimeout( function() { generateBad(); }, 7000);
					timeout.push(time);
					x++;
				}
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

/************************************************************************/

function finalRound() {
	isFinalRound = true;
}

/************************************************************************/

function generateColor() {
	return random(255);
}