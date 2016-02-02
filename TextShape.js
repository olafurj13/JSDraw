var TextShape = Shape.extend({

	constructor: function(pos,color,width,fontOfText,fontSize) {
		this.base("Text",pos,color,width,fontOfText,fontSize);
		this.canvas;
		this.textValue = '';
		this.startX;
		this.startY;
		this.endX;
		this.endY;
	},

	draw: function(canvas) {
		canvas.fillStyle = this.color;
		var x = "bold " + this.fontSize + "px " + this.fontOfText + ", sans-serif";
		canvas.font = x;
      	canvas.fillText(this.textValue, this.startX-8, this.startY-40);
	},

	startDrawing:function(point) {
	    var screenWidth = screen.width;
	    var ratio = (screenWidth - 1100)/2.3;
		var textbox = document.getElementById("textbox");
		textbox.style.display='block';
		this.startX = this.pos.x+8; //+8
		this.startY = this.pos.y+40; //+30
		textbox.style.left = this.startX+ratio;
		textbox.style.top = this.startY;
		console.log(this.fontOfText);
	},

	stopDrawing:function(point) {
		var textbox = document.getElementById("textbox");
		this.endX = this.size.x;
		this.endY = this.size.y;
		textbox.style.width = this.size.x;
		textbox.style.height = this.size.y;
		var self = this;
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
		if((x < this.endX || x > this.startX+8) || (y < this.endY || y > this.startY+40)) {
			this.isShapeSelected = false;	
		} else {
			this.isShapeSelected = true;
		}
	},            //pos, newPos
	dragging: function(x, y) {
		var newLocationX = x.x - y.x;
		var newLocationY = x.y - y.y;
		this.startX -= newLocationX;
		this.startY -= newLocationY;
	},

});