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

});