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

	inShape: function(x, y) {
		//This.pos eru byrjunar punktar formsins
		if((this.pos.x + this.size.x) < x || (this.pos.y + this.size.y) < y || this.pos.x > x || this.pos.y > y) {
			this.isShapeSelected = false;
		} else {
			this.isShapeSelected = true;
		}
	},
	dragging: function(x, y) {
		var newLocationX = x.x - y.x;
		var newLocationY = x.y - y.y;
		this.pos.x -= newLocationX;
		this.pos.y -= newLocationY;
	},

});