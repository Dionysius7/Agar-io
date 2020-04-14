function Blob(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r;
	this.velocity = createVector(0, 0);

	this.update = function () {
		// Create Direction
		let newVelocity = createVector(mouseX - width / 2, mouseY - height / 2);

		//Calculate speed level
		newVelocity.setMag(10);
		this.velocity.lerp(newVelocity, 0.01);

		//Update the location
		this.pos.add(this.velocity);
	}

	this.eat = function (other) {
		let d = p5.Vector.dist(this.pos, other.pos);
		if (d < this.r + other.r) {
			//Calculate the combined radius
			let newRadius = (PI * this.r * this.r) + (PI * other.r * other.r);
			//update the blob radius
			this.r = sqrt(newRadius / PI);

			return true;
		}
		return false;
	}

	this.show = function () {
		fill(255);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}
}