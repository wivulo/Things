//Javascript

let sn1 = document.getElementsByClassName("sn1")[0];

let movex = 0;
let movey = 0;
let dx = 1;
let pos = 0;

const move = () => {
	if(dx == 1 && pos == 0) {
		movex = movex + 2;

		if(movex == 200) {
			movey = 0;
			dx = -1;
			pos = 1;
		}
	}else if(dx == -1 && pos == 1) {
		movey = movey + 2;
		if(movey == 190) {
			dx = 1;
			pos = 2;
		}
	}else if(dx == 1 && pos == 2) {
		movex = movex - 2;
		if(movex == 0) {
			dx = -1;
			pos = 3;
		}
	}else if(dx == -1 && pos == 3) {
		movey = movey - 2;
		if(movey == 0) {
			dx = 1;
			pos = 0;
		}
	}

	if(dx == 1) {
		sn1.style.left = movex + "px";
	}else{
		sn1.style.top = movey + "px";
	}

	requestAnimationFrame(move);
}

move();

//Canvas

let canvas = document.getElementById("canva");
let ctx = canvas.getContext("2d");
/*
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(10, 50);
ctx.lineTo(50, 50);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(90, 30);
ctx.arc(70, 30, 20, 0, Math.PI);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(110, 30);
ctx.quadraticCurveTo(150, 5, 170, 30);
ctx.stroke();

//rectangulos

//ctx.moveTo(10, 70);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 200, 200);

ctx.clearRect(50, 50, 100, 100);

ctx.strokeStyle = "blue";
ctx.strokeRect(60, 60, 80, 80);
*/

ctx.beginPath()
ctx.moveTo(100, 0)
//ctx.lineTo(140, 140)
ctx.arcTo(100, 100, 300, 100, 100)
ctx.stroke()

ctx.closePath()
