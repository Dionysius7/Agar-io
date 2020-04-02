var blob;

var blobs = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	blob = new Blob(width / 2, height / 2, 64);
	for (var i = 0; i < 10; i++) {
		blobs[i] = new Blob(random(width), random(height), 16);
	}
}

function draw() {
	background(0);
	blob.show();
	blob.update();
	for (var i = 0; i < blobs.length; i++) {
		blobs[i].show();
	}
}