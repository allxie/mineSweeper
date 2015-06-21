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

	$("#customBoard").submit(function(event){
		event.preventDefault();
		var thisRow;
		var boardHeight = $("#boardHeight").val() || 20;
		var boardWidth = $("#boardHWidth").val() || 20;
		console.log(boardHeight, boardWidth);
		var numMines = $("numMines");

		for(i=0; i <= boardHeight; i++){
			thisRow = "";
			console.log("doing the thing");
			for (var j = 0; j <= boardWidth; j++) {
				thisRow  += "<td id='s61' class='box'></td>";
				// $("#board").append( "<td id='s61' class='box'></td>" );
			};
			$("#board").append( "<tr>" + thisRow + "</tr>" );
			// $("#board").append( "Goodbye</tr>" );
		};
	});

	var $square = $('#board');
	console.log("page loaded!");

	var sweep = function(){
		console.log("WASSAP");
		var $x = $(event.target);
		$x.css("background-color","red");
		$x.css("border-style","inset");
	}

	$($square).click(sweep);

}