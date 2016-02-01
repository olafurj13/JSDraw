var Line = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Line",pos,color,width);
		this.beginX = 0;
		this.beginY = 0;
		this.endX = pos.x;
		this.endY = pos.y;
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.beginPath();
		canvas.moveTo(this.beginX, this.beginY);
		canvas.lineTo(this.endX, this.endY);
		canvas.stroke();
		this.base(canvas);
	},
	startDrawing:function(point) {
		this.beginX = point.x;
		this.beginY = point.y;

	},
	drawing:function(point) {
		this.endX = point.x;
		this.endY = point.y;
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
		console.log('contains fall line');
		console.log('This.pos.x: ' + this.pos.x + "----- this.pos.y: " + this.pos.y);
		console.log('         X: ' + x + "------                   Y: " + y);
		console.log("----------------------------------------------------------")
		if(this.pos.x > x || this.pos.y > y) {
			console.log("utfyrir kassa 1");
			this.shapeSelected = false;
		} else if((this.pos.x + this.size.x) < x || (this.pos.y + this.size.y) < y) {
			console.log("utfyrir kassa 2");
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