
/*
- res: 1920 x 1080 => 800 x 450 => 400 x 225
- res: 1600 x 1200 => 800 x 600 => 400 x 300
- res: 900 x 600 => 300 | 150 | 100 
*/

/*------ imgage ------*/
var img_path 	= "img/";
var img_name 	= "p";
var img_ext 	= ".jpg";
var img_number	= 10;				
var img_set		= 0;				// Default
var img_pieces	= 6;				// Easy: 6, Medium: 24, Hard: 54

/*------ time ------*/
var time_level 	= [15, 40, 80];
var time_show	= "Easy"; 			// Default; to display easy | medium | hard
var time_set 	= time_level[0]; 	// Default; to set value when button clicked
var time_left   = time_level[0];	// Default; to count time left and display it
var time_remain; 					// to setInterval()

/*------ point ------*/
var point 		= 0;
var point_max   = 6;				// Default