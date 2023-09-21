console.log("yo");

//------- doggo jump here ---------//
paper = new Raphael (document.getElementById("game"));
let gamewidth = paper.width;
let gameheight = paper.height;

console.log(gamewidth, gameheight);
let game = paper.rect(gamewidth, gameheight);
gamebg = paper.rect(0,0,gamewidth, gameheight).attr({"fill":"url(https://i.pinimg.com/originals/a4/22/9a/a4229a483cf76e0b5458450c2e591ff3.png)"});
let dog = paper.image("resources/dog.png",10,100,80,80);
dog.xpos = 10;
dog.ypos = 100;

let gamestate = false;
dog.node.addEventListener("click", function(){
	gamestate = true;
	jump();
	console.log("game starts");
})

gamebg.node.addEventListener("click", jump = function(ev){
	dog.animate({"x":10, "y":10}, 200, "linear", down);
})

let down = function(){
	dog.animate({"x":10, "y":100}, 200)
}

let main = function(){
	if (gamestate === true){
		//check if dog hits obstacles
	}
}

//------- end of doggo jump ---------//