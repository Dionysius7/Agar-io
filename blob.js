function Blob(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r;
	this.velocity = createVector(0, 0);
	this.coloring = color(random(0, 255), random(0, 255), random(0, 255));

	this.update = function () {

		if (!finished) {
			// Create Direction
			let newVelocity = createVector(mouseX - width / 2, mouseY - height / 2);

			let temp = createVector((this.pos.x - width / 2) + mouseX, (this.pos.y - height / 2) + mouseY);
			let distance = p5.Vector.dist(this.pos, temp);

			//Calculate speed level
			if (distance > this.r * zoom) {
				newVelocity.setMag(8);
			}
			else {
				newVelocity.setMag(2);
			}

			//Linear Interpolation
			this.velocity.lerp(newVelocity, 0.1);

			//Update the location
			this.pos.add(this.velocity);

			//Virtual Border
			if (this.pos.x < (-xMapSize)) {
				this.pos.x = - xMapSize;
			}
			if (this.pos.x > (xMapSize)) {
				this.pos.x = xMapSize;
			}
			if (this.pos.y < (- yMapSize)) {
				this.pos.y = - yMapSize;
			}
			if (this.pos.y > (yMapSize)) {
				this.pos.y = yMapSize;
			}
		}
	}

	this.eat = function (other) {
		let d = p5.Vector.dist(this.pos, other.pos);
		if (d < this.r + other.r) {
			//Calculate the combined radius
			let newRadius = (PI * this.r * this.r) + (PI * other.r * other.r);
			//update the blob radius
			this.r = sqrt(newRadius / PI);

			if (blobShifting) {
				this.coloring = color(random(0, 255), random(0, 255), random(0, 255));
			}
			if (resources.length - 1 == 0) {
				finished = true;
			}
			return true;
		}
		return false;
	}

	this.kill = function (other) {
		let d = p5.Vector.dist(this.pos, other.pos);
		if (d < this.r + other.r) {
			return true;
		}
		return false;
	}
	this.showEnemy = function () {
		fill(color(255, 0, 0));
		rect(this.pos.x, this.pos.y, r, r);
	}

	this.show = function () {
		fill(this.coloring);
		if (finished) {
			strokeWeight(0);
			fill(255);
		}
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}


}