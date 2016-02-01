var Square = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Square",pos,color,width);
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x - this.pos.x;
		this.size.y = point.y - this.pos.y;
	},

	added: function(canvas) {
		if(this.size.x < 0) {
			this.pos.x += this.size.x;
			this.size.x = Math.abs(this.size.x);
		}

		if(this.size.y < 0) {
			this.pos.y += this.size.y;
			this.size.y = Math.abs(this.size.y);
		}
	},	

	contains: function(x, y) {
		//This.pos eru byrjunar punktar formsins
		if(this.pos.x > x || this.pos.y > y) {
			console.log("utfyrir kassa");
			this.shapeSelected = false;
		} else if((this.pos.x + this.size.x) < x || (this.pos.y + this.size.y) < y) {
			console.log("utfyrir kassa");
			this.shapeSelected = false;
		} else {
			console.log("inni i kassa");
			this.shapeSelected = true;
		}
	},
	moving: function(p1, p2) {
		var moveX = p1.x - p2.x;
		var moveY = p1.y - p2.y;
		this.pos.x -= moveX;
		this.pos.y -= moveY;
	},

});