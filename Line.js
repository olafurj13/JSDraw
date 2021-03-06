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

	inShape: function(x, y) {
		//This.pos eru byrjunar punktar formsins
		var x1 = (this.endX-this.beginX);
		var y1 = (this.endY-this.beginY);
		if((x > this.endX || x < this.beginX) || (y > this.endY || y <	 this.beginY)) {
			this.isShapeSelected = false;	
		} else {
			this.isShapeSelected = true;
		}
	},            //pos, newPos
	dragging: function(x, y) {
		var newLocationX = x.x - y.x;
		var newLocationY = x.y - y.y;
		this.beginX -= newLocationX;
		this.beginY -= newLocationY;
		this.endX -= newLocationX;
		this.endY -= newLocationY;
	},

});