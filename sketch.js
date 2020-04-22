var blob;
var totalReso = 100;
var spriteSize = 64;
var resourceSize = 16;
var enemySize = 48;
var zoom = 1;
var lose = false;
var finished = false;
var finishedDisplay = "You WIN!";
var loseDisplay = "YOU LOSE!";
var mapSize = 2;
var xMapSize;
var yMapSize;
var count = 99;
var blobShifting = true;
var waktu;
var login_time;
var sound;

var resources = [];

var totalEnemy = 5;
var enemy = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	sound = new Audio('raw/sound.mp3');

	blob = new Blob(0, 0, spriteSize);

	xMapSize = width * mapSize;
	yMapSize = height * mapSize;
	login_time = Date.now();

	for (let i = 0; i < totalReso; i++) {
		let x = random(- xMapSize, xMapSize);
		let y = random(- yMapSize, yMapSize);
		resources[i] = new Blob(x, y, resourceSize);
	}
	for (let e = 0; e < totalEnemy; e++) {
		let x = random(- xMapSize, xMapSize);
		let y = random(- yMapSize, yMapSize);
		enemy[e] = new Blob(x, y, enemySize);
	}
}
function mouseMoved() {
	sound.play();
}

function draw() {
	//When game is finished
	if (finished) {
		//Rainbow background color
		++count;
		if (count > 100) {
			background(color(random(0, 255), random(0, 255), random(0, 255)));
			count %= 10;
		}
	}
	else {
		background(0);
		waktu = Math.floor((Date.now() - login_time) / 1000);
	}



	//Perspective View
	translate(width / 2, height / 2);
	let newzoom = 64 / blob.r;

	//Linear interpolated (lerp) to shrink world smoothly
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-blob.pos.x, -blob.pos.y);

	blob.show();
	blob.update();

	for (let i = 0; i < resources.length; i++) {
		resources[i].show();
		if (blob.eat(resources[i])) {
			resources.splice(i, 1);
		}
	}

	//Show Enemy
	for (let e = 0; e < enemy.length; e++) {
		enemy[e].showEnemy();
		if (blob.kill(enemy[e])) {
			finished = true;
			finishedDisplay = loseDisplay;
		}
	}

	//Display Following Text
	textSize(blob.r / 3);
	let score = totalReso - resources.length;

	let display = 'Score : ' + score + ' pts ';
	let playtime = 'Time : ' + waktu + ' s ';


	if (finished) {
		display = finishedDisplay;
	}

	fill(255);
	text(display, blob.pos.x - textWidth(display) / 2, blob.pos.y - 4 * blob.r);
	text(playtime, blob.pos.x - textWidth(playtime) / 2, blob.pos.y - 3.5 * blob.r);
}