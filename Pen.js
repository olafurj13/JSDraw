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
	inShape: function(x, y) {
		//This.pos eru byrjunar punktar formsins
		var biggestX_X = 0;
		var biggestX_Y = 0;
		var biggestY_Y = 0;
		var biggestY_X = 0;
		for(var i = 0; i < this.clickX.length; i++){
			if(i === 0){
				biggestX_X = this.clickX[i];
				biggestX_Y = this.clickY[i];
				biggestY_Y = this.clickY[i];
				biggestY_X = this.clickX[i];
			}
			if(this.clickX[i] > biggestX_X){
				biggestX_X = this.clickX[i];
			}
			if(this.clickX[i] < biggestX_Y){
				biggestX_Y = this.clickX[i];
			}
			if(this.clickY[i] > biggestY_Y){
				biggestY_Y = this.clickY[i];
			}
			if(this.clickY[i] < biggestY_X){
				biggestY_X = this.clickY[i];
			}
		}
		if((x > biggestX_X || x < biggestX_Y) || (y > biggestY_Y || y < biggestY_X)){
			this.isShapeSelected = false;
		} else {
			this.isShapeSelected = true;
		}
	},            //pos, newPos
	dragging: function(x, y) {
		var newLocationX = x.x - y.x;
		var newLocationY = x.y - y.y;
		for (var i = 0; i < this.clickX.length; i += 1) {
			this.clickX[i] -= newLocationX;
			this.clickY[i] -= newLocationY;
		}
	},

});