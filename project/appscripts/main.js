console.log("yo");


//------- homepage images --------//
let joie1 = document.getElementById("joie1");

let imgx = joie1.height;
let imgy = joie1.width;

joie1.addEventListener("mousemove", function(ev){
	// x: left to right, y: top to bottom
	if (ev.offsetX > imgx/2){
		// if mouse on right side
		if (ev.offsetY < imgy/2){
			// if mouse is top right
			// console.log("top right");
			joie1.src = "resources/joie8.png";
		} else {
			// bottom right
			// console.log("bottom right");
			joie1.src = "resources/joie5.PNG";
		}
	} else {
		// left side
		if (ev.offsetY < imgy/2){
			// top left
			// console.log("top left");
			joie1.src = "resources/joie6.png";
		} else {
			// bottom left
			// console.log("bottom left");
			joie1.src = "resources/joie7.png";
		}
	}
})


