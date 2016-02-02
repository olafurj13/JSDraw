var Circle = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Circle",pos,color,width);
		var radius = 0

	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		radius = Math.sqrt((this.size.x * this.size.x) + (this.size.y * this.size.y));
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

	inShape: function(x, y) {
		if((this.beginX + radius) < x || (this.beginY + radius) < y) {
			this.isShapeSelected = false;
		}
		else if((this.beginX - radius) > x || (this.beginY - radius) > y) {
			this.isShapeSelected = false;
		}
		else {	
			this.isShapeSelected = true;
		}
	},
	dragging: function(x, y) {
		var newLocationX = x.x - y.x;
		var newLocationY = x.y - y.y;
		this.beginX -= newLocationX;
		this.beginY -= newLocationY;
	},

});