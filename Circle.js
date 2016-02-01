var Circle = Shape.extend({

	constructor: function(pos,color,width) {
		this.clickX = [];
		this.clickY = [];
		this.base("Circle",pos,color,width);

	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		var radius = Math.sqrt((this.size.x * this.size.x) + (this.size.y * this.size.y));
    	canvas.beginPath();
   		canvas.arc(this.beginX, this.beginY, Math.abs(radius), 0, Math.PI*2);
		canvas.stroke();
	    this.base(canvas);
		
	},
	startDrawing:function(point) {
		this.beginX = point.x;
		this.beginY = point.y;


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
		console.log('contains fall circle');
		console.log('This.pos.x: ' + this.pos.x + "----- this.pos.y: " + this.pos.y);
		console.log('         X: ' + x + "------                   Y: " + y);
		console.log("----------------------------------------------------------")
		if((this.pos.x + this.size.x) < x || (this.pos.y + this.size.y) < y) {
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