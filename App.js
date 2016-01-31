function App(canvasSelector) {
	var self = this;
	var arrshape = [];
	var storedNames = [];
	var selectButtonClick = false;
	self.getEventPoint = function(e) {
		return new Point(e.pageX - self.canvasOffset.x,e.pageY - self.canvasOffset.y);
	}

	self.drawingStart = function(e) {	
		var startPos = self.getEventPoint(e);
		var shape = new self.shapeConstructor(startPos,self.color, self.width, self.fontOli, self.fontSize);

		shape.startDrawing(startPos,self.canvasContext);
		startPos.log('drawing start');
		//console.log("drawingStart, Shape: " + shape.name);
	
		var drawing = function(e) {
			//console.log("drawing, Shape: " + shape);
			var pos = self.getEventPoint(e);
			
			shape.drawing(pos,self.canvasContext);
			self.redraw();
			shape.draw(self.canvasContext);
		}

		var drawingStop = function(e) {
			//console.log("drawing Stop, Shape: " + shape);
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
		if(self.shapeConstructor != null) {
			self.drawingStart(e);
		} else {
		}

		self.redraw();
	}

	self.redraw = function() {
		self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
		//console.log(self.shapes.length);
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
		for(var i = 0; i < self.shapes.length; i++){
			console.log(self.shapes[i]);
		}
		for(var i = 0; i < self.shapes.length; i++){
			arrshape.push(self.flatten(self.shapes[i]));
		}
		localStorage.setItem("store", JSON.stringify(arrshape));
	}

	self.setColor = function(color) {
		self.color = color;
	}

	self.flatten = function(obj) {
	    var result = Object.create(obj);
	    for(var key in result) {
	        result[key] = result[key];
	    }
    	return result;
	}

	self.load = function(){
		self.clear();
		storedNames = JSON.parse(localStorage.getItem("store"));
		console.log(storedNames);
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
			self.shapes.push(storedNames[i]);
		}
		self.redraw();
	}

	self.setFontSize = function(fontSize){
		self.fontSize = fontSize;
	}

	self.setFont = function(fontOli) {
		self.fontOli = fontOli;
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
		self.fontOli = "Tahoma";
		self.fontSize = 12;
		self.width = 1;
		// TODO: Set sensible defaults ...
	}
	
	self.init();
}

var app = null;
$(function() {
	// Wire up events
	app = new App('#canvas');
	$('select').on('change', function(){
		if(this.value === 'square'){
			app.shapeConstructor = Square;
		}
		if(this.value === 'pencil'){
			app.shapeConstructor = Pen;
		}
		if(this.value === 'circle'){
			app.shapeConstructor = Circle;
		}
		if(this.value === 'line'){
			app.shapeConstructor = Line;
		}
		if(this.value === 'text'){
            app.shapeConstructor = TextShape;
        }
			//app.shapeConstructor = TextShape;
	});
	//$('#penbutton').click(function(){app.shapeConstructor = Pen;});
	$('#clearbutton').click(function(){app.clear()});
	$('#color').change(function(){app.setColor($(this).val())});
	$('#undo').click(function(){app.undo()});
	$('#redo').click(function(){app.redo()});
	$('#store').click(function(){app.store()});
	$('#load').click(function(){app.load()});
	$('#width').change(function(){
		console.log($("#width").val())
		app.setWidth($("#width").val())	
			//alert("HTML: " + $("#linewidth").html());
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
			//console.log(self);
		    var textValue = $("#textbox").val()
		    //console.log(this.canvas);
		    //this.canvas.font = 'italic 20px sans-serif';
      		//this.canvas.fillText(this.textValue, this.startX, this.startY);
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