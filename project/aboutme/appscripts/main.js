console.log("yo");

//----------- Start of Skate section -----------//
let paper2 = new Raphael(document.getElementById("skate"));
let skatewidth = paper2.width;
let skateheight = paper2.height;
let skatebg = paper2.rect(0,0,skatewidth, skateheight).attr({"fill":"black","opacity":"0%"});

// let cruiser = paper2.image("resources/cruiser.png",(skatewidth/2) - 150, (skateheight/2) - 150,300,300);
let cruiser = paper2.image("https://i.pinimg.com/originals/be/0e/fa/be0efa73424eb869ab37b495f3536ef3.png",(skatewidth/2) - 150, (skateheight/2) - 150,331,150);
cruiser.xpos = (skatewidth/2) - 150;
cruiser.ypos = (skateheight/2) - 150;

let sb1 = paper2.image("resources/sb1.jpg",skatewidth,skateheight,225,300);
let sb2 = paper2.image("resources/sb2.jpg",skatewidth,skateheight,207,300);
let sb3 = paper2.image("resources/sb3.jpg",skatewidth,skateheight,200,300);
let lb1 = paper2.image("resources/lb1.jpg",skatewidth,skateheight,205,300);
let lb2 = paper2.image("resources/lb2.jpg",skatewidth,skateheight,232,300);
let lb3 = paper2.image("resources/lb3.jpg",skatewidth,skateheight,246,300);

cruiser.node.addEventListener("mouseover", function(){
	sb1.animate({"x":cruiser.xpos-100, "y":cruiser.ypos-50}, 500, "bounce").toBack();
	sb2.animate({"x":cruiser.xpos+150, "y":cruiser.ypos+100}, 600, "bounce").toBack();
	sb3.animate({"x":cruiser.xpos-120, "y":cruiser.ypos+100}, 700, "bounce").toBack();
	lb1.animate({"x":cruiser.xpos+50, "y":cruiser.ypos-100}, 800, "bounce").toBack();
	lb2.animate({"x":cruiser.xpos+200, "y":cruiser.ypos+50}, 900, "bounce").toBack();
	lb3.animate({"x":cruiser.xpos-20, "y":cruiser.ypos+200}, 1000, "bounce").toBack();
})
skatebg.node.addEventListener("mouseover", function(){
	sb1.attr({"x":skatewidth, "y":skateheight});
	sb2.attr({"x":skatewidth, "y":skateheight});
	sb3.attr({"x":skatewidth, "y":skateheight});
	lb1.attr({"x":skatewidth, "y":skateheight});
	lb2.attr({"x":skatewidth, "y":skateheight});
	lb3.attr({"x":skatewidth, "y":skateheight});
})


//----------- End of Skate! section -----------//


//----------- Start of Doggos! section -----------//
let paper = new Raphael (document.getElementById("game"));
let gamewidth = paper.width;
let gameheight = paper.height;

let game = paper.rect(0,0,gamewidth, gameheight).attr({"stroke":"white","stroke-width": 2});
let dog = paper.image("resources/dog.png",10,110,80,80);
let treat = paper.image("resources/treat.png", gamewidth-10,140,69,60);
let fence = paper.image("resources/fence.png",gamewidth-10,140,60,60);

let scoreboard = document.getElementById("scoreboard");

let jumpsound = new Audio ("resources/bounce.wav");
let oversound = new Audio ("resources/gameover.wav");
let startsound = new Audio ("resources/gamestart.ogg");
let powersound = new Audio("resources/powerup.mp3");

jumpsound.volume = 0.1;
oversound.volume = 0.2;
startsound.volume = 0.2;
powersound.volume = 0.2;

dog.xpos = 10;
dog.ypos = 110;
fence.xpos = gamewidth-10;
fence.ypos = 140;
treat.xpos = gamewidth-10;
treat.ypos = 140;

let gamestate = false;

document.addEventListener("keydown", jump = function(){
	if (gamestate !== true){
		gamestate = true;
		startgame();
	} else{
		jumpsound.pause();
		jumpsound.currentTime = 0;
		jumpsound.play();
		while (dog.ypos > 10){
			dog.ypos -= 10;
			dog.animate({"x":10,"y":dog.ypos}, 200, down)
		}
	}
})

let down = function(){
	while (dog.ypos < 110){
		dog.ypos += 10;
		dog.animate({"x":10,"y":dog.ypos}, 200);
	}
}

let start;
let starttime;
let score = 0;
let bonus = 0;

let startgame = function(){
	startsound.pause();
	startsound.currentTime = 0;
	startsound.play();
	jump();
	// move obstacles
	console.log("Game Starts!");
	start = setInterval(movefence, 20);
	starttreat = setInterval(movetreat, 40);
	gamestate = true;
	starttime = Date.now();
}

let movefence = function(){

	//start timer
	score = Date.now()-starttime + bonus;
	scoreboard.innerHTML = "Score: " + score;

	// if fence hits dog
	if (collision() === true){
		endgame();
	}else{
		// move fence
		fence.animate({"x":fence.xpos-10})	
		fence.xpos = fence.xpos-10;
	}

	// if fence passes dog
	if (fence.xpos <= 0){
		fence.xpos = gamewidth;
	} 
}

let getrandrate = function(min, max){
	return Math.floor(Math.random() * (max-min) + min);
}

let treatrate = 10;
let movetreat = function(){

	// move treat
	treat.animate({"x":treat.xpos-treatrate})	
	treat.xpos = treat.xpos-treatrate;

	// if treat passes dog
	if (treat.xpos <= 0){
		treat.xpos = gamewidth;
	} 

	// if dog eats treat
	if (eattreat() === true){
		// add bonus points for treat
		powersound.pause();
		powersound.currentTime = 0;
		powersound.play();
		bonus += 1000;
		let treatpopup = paper.text(gamewidth/2, gameheight/2, "Treat! Score + 1000").attr({
			"fill":"white", "font-size":"15px"
		});
		treatpopup.animate({"y":(gameheight/2)-10},700, "bounce", function(){
			treatpopup.remove();
		})
		treatrate = getrandrate(10,20);
		// console.log("Treat rate:", treatrate);

		//move treat back to starting position
		treat.attr({"x":gamewidth-10, "y":140});
		treat.xpos = gamewidth-10;
		treat.ypos = 140;
	}	
}

let collision = function(){
	if (dog.attrs.y<=110 && dog.attrs.y>70 && fence.xpos>0 && fence.xpos<60){
		console.log("Doggo hit the fence!");
		return true
	} return false
}

let eattreat = function(){
	if (dog.attrs.y<=110 && dog.attrs.y>70 && treat.xpos>0 && treat.xpos<60){
		console.log("Treat!");
		return true
	} return false
}

let endgame = function(){
	oversound.pause();
	oversound.currentTime = 0;
	oversound.play();
	clearInterval(start);
	clearInterval(starttreat);
	gamestate = false;

	alert(`You lost!\nYou've got ${bonus/1000} treat(s) and your total score is: ` + score + "\n\nClick OK or Press any key to start again");

	score = 0;
	bonus = 0;
	fence.attr({"x":gamewidth-10, "y":140});
	fence.xpos = gamewidth-10;
	fence.ypos = 140;
	treat.attr({"x":gamewidth-10, "y":140});
	treat.xpos = gamewidth-10;
	treat.ypos = 140;
	scoreboard.innerHTML = "Score: 0";
}

//----------- End of Doggos! section -----------//
