var blob;
var reso_amount = 500;
var zoom = 1;

var resources = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	blob = new Blob(width / 2, height / 2, 64);

	for (let i = 0; i < reso_amount; i++) {
		let x = random(-width * 2, width * 2);
		let y = random(-height * 2, height * 2);
		resources[i] = new Blob(x, y, 16);
	}
}

function draw() {
	background(0);

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
}