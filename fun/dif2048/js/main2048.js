let board = new Array(4);
let score = 0;
const len = board.length;
let firstWin = true;
let combineMusic;
let startX, startY, endX, endY;

window.onload = function(){
	newGame();
}

function newGame(){
	for(let i = 0; i < len; i++){
		board[i]=[0,0,0,0];
	}
	let x1,x2,y1,y2;
	x1 = Math.floor(Math.random()*4);
	y1 = Math.floor(Math.random()*4);
	board[x1][y1] = 2;
	while(true){
		x2 = Math.floor(Math.random()*4);
		y2 = Math.floor(Math.random()*4);
		if(x1 != x2 || y1 != y2){
			board[x2][y2] = 4;
			break;
		}
	}
	upDateBoard();
}

function upDateBoard(){
	let badge;
	let newScore = 0;
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
			let td = document.getElementById(i+''+j);
        	if(board[i][j] != 0){
        		switch(board[i][j]){
	            case 2:
	                td.innerHTML = '搭讪';
	                td.style="background-color:#FFFFCA";
	                break;
	            case 4:
	                td.innerHTML = '约会';
	                td.style="background-color:#FFEFD1";
	                break;
	            case 8:
	                td.innerHTML = '表白';
	                td.style="background-color:#FEDFD5";
	                break;
	            case 16:
	                td.innerHTML = '被拒';
	                td.style="background-color:#FFDEAD";
	                break;
	            case 32:
	                td.innerHTML = '自闭';
	                td.style="background-color:#FFA07A";         
	                break;
	            case 64:
	                td.innerHTML = '跪舔';
	                td.style="background-color:#F04848";     
	                break;
	            case 128:
	                td.innerHTML = '感动爱'; 
	                td.style="background-color:#DB7093";    
	                break;
	            case 256:
	                td.innerHTML = '牵手'; 
	                td.style="background-color:#FF69B4";        
	                break;
	            case 512:
	                td.innerHTML = 'Touch!';
	                td.style="background-color:#DA70D6";         
	                break;
	            case 1024:
	                td.innerHTML = 'Kiss~'; 
	                td.style="background-color:#FF4500";        
	                break;
	            case 2048:
	                td.innerHTML = 'Chicken dinner!!';  
	                td.style="background-color:#FF3D5E";
                	if(firstWin){
                		winGame();
                		firstWin = false;
                	}        
	                break;
	            default:
	            	td.innerHTML = board[i][j];
	                td.style="background-color:#FF7373";
	                break;
        		}
        	}else{
				td.innerHTML = '';
	            td.style="background-color:#FF9999";
        	}
        	newScore += board[i][j];
        }
	}
	showAdd(newScore - score);
	score = newScore;
	let record = document.getElementById('score');
	record.innerHTML = "情感值 : " + score;
}

function generateNum(){
    let x,y;
    let times = 0;
    while(times < 50){
    	x = Math.floor(Math.random()*4);
    	y = Math.floor(Math.random()*4);
    	if(board[x][y] == 0) break;
    	times++;
    }
    if(times == 50){
    	for(let i; i < 4; i++)
    		for(let j; j < 4; j++){
    			if(board[i][j] == 0){
    				x = i;
    				y = j;
    			}
    		}
    }
    let randNum = Math.random() > 0.5 ? 2 : 4;
    board[x][y] = randNum;
    showNum(x, y);
}

