var Shape = Base.extend({

	constructor:function(name,pos,color,width,fontOfText,fontSize) {
		this.name = name;
		this.pos = pos;
		this.size = new Point(0,0);
		this.color = color;
		this.selected = false;
		this.fontOfText = fontOfText;
		this.fontSize = fontSize;
		this.width = width;
		this.isShapeSelected = false;
	},


	draw:function(canvas) {		
		if ( this.selected === true ) {
			// show selection
		}
	},

	inShape: function(point) {

	},

	dragging: function(point) {

	},

	startDrawing:function(point) {

	},

	drawing:function(point) {

	},

	stopDrawing:function(point) {

	},

	added: function(canvas) {

	},

});