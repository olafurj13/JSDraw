function App(canvasSelector) {
	var self = this;
	var arrshape = [];
	var selected = false;
	self.getEventPoint = function(e) {
		return new Point(e.pageX - self.canvasOffset.x,e.pageY - self.canvasOffset.y);
	}

	self.drawingStart = function(e) {	
		var startPos = self.getEventPoint(e);
		var shape = new self.shapeConstructor(startPos,self.color, self.width, self.fontOfText, self.fontSize);

		shape.startDrawing(startPos,self.canvasContext);
		startPos.log('drawing start');
	
		var drawing = function(e) {
			var pos = self.getEventPoint(e);
			
			shape.drawing(pos,self.canvasContext);
			self.redraw();
			shape.draw(self.canvasContext);
		}

		var drawingStop = function(e) {
			var pos = self.getEventPoint(e);

			shape.stopDrawing(pos,self.canvasContext);
			self.shapes.push(shape);
			shape.added(self.canvasContext);
			// Remove drawing and drawingStop functions from the mouse events
			self.canvas.off({
				mousemove:drawing,
				mouseup:drawingStop,
			});

			self.redraw();
		}

		// Add drawing and drawingStop functions to the mousemove and mouseup events
		self.canvas.on({
			mousemove:drawing,
			mouseup:drawingStop,
		});	
	}


	self.mousedown = function(e) {
		console.log(self.selected);
		if(self.shapeConstructor != null) {
			if(self.selected){
				self.shapeMove(e);
			}else{
				self.drawingStart(e);
			}
		} else {
		}

		self.redraw();
	}
	//Fékk hjálp frá samnemanda með þetta fall.
	self.shapeMove = function(e) {
		var old_posistion = self.getEventPoint(e);
		for(var i = self.shapes.length - 1; i >= 0; i--){
			console.log("pos x: " + old_posistion.x + " ---- pos y: " + old_posistion.y );
			console.log("self.shapes[" + i + "]: " + self.shapes[i].name);
			self.shapes[i].inShape(old_posistion.x, old_posistion.y, self.canvasContext);
			if(self.shapes[i].isShapeSelected){
				console.log("selected shapes");
				var dragging = function(e) 
				{
					var new_position = self.getEventPoint(e);
					self.shapes[i].dragging(old_posistion, new_position, self.canvasContext);
					old_posistion = new_position;
					self.redraw();
				};
				self.redraw();
				break;
			}
		}
		var moveStop = function(e) 
		{
			self.canvas.off({
				mousemove: dragging,
				mouseup: moveStop
			});
			self.redraw();
		};
		self.canvas.on({
			mousemove: dragging,
			mouseup: moveStop
		});	
	}

	self.redraw = function() {
		self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
		for(var i = 0; i < self.shapes.length; i++) {
			self.shapes[i].draw(self.canvasContext);
		}
	}

	self.setWidth = function(width) {
		self.width = width;
	}

	self.textBox = function(textValue) {
		var x = self.shapes.pop();
		x.textValue = textValue;
		self.shapes.push(x);
		self.redraw();
	}
	
	self.clear = function() {

		//Reset textbox
		document.getElementById("textbox").style.display='none';
		document.getElementById("textbox").value='';
		document.getElementById("textbox").style.width=10;
		document.getElementById("textbox").style.height=10;		
		self.shapes = [];
		self.redraw();
	}	
	self.undo = function(){
		if(self.shapes.length > 0){
			arrshape.push(self.shapes.pop());
			self.redraw();
		}
	}

	self.redo = function(){
		if(arrshape.length > 0){
			self.shapes.push(arrshape.pop());
			self.redraw();
		}
	}

	self.store = function(){
		var arrshape = [];
		for(var i = 0; i < self.shapes.length; i++){
			arrshape.push(self.flatten(self.shapes[i]));
		}
		localStorage.setItem("store", JSON.stringify(arrshape));
	}

	self.setColor = function(color) {
		self.color = color;
	}

	//Fékk hjálp við þetta fall á stack overflow.
	self.flatten = function(jsonobj) {
	    var flatten = Object.create(jsonobj);
	    for(var x in flatten) {
	        flatten[x] = flatten[x];
	    }
    	return flatten;
	}

	self.load = function(){
		var storedNames = [];
		self.clear();
		storedNames = JSON.parse(localStorage.getItem("store"));
		for(var i = 0; i < storedNames.length; i++){
			if(storedNames[i].name === "Line"){
				storedNames[i].__proto__ = Line.prototype;
			}
			if(storedNames[i].name === "Square"){
				storedNames[i].__proto__ = Square.prototype;
			}
			if(storedNames[i].name === "Circle"){
				storedNames[i].__proto__ = Circle.prototype;
			}
			if(storedNames[i].name === "Pen"){
				storedNames[i].__proto__ = Pen.prototype;
			}
			if(storedNames[i].name === "Text"){
				storedNames[i].__proto__ = TextShape.prototype;
			}
			if(storedNames[i].name === "WhiteMarker"){
				storedNames[i].__proto__ = WhiteMarker.prototype;
			}	
			self.shapes.push(storedNames[i]);
		}
		self.redraw();
	}

	self.setFontSize = function(fontSize){
		self.fontSize = fontSize;
	}

	self.setFont = function(fontOfText) {
		self.fontOfText = fontOfText;
	}

	self.init = function() {
		// Initialize App	
		self.canvas = $(canvasSelector);
		self.canvasOffset = new Point(self.canvas.offset().left,self.canvas.offset().top);
		self.canvas.on({
			mousedown:self.mousedown
		});
		self.shapeConstructor = null;
		self.canvasContext = canvas.getContext("2d");
		self.shapes = new Array();
		
		// Set defaults

		self.color = '#ff0000';	
		self.fontOfText = "Tahoma";
		self.fontSize = 12;
		self.width = 1;
		// TODO: Set sensible defaults ...
	}
	
	self.select = function(e) {
		self.selected
	}
	self.init();
}

