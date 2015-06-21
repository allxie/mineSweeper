//Take input about dimensions

//depending on dimensions, append squares.
//Line break when rows get to a certain size
//

//Array of objects
// {"number" : x
// ,"value" : 0-8 or mine
// ,""}

//JSON suggestion:
// Array of objects
// {"x-axis": x,
// "y-axis" : y,
// "visible": true/false,
// "minePresence" : true/false,
// "displayValue" : 0-9}
//
// (0 is mine, 9 is blank, or vice versa)

//when we click a square, it changes color::
window.onload =function(){
	var boardHeight;
	var boardWidth;
	// To make the board the right size
	$("#customBoard").submit(function(event){
		event.preventDefault();
		var thisRow;
		// grabs the two dimensions or defaults to 20
		boardHeight = $("#boardHeight").val() || 20;
		boardWidth = $("#boardWidth").val() || 20;
		console.log("assigning board width");
		var numMines = $("#numMines").val();
		var squareCount = 0;
		$("#boardHeight").val("");
		$("#boardWidth").val("");
		$("#numMines").val("");

		var totalSquares = boardHeight * boardWidth;

		//if the user put more mines than there are squares
		if(totalSquares < numMines){
			$("#message").html("Dude. Too many mines. You definitely need fewer than " + (totalSquares-1) + " for a board that size, and probably more like " + (Math.floor(totalSquares/3)) + ".");
		} else {
			//first clear any previous boards
			$("#board").html("");
			squareArray = [];
			// Cycles through each for the board height
			for(i=0; i < boardHeight; i++){
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

		for (var i = 0; i < totalSquares; i++) {
			if (i < numMines){
				var squareObj = {"id": null, "isMine": true, "clickedStatus" : "notClicked"};
			} else {
				var squareObj = {"id": null, "isMine": false, "clickedStatus" : "notClicked"};
			}
			squareArray.push(squareObj);
			squareArray = shuffle(squareArray);
			// console.log("square Array :: ", squareArray);
			var count = 0;
		}

		for(var i = 0; i < totalSquares; i++){
			squareArray[i].id = "s" + count;
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


	var sweep = function(){
		var $x = $(event.target);
		var squareId = event.target.id;
		//this will then be the position in the array
		var squareIdNum = Number(squareId.slice(1));
		$x.css("background-color","red");
		$x.css("border-style","inset");
		if(squareArray[squareIdNum].isMine){
			$x.css("background-color","red");
			$x.css("border-style","inset");
		} else{
			$x.css("background-color","#ecf0f1");
			var touchCount = calcTouching(squareIdNum, boardWidth);
			$x.html(touchCount);
		}
	}
	//there's got to be a faster way to do this.
	var calcTouching = function(index){
		console.log("first Board Width: ", boardWidth);
		// var boardWidth = Number(boardWidth);
		var touchCount = 0;
		if(squareArray[index-1].isMine){ //left
			touchCount += 1;
		}
		if(squareArray[index+1].isMine){ //right
			touchCount += 1;
		}
		console.log(typeof boardWidth);
		console.log("Board Width ", boardWidth);
		var otherWidth = Number(boardWidth) + 1;
		console.log("other width : ", otherWidth);
		console.log(index);
		console.log("boardwidth plus 1", Number(Number(boardWidth)+1));
		var offset = Number(boardWidth) + 1;
		console.log(offset);
		console.log("Index-offset " , Number(index)-Number(offset));
		if(squareArray[index - offset].isMine){ //upper left
			touchCount += 1;
		}
		if(squareArray[index - Number(boardWidth)].isMine){ //upper middle
			touchCount += 1;
		}
		if(squareArray[index - (Number(boardWidth)-1)].isMine){ //upper right
			touchCount += 1;
		}
		if(squareArray[index + (Number(boardWidth)+1)].isMine){ //lower right
			touchCount += 1;
		}
		if(squareArray[index + Number(boardWidth)].isMine){ //lower middle
			touchCount += 1;
		}
		if(squareArray[index + (Number(boardWidth)-1)].isMine){ //lower left
			touchCount += 1;
		}
		return touchCount;
	}
	// When we click on a square, call the sweep function.
	$($square).click(sweep);

}