window.onkeydown = function(){
    let code = event.keyCode;
    switch (code) {
	    case 37:
	    	event.preventDefault();
	        if(moveLeft()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
	        break;
	    case 38:
	    	event.preventDefault();
	        if(moveUp()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
	        break;
	    case 39:
	    	event.preventDefault();
	        if(moveRight()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
	        break;
	    case 40:
	    	event.preventDefault();
	        if(moveDown()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
	        break;
	    default:
	    	break;
    }
}

function moveLeft(){
	if(!canMoveLeft()) return false;
	let boardRow, boardRowLen;
	combineMusic = document.getElementById('combineMusic');
	for(let i = 0; i < len; i++){
		if(board[i] == [0,0,0,0]) continue;
		boardRow = [0,0,0,0];
		boardRowLen = 0;
		for(let j = 0; j < len; j++){
			if(board[i][j] != 0){
				boardRow[boardRowLen] = board[i][j];
				boardRowLen++;
			}
		}
		for(let j = 0; j < boardRowLen-1; j++){
			if(boardRow[j] == boardRow[j+1]){
				boardRow[j] *= 2;
				showNum(i, j);
				let k = j+1;
				while(k < boardRowLen-1) boardRow[k++] = boardRow[k];
				boardRow[boardRowLen-1] = 0;
				combineMusic.src = "img/combine.wav";
				break;
			}
		}
		board[i] = boardRow;
	}
	return true;
}

function canMoveLeft(){
	let canMove = false;
	here: for(let i = 0; i < len; i++){
		if(board[i] == [0,0,0,0]) continue;
		let previousNum = board[i][0];
		for(let j = 1; j < len; j++){
			if(board[i][j] == 0) continue;
			if(board[i][j-1] == 0 || board[i][j] == previousNum){
				canMove = true;
				break here;
			}
			previousNum = board[i][j];
		}
	}
	return canMove;
}

function moveRight(){
	if(!canMoveRight()) return false;
	let boardRow, boardRowLen;
	combineMusic = document.getElementById('combineMusic');
	for(let i = 0; i < len; i++){
		if(board[i] == [0,0,0,0]) continue;
		boardRow = [0,0,0,0];
		boardRowLen = 3;
		for(let j = 3; j > -1; j--){
			if(board[i][j] != 0){
				boardRow[boardRowLen] = board[i][j];
				boardRowLen--;
			}
		}
		for(let j = 3; j > boardRowLen+1; j--){
			if(boardRow[j] == boardRow[j-1]){
				boardRow[j] *= 2;
				showNum(i, j);
				let k = j-1;
				while(k > boardRowLen+1) boardRow[k--] = boardRow[k];
				boardRow[boardRowLen+1] = 0;
				combineMusic.src = "img/combine.wav";
				break;
			}
		}
		board[i] = boardRow;
	}
	return true;
}

function canMoveRight(){
	let canMove = false;
	here: for(let i = 0; i < len; i++){
		if(board[i] == [0,0,0,0]) continue;
		let previousNum = board[i][3];
		for(let j = 2; j > -1; j--){
			if(board[i][j] == 0) continue;
			if(board[i][j+1] == 0 || board[i][j] == previousNum){
				canMove = true;
				break here;
			}
			previousNum = board[i][j];
		}
	}
	return canMove;
}

function moveUp(){
	if(!canMoveUp()) return false;
	let boardRow, boardRowLen;
	combineMusic = document.getElementById('combineMusic');
	for(let j = 0; j < len; j++){
		boardRow = [0,0,0,0];
		boardRowLen = 0;
		for(let i = 0; i < len; i++){
			if(board[i][j] != 0){
				boardRow[boardRowLen] = board[i][j];
				boardRowLen++;
			}
		}
		for(let i = 0; i < boardRowLen-1; i++){
			if(boardRow[i] == boardRow[i+1]){
				boardRow[i] *= 2;
				showNum(i, j);
				let k = i+1;
				while(k < boardRowLen-1) boardRow[k++] = boardRow[k];
				boardRow[boardRowLen-1] = 0;
				combineMusic.src = "img/combine.wav";
				break;
			}
		}
		for(let i = 0; i < len; i++){
			board[i][j] = boardRow[i];
		}
	}
	return true;
}

function canMoveUp(){
	let canMove = false;
	here: for(let j = 0; j < len; j++){
		let previousNum = board[0][j];
		for(let i = 1; i < len; i++){
			if(board[i][j] == 0) continue;
			if(board[i-1][j] == 0 || board[i][j] == previousNum){
				canMove = true;
				break here;
			}
			previousNum = board[i][j];
		}
	}
	return canMove;
}

function moveDown(){
	if(!canMoveDown()) return false;
	let boardRow, boardRowLen;
	combineMusic = document.getElementById('combineMusic');
	for(let j = 0; j < len; j++){
		boardRow = [0,0,0,0];
		boardRowLen = 3;
		for(let i = 3; i > -1; i--){
			if(board[i][j] != 0){
				boardRow[boardRowLen] = board[i][j];
				boardRowLen--;
			}
		}
		for(let i = 3; i > boardRowLen+1; i--){
			if(boardRow[i] == boardRow[i-1]){
				boardRow[i] *= 2;
				showNum(i, j);
				let k = i-1;
				while(k > boardRowLen+1) boardRow[k--] = boardRow[k];
				boardRow[boardRowLen+1] = 0;
				combineMusic.src = "img/combine.wav";
				break;
			}
		}
		for(let i = 3; i > -1; i--){
			board[i][j] = boardRow[i];
		}
	}
	return true;
}

function canMoveDown(){
	let canMove = false;
	here: for(let j = 0; j < len; j++){
		let previousNum = board[3][j];
		for(let i = 2; i > -1; i--){
			if(board[i][j] == 0) continue;
			if(board[i+1][j] == 0 || board[i][j] == previousNum){
				canMove = true;
				break here;
			}
			previousNum = board[i][j];
		}
	}
	return canMove;
}

function isOver(){
	if(canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown()) return false;
	let mask = document.getElementById('overMask');
	mask.style.zIndex = 10;
	mask.style.opacity = 1;
}

document.addEventListener('touchstart', function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
})

// document.addEventListener("touchmove", function(event){
// 	event.preventDefault();
// })

document.addEventListener('touchend', function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	let deltax = endX - startX;
	let deltay = endY - startY;

	if(Math.abs(deltax) < 0.05*document.body.clientWidth && Math.abs(deltay) < 0.05*document.body.clientWidth)
		return;

	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			if(moveRight()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
		}else{
			if(moveLeft()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
		}
	}else{
		if(deltay > 0){
			if(moveDown()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
		}else{
			if(moveUp()){
	        	setTimeout(generateNum(),210);
	        	setTimeout(upDateBoard(),210);
	        	setTimeout(isOver(),300);
	        }
		}
	}
});