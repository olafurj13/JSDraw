var Pen = Shape.extend({

	constructor: function(pos,color,width) {
		this.clickX = [];
		this.clickY = [];
		this.clickDrag = [];
		this.base("Pen",pos,color,width);
	},

	draw: function(canvas) {
	    for (var i = 0; i < this.clickX.length; i += 1) {
	        if (!this.clickDrag[i] && i == 0) {
	        	canvas.lineWidth = this.width;
	        	canvas.strokeStyle = this.color;
	            canvas.beginPath();
	            canvas.moveTo(this.clickX[i], this.clickY[i]);
	            canvas.stroke();
	        } else {
	            canvas.lineTo(this.clickX[i], this.clickY[i]);
	            canvas.lineWidth = this.width;
	            canvas.strokeStyle = this.color;
	            canvas.stroke();
	        }
	    }
	    this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x - this.pos.x;
		this.size.y = point.y - this.pos.y;
		this.clickX.push(point.x);
    	this.clickY.push(point.y);
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

});