console.log("yo");

//--------------- Start of Designs Section------------------//

// creating raphael paper for designs section //
let designs = document.getElementById("designs");
let paper1 = new Raphael(designs);
width1 = paper1.width;
height1 = paper1.height;
bg1 = paper1.rect(0,0,width1,height1).attr({"opacity":"0%"});

// sticker designs //
let s1 = paper1.image("resources/lamp.png",width1/2-300,220,300,300);
let s2 = paper1.image("resources/heart.png",width1/2-100, 320,300,300);
let s3 = paper1.image("resources/stapler.png",width1/2+100,250,300,300);

// addding mouse listeners
let mousestate = false

// sticker 1
s1.node.addEventListener("mousedown", function(ev){
	console.log("x: " + ev.offsetX, "y: " + ev.offsetY);
	designs.style.backgroundImage = "url('https://i.pinimg.com/originals/15/a1/1d/15a11d2270323d6ac19ecb0fec1d8956.gif')";
	mousestate = true;
})
s1.node.addEventListener("mousemove", function(ev){
	if (mousestate === true){
		s1.animate({"x":ev.offsetX-150, "y":ev.offsetY-150})
	}
})
s1.node.addEventListener("mouseup", function(ev){
	console.log("x: " + ev.offsetX, "y: " + ev.offsetY);
	designs.style.backgroundImage = "url('https://i.pinimg.com/474x/57/c9/0b/57c90bab2c1df069f077fc8de2736888.jpg')";
	mousestate = false;
})

// sticker 2
s2.node.addEventListener("mousedown", function(ev){
	console.log("x: " + ev.offsetX, "y: " + ev.offsetY);
	designs.style.backgroundImage = "url('https://i.pinimg.com/474x/d3/38/fa/d338fa5d2cfbde89b20c269939b56b77.jpg')";
	mousestate = true;
})
s2.node.addEventListener("mousemove", function(ev){
	if (mousestate === true){
		s2.animate({"x":ev.offsetX-150, "y":ev.offsetY-150})
	}
})
s2.node.addEventListener("mouseup", function(ev){
	console.log("x: " + ev.offsetX, "y: " + ev.offsetY);
	designs.style.backgroundImage = "url('https://i.pinimg.com/474x/57/c9/0b/57c90bab2c1df069f077fc8de2736888.jpg')";
	mousestate = false;
})

// sticker 3 //
s3.node.addEventListener("mousedown", function(ev){
	console.log("x: " + ev.offsetX, "y: " + ev.offsetY);
	designs.style.backgroundImage = "url('https://i.pinimg.com/474x/d7/b8/a4/d7b8a46853154c28302e5845073f4fec.jpg')";
	mousestate = true;
})
s3.node.addEventListener("mousemove", function(ev){
	if (mousestate === true){
		s3.animate({"x":ev.offsetX-150, "y":ev.offsetY-150})
	}
})
s3.node.addEventListener("mouseup", function(ev){
	console.log("x: " + ev.offsetX, "y: " + ev.offsetY);
	designs.style.backgroundImage = "url('https://i.pinimg.com/474x/57/c9/0b/57c90bab2c1df069f077fc8de2736888.jpg')";
	mousestate = false;
})
//////////////////// End of Designs Section/////////////////////////

//////////////////// Start of Draw Section/////////////////////////
// creating raphael paper for draw section //
let canvas = document.getElementById("canvas");
let paper2 = new Raphael(canvas);
bg2 = paper2.rect(0,0,paper2.width,paper2.height).attr({"fill":"black", "opacity":"40%"});

// RGB sliders
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");

let colorstring;
let pathstring;
let raphaelpath;
let drawstate = false;

// adding mouse listeners
canvas.addEventListener("mousedown", function(ev){
	drawstate = true;
	console.log("mouse down in canvas!");
	colorstring = `rgb(${red.value},${green.value},${blue.value})`;
    pathstring = `M ${ev.offsetX}, ${ev.offsetY} `;
	raphaelpath = paper2.path(pathstring).attr({
		"stroke" : colorstring, "stroke-width": "15px"
    });
})

canvas.addEventListener("mouseup", function(){
	console.log("mouse up in canvas!");
	drawstate = false;
});

canvas.addEventListener("mousemove", function(ev){
	if (drawstate === true){
	    pathstring += `L ${ev.offsetX}, ${ev.offsetY} `;
	 	raphaelpath = paper2.path(pathstring).attr({
		    "stroke" : colorstring, "stroke-width":15
		});
	}
})

// function for clear button
let clearcanvas = function(){
	paper2.clear();
	bg2 = paper2.rect(0,0,paper2.width,paper2.height).attr({"fill":"black", "opacity":"40%"});
}
//////////////////// End of Draw Section/////////////////////////
