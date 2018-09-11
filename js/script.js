"use strict";
/*---------------------------------------------------*/
function loadConfig() {
	// After page loaded; #play, #back clicked
	img_set		= 0;				// Default
	img_pieces  = 6;

	/*------ time ------*/
	time_show	= "Easy"; 			// Default; to display easy | medium | hard
	time_set 	= time_level[0]; 	// Default; to set value when button clicked
	time_left   = time_level[0];	// Default; to count time left and display it
	if (time_remain) clearInterval(time_remain); 					

	/*------ point ------*/
	point 		= 0;
	point_max 	= 6;
}

function loadBeforeGame() {
	$(".before-game").show();
}

function showThemes() {
	$(".themes").show();
}

function loadThemes() {
	for (var i = 0; i < img_number; i++) {
		var temp = "";
		temp += 
			"<div class='theme' data-id='" + i +"'>" +
				"<img src='" + img_path + img_name + i + img_ext + "' alt='image'>" +
			"</div>";
		$(".themes").append(temp);
	}
}

function setTheme() {
	$(".theme").click(function() {
		$(".theme").removeClass('btn_theme_on');
		$(this).addClass('btn_theme_on');
		img_set = $(this).attr('data-id');
	});
}

function setTime() {
	$(".level button").click(function() {
		$(".level button").removeClass('btn_level_on');
		$(this).addClass('btn_level_on');
		time_set  		= time_level[$(this).attr('value')];
		time_left  		= Number(time_set);
		time_show 		= $(this).html();
	});
}

function setImgPieces() {
	$(".level button").click(function() {
		img_pieces = $(this).attr('data-pieces');
	});
}

function setPointMax() {
	$(".level button").click(function() {
		point_max = $(this).attr('data-pieces');
	});
}

function hideBeforeGame() {
	$(".before-game").hide();
}

function hideThemes() {
	$(".themes").hide();
}

function loadInGame() {
	$(".in-game").show();
}

function loadInGameInfo() {
	$("#time_level").html(time_show);
	$("#time_display").html(time_set);
}

function showPuzzle() {
	$(".puzzle").show();
}

function loadPuzzle() {
	var angles = [0, 90, 180, 270];
	for (var i = 0; i < img_pieces; i++) {
		var temp = "";
		var angle = Math.floor(Math.random() * 4);
		if (angle == 0) point++;
		temp += 
			"<div class='piece'  data-size='" + img_pieces + "' data-id='" + img_pieces + "_" + i + "' data-angle='" + angles[angle] + "'>" +
				"<img src='img/p" + img_set + ".jpg' alt='image'>" +
			"</div>";
		$(".puzzle").append(temp);
	}
}

function countdown() {
	time_remain = setInterval(function() {
		if (time_left == 0) {
			clearInterval(time_remain);
			youLose();
		}
		$("#time_display").html(time_left);
		time_left--;
	}, 1000);
} 

function toRotate() {
	var angle;
	$(".piece").click(function() {
		angle = Number($(this).attr('data-angle')) + 90;
		$(this).css('transform', 'rotate(' + angle + 'deg)');
		if (angle % 360 == 0) {
			point++;
			isSuccess();
		}
		if (angle % 360 == 90) point--;
		$(this).attr('data-angle', angle);
	});
} 

function PreventPointerClick() {
	$(".puzzle").css('pointer-events', 'none');
}

function AllowPointerClick() {
	$(".puzzle").css('pointer-events', 'auto');
}

function youWin() {
	fullImg();
	PreventPointerClick();
	$(".backdrop").show(); $(".win").show();
	$(".modal span").click(function() {
		$(".backdrop").hide();
		$(".win").hide();
	});
}

function youLose() {
	PreventPointerClick();
	$(".backdrop").show(); $(".lose").show();
	$(".modal span").click(function() {
		$(".backdrop").hide();
		$(".lose").hide();
	});
}

function isSuccess() {
	if (point == point_max) {
		clearInterval(time_remain);
		youWin();
	}
}

function fullImg() {
	$(".piece").css('border', 'none');
}

function removePuzzleContent() {
	$(".puzzle").empty();
}

function resetReplayPuzzle() {
	point = 0;
	clearInterval(time_remain);
	time_left = time_set;
}

function hidePuzzle() {
	$(".puzzle").hide();
}

function hideInGame() {
	$(".in-game").hide();
}

function removeSelection() {
	$(".level").find('.btn_level_on').removeClass('btn_level_on');
	$(".themes").find('.btn_theme_on').removeClass('btn_theme_on');
}

function initial() {
	loadConfig();
	loadBeforeGame();
	loadThemes();
	setTheme();
	setTime();
	setImgPieces();
	setPointMax();
}

function Play() {
	hideBeforeGame();
	hideThemes();
	loadInGame();
	loadInGameInfo();
	showPuzzle();
	loadPuzzle();
	AllowPointerClick();
	countdown();
	toRotate();
}

function rePlay() {
	removePuzzleContent();
	resetReplayPuzzle();
	loadPuzzle();
	AllowPointerClick();
	countdown();
	toRotate();
}

function Back() {
	removePuzzleContent();
	hidePuzzle();
	hideInGame();
	removeSelection();
	loadConfig();
	loadBeforeGame();
	showThemes();
	setTheme();
	setTime();
	setImgPieces();
	setPointMax();
}

/* *********************************

- First: 
	+ Load config
	+ Load themes
	+ Set level, set theme

- Play: Load level, theme, time
	+ Hide themes, hide before-info
	+ Show puzzle, Load puzzle
	+ Countdown
	+ Rotate
	* Win
	* Lose

- Replay:
	+ Remove puzzle content
	+ Reset Play Info
	+ Load Play Content (Load puzzle)
	+ Countdown
	+ Rotate
	* Win
	* Lose

- Back: 
	+ Load config
	+ Remove puzzle content
	+ Hide puzzle
	+ Reset Selection
	+ Show themes
	+ Show before-info

*/


/*---------------------------------------------------*/

$(document).ready(function() {

	initial();

	$("#play").click(function() {
		Play();
	});
	$("#replay").click(function() {
		rePlay();
	});
	$("#back").click(function() {
		Back();
	});

});