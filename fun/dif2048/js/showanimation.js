function showNum(i, j){
	let td = document.getElementById(i +''+ j);
	td.classList.remove('boardCell');
	td.classList.add('showNum');
	setTimeout(function(){
		td.classList.remove('showNum');
	}, 800);
}

function showAdd(i){
	let addScore = document.getElementById('addScore');
	addScore.innerHTML = '+' + i;
	addScore.classList.add('active');
	setTimeout(function () {
	  addScore.classList.remove("active");
	}, 800);
}

function winGame(){
	let mask = document.getElementById('winMask');
	mask.style.zIndex = 10;
	mask.style.opacity = 1;
}

function again(){
	newGame();
	let mask = document.getElementById('winMask');
	mask.style.zIndex = -10;
	mask.style.opacity = 0;
	let overmask = document.getElementById('overMask');
	overmask.style.zIndex = -10;
	overmask.style.opacity = 0;
}

function keepGoing(){
	let mask = document.getElementById('winMask');
	mask.style.zIndex = -10;
	mask.style.opacity = 0;
}