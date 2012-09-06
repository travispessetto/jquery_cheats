/*A context menu to replace the windows pop-out one.
 * by Travis Pessetto for ES3 inc first authored August 30, 2011
 * as part of the jquery_cheats gem
 */
//As of August 30, 2012 this solution is partially working.  Look at bottom of page.  Must work out bugs.

//Global...bad...think about removing....
click$ = null;
$(document).ready(function(){
	//Disable all bar charts...
	$("div.barchart canvas").live("contextmenu",function(e){
		click$ = $(this).parents("div.barchart").last();
	    $("body").append('<ul id="jqplot_context_menu"><li><a onclick="showGraphImage();">View as image</a></li></ul>');
	    var li$ = $("#jqplot_context_menu");
	    li$.css("display","none");
	    li$.css("position","absolute");
	    li$.css("top",e.pageY);
	    li$.css("left",e.pageX);
	    li$.fadeIn();
		return false;
	});
	
	$("#psGreyScreen").live("click",function()
	{
		if($("div#canvasImage").length > 0)
		{
			$("div#canvasImage").css("display","none");
			$("div#canvasImage").remove();
			$("#psGreyScreen").fadeOut();
			$("#psGreyScreen").remove();
		}
	})
});


function showGraphImage()
{

	$("body").prepend('<div id="psGreyScreen"></div>');
	greyScreen$ = $("#psGreyScreen");
	greyScreen$.css({"background-color" : "#ccc"});
	greyScreen$.css("width",$("body").width());
	greyScreen$.css("height",$("body").height());
	greyScreen$.css("z-index","2999");
	greyScreen$.css("position","fixed");
	greyScreen$.css("top","0");
	greyScreen$.css("left","0");
	greyScreen$.fadeIn();
	
	var chart = click$;
	var img = chart.jqplotToImageStr({}); 
	//$("div#canvasImage").remove();
	$("body").prepend('<div id="canvasImage"><img src="'+img+'" name="'+chart.attr("id")+'"/></div>');
	ci$ = $("div#canvasImage");
	ci$.css("position","fixed")
	ci$.css("border","10px solid #000");
	ci$.css("background-color","#000");
	ci$.css("top","0");
	ci$.css("left",($("body").width()/2)-(ci$.width()/2));
	ci$.css("z-index","3000")
	ci$.fadeIn();
}