var app = null;
$(function() {
	// Wire up events
	app = new App('#canvas');
	$('select').on('change', function(){
		app.selected = false;
		if(this.value === 'square'){
			document.getElementById('canvas').style.cursor = "default";
			app.shapeConstructor = Square;
		}
		if(this.value === 'pencil'){
			document.getElementById('canvas').style.cursor = "default";
			app.shapeConstructor = Pen;
		}
		if(this.value === 'circle'){
			document.getElementById('canvas').style.cursor = "default";
			app.shapeConstructor = Circle;
		}
		if(this.value === 'line'){
			document.getElementById('canvas').style.cursor = "default";
			app.shapeConstructor = Line;
		}
		if(this.value === 'text'){
			document.getElementById('canvas').style.cursor = "default";
            app.shapeConstructor = TextShape;
        }
        if(this.value === 'whitemarker'){
        	document.getElementById('canvas').style.cursor = "default";
            app.shapeConstructor = WhiteMarker;
        }
        if(this.value === 'select'){
        	app.selected = true;
        }
	});
	$('#clearbutton').click(function(){app.clear()});
	$('#color').change(function(){app.setColor($(this).val())});
	$('#undo').click(function(){app.undo()});
	$('#redo').click(function(){app.redo()});
	$('#store').click(function(){app.store()});
	$('#load').click(function(){app.load()});
	$('#width').change(function(){
		app.setWidth($("#width").val())	
	});
	$('#myFont').change(function() {
        if($(this).val() !== "Default font"){
        	app.setFont($(this).val());
        }

    });
    $('#fontSize').change(function() {
        if($(this).val() !== 12){
        	app.setFontSize($(this).val());
        }

    });
	$("#textbox").keyup(function(event){
		if(event.keyCode == 13){
		    var textValue = $("#textbox").val()
      		document.getElementById("textbox").style.display='none';
			document.getElementById("textbox").value='';
			document.getElementById("textbox").style.width=10;
			document.getElementById("textbox").style.height=10;	
		    document.getElementById("textbox").style.display='none';
		    app.textBox(textValue);
		}
	});
	$("#tools").on('change', function() {
		var toolsval = $(this).val()
		if($(this).val() === 'text'){
			document.getElementById("myFont").style.display='inline';
			document.getElementById("fontSize").style.display='inline';
			document.getElementById("div1").style.display='inline';
		} else {
			document.getElementById("myFont").style.display='none';
			document.getElementById("fontSize").style.display='none';
			document.getElementById("div1").style.display='none';
		}
	});
});