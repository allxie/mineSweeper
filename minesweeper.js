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

	// To make the board the right size
	$("#customBoard").submit(function(event){
		event.preventDefault();
		var thisRow;
		// grabs the two dimensions or defaults to 20
		var boardHeight = $("#boardHeight").val() || 20;
		var boardWidth = $("#boardWidth").val() || 20;
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
			console.log("square Array :: ", squareArray);
			var count = 0;
		}

		for(var i = 0; i < totalSquares; i++){
			squareArray[i].id = "s" + count;
			count +=1;
		}


		//is there a random distribution algorithm? or maybe just use the shuffle with the total set...
		//maybe create an array of objects of size totalSquares with the first numMines of them having the mines
		// Then shuffle them.
		// Then assign the id.

	};

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
	console.log("page loaded!");

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
		}
	}
	// When we click on a square, call the sweep function.
	$($square).click(sweep);

}