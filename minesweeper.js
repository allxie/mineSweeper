// need to add:

// win...I guess?
// timer?
// score
// high score

//when we click a square, it changes color::
window.onload = function(){
	var boardHeight;
	var boardWidth;
	var notLost = true;
	var groundToSweep = 0;
	// To make the board the right size
	$("#customBoard").submit(function(event){
		event.preventDefault();
		var thisRow;
		notLost = true;
		// grabs the two dimensions or defaults to 20
		boardHeight = $("#boardHeight").val() || 20;
		boardWidth = $("#boardWidth").val() || 20;
		// console.log("assigning board width");
		var numMines = $("#numMines").val(); // or calculate, like, a third of the total and make it that.
		var squareCount = 0;

		// $("#boardHeight").val("");
		// $("#boardWidth").val("");
		// $("#numMines").val("");

		var totalSquares = boardHeight * boardWidth;
		groundToSweep = totalSquares - numMines;

		//if the user put more mines than there are squares
		if(totalSquares < numMines){
			$("#message").html("Dude. Too many mines. You definitely need fewer than " + (totalSquares-1) + " for a board that size, and probably more like " + (Math.floor(totalSquares/3)) + ".");
			//JSON: I feel like that should be lower.
		} else {
			//first clear any previous boards
			$("#board").html("");
			squareArray = [];
			// Cycles through each for the board height
			for(var i=0; i < boardHeight; i++){
				thisRow = "";
				for (var j = 0; j < boardWidth; j++) {
					// builds up a row with the correct width
					thisRow  += "<td id='s" + squareCount + "' class='box'></td>";
					squareCount += 1;
				};
				// appends a new row with all that stuff in it for each of the height
				$("#board").append( "<tr>" + thisRow + "</tr>" );
				// $("#board").append( "Goodbye</tr>" );
			};
			placeMines(numMines, totalSquares);
		}
	});

	//in here goes all of the square objects
	var squareArray = [];
	var placeMines = function(numMines, totalSquares){
		$($square).click(sweep);

		for (var i = 0; i < totalSquares; i++) {
			if (i < numMines){
				// var squareObj = {"isMine": true};
				var squareObj = {"id": null, "isMine": true, "clickedStatus" : "notClicked"};
			} else {
				var squareObj = {"id": null, "isMine": false, "clickedStatus" : "notClicked"};
				// var squareObj = {"isMine": false};
			}
			squareArray.push(squareObj);

		}

		squareArray = shuffle(squareArray);
		console.log("square Array :: ", squareArray);
		var count = 0;
		for(var i = 0; i < totalSquares; i++){
			squareArray[i].id = "#s" + count;
			count +=1;
		}
	};

	//this shuffles an array. Is used to shuffle mines.
	var shuffle = function(array){
	  for (var i = array.length - 1; i > 0; i--) {
	      var j = Math.floor(Math.random() * (i + 1));
	      var temp = array[i];
	      array[i] = array[j];
	      array[j] = temp;
	  }
	  return array;
	}

	var $square = $('#board');
	// When we click on a square, call the sweep function.


	var sweep = function(){

		console.log("yo from sweep");
		var $x = $(event.target);
		//make sure it's not flagged.
		if ($x.html() != "X"){
			var squareId = event.target.id;
			//this will then be the position in the array
			var squareIdNum = Number(squareId.slice(1));
			reveal(squareIdNum);
		}
	}

	var reveal = function(squareIdNum){
		console.log("Revealing! ", squareIdNum);

		// console.log("should be id ", squareArray[squareIdNum].id);
		if (squareArray[squareIdNum].clickedStatus != "clicked"){
				squareArray[squareIdNum].clickedStatus = "clicked";
				console.log("Really revealing! ", squareIdNum);
				var x = squareArray[squareIdNum].id;
				console.log("reveal x", x);

			if(squareArray[squareIdNum].isMine && notLost){
				 //freeze the game because you lost.
					lose();
			} else{
				console.log("not mine");
				groundToSweep -= 1;
				$(x).css("background-color","#ecf0f1");
				$(x).css("border-style","inset");
				console.log($(x));
				if(groundToSweep === 0){
					win();
					return;
				}

				var totalTouching = calcTouching(squareIdNum, boardWidth);
				if (totalTouching !=0){
					$(x).html(totalTouching);
				} else if (totalTouching === 0) { // if it's a zero
						$(x).html("");
						determinePosition(squareIdNum);
						if(!top && squareArray[squareIdNum-boardWidth].clickedStatus != "clicked"){
							reveal(squareIdNum-boardWidth); //check up
						}
						determinePosition(squareIdNum);
						if(!top && !left && squareArray[squareIdNum-(Number(boardWidth)+1)].clickedStatus != "clicked"){
							// console.log("SquareIDNumb inside not top not left:: ", squareIdNum);
							reveal(squareIdNum-(Number(boardWidth)+1));
						}
						determinePosition(squareIdNum);
						if(!top && !right && squareArray[squareIdNum-(Number(boardWidth)-1)].clickedStatus != "clicked"){
							reveal(squareIdNum-(Number(boardWidth)-1));
							// console.log("Not Top Not Right");
						}
						determinePosition(squareIdNum);
						if(!right && squareArray[squareIdNum+1].clickedStatus != "clicked"){
							reveal(squareIdNum+1);
							// console.log("Not Right")
						}
						determinePosition(squareIdNum);
						if(!left && squareArray[squareIdNum-1].clickedStatus != "clicked"){
							reveal(squareIdNum-1);
							// console.log("Not Left")
						}
						determinePosition(squareIdNum);
						if(!bottom && !left && squareArray[squareIdNum+(Number(boardWidth)-1)].clickedStatus != "clicked"){
							reveal(squareIdNum+(Number(boardWidth)-1));
							// console.log("Not Bottom Not Left")
						}
						determinePosition(squareIdNum);
						if(!bottom && !right && squareArray[squareIdNum+(Number(boardWidth)+1)].clickedStatus != "clicked"){
							reveal(squareIdNum+(Number(boardWidth)+1));
						}
						determinePosition(squareIdNum);
						if(!bottom && squareArray[Number(squareIdNum)+Number(boardWidth)].clickedStatus != "clicked"){
							reveal(Number(squareIdNum)+Number(boardWidth));
						}
				}
			}
		}
	}

	var lose = function(){
		notLost = false;
		console.log("you lose");
		$("#loseExplosion").css("display","block");
			var allSquares = Number(boardWidth) * Number(boardHeight);

		for(var i = 0; i < allSquares; i++){
			if(squareArray[i].isMine){
				var x = squareArray[i].id;
				$(x).css("background-color","red");
				$(x).css("border-style","inset");
			}
		}
		setTimeout(function(){
			$("#loseExplosion").css("display","none");
		}, 1000);

		$("#board").off('click');
	}

	var win = function(){
		$("#board").off('click');
		console.log("YOU WIN!");
		$("#win").css("display","block");
		setTimeout(function(){
			$("#win").css("display","none");
		}, 3000);
	}

	var top = false;
	var left = false;
	var right = false;
	var bottom = false;

	var determinePosition = function(index){
		top = false;
		left = false;
		right = false;
		bottom = false;

		if(index < boardWidth){
			top = true; //means this is ON the top
		}
		if(index%boardWidth === 0 || index === 0){
			left = true; //ON the left
		}
		if((index+1)%boardWidth === 0){
			right = true;
		}
		// console.log("Super board:: ", boardWidth*(boardHeight-1));
		if(index >= (boardWidth*(boardHeight-1))){
			bottom = true;
		}
	}

	//there's got to be a faster way to do this.
	var calcTouching = function(index){
		determinePosition(index);
		var touchCount=0;

		if(!left && squareArray[index-1].isMine){ //left
			console.log("left");
			touchCount += 1;
		}
		if(!right && squareArray[index+1].isMine){ //right
			console.log("Right");
			touchCount += 1;
		}

		if(!left && !top && squareArray[index - (Number(boardWidth)+1)].isMine){ //upper left
			console.log("Up left");
			touchCount += 1;
		}
		if(!top && squareArray[index - Number(boardWidth)].isMine){ //upper middle
			console.log("up mid");
			touchCount += 1;
		}
		if(!top && !right && squareArray[index - (Number(boardWidth)-1)].isMine){ //upper right
			touchCount += 1;
			console.log("up right");
		}
		if(!bottom && !right && squareArray[index + (Number(boardWidth)+1)].isMine){ //lower right
			touchCount += 1;
			console.log("lower right");
		}
		if(!bottom && squareArray[index + Number(boardWidth)].isMine){ //lower middle
			touchCount += 1;
			console.log("lower mid");
		}
		if(!bottom && !left && squareArray[index + (Number(boardWidth)-1)].isMine){ //lower left
			touchCount += 1;
			console.log("lower left");
		}
		return touchCount;
	}
	// $($square).click(sweep);



//right click to flag as questionable
	$('#board').bind("contextmenu",function(e){
   	var x = event.target;
   	var rClickSquareId = x.id;
   	var rClickSquareId = Number(rClickSquareId.slice(1));
   	//only do this if it hasn't already been clicked.
   	if(squareArray[rClickSquareId].clickedStatus != "clicked"){
   		if($(x).html() === ""){
   			$(x).html("X");
   		} else if($(x).html() === "X"){
   			$(x).html("?");
   		} else if ($(x).html() === "?"){
				$(x).html("");
   		}
 		}
   	return false;
	});



}