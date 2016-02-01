var TextShape = Shape.extend({

	constructor: function(pos,color,width,fontOfText,fontSize) {
		this.base("Text",pos,color,width,fontOfText,fontSize);
		this.canvas;
		this.textValue = '';
		this.startX;
		this.startY;
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

});