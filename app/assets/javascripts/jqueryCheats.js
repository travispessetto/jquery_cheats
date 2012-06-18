var categoryPos = 0;
$(document).ready(function(){
	//make select boxes ajax-compatible by adding two params data-onchange=true and data-url="/path/to"
	$('select[data-onchange]').live("change",function(){
	   $.ajax({type: "post",
	         url: $(this).attr("data-url"),
	         data: $(this).serialize(),
	         success: function(data){eval(data);},
	         dataType: "script"});
	});
	//make radio buttons onclick compatible
	$('input[type="radio"][data-onclick]').live("change",function()
	{
		data = $(this).serialize();
		if($(this).attr("data-params"))
		{
			data += "&"+$(this).attr("data-params");
		}
		$.ajax({type: "post",
		url: eval($(this).attr("data-onclick")),
		data: data,
		success: function(data){eval(data);},
		dataType: "script"});
	});
	//start loading the pie charts...
	$("div.piechart").each(function(){
		pieChart($(this).attr("id"),$(this).attr("data-xmlurl"));
	});
	$("div.piechart").bind('jqplotDataClick',
	function(ev,seriesIndex,pointIndex,data){
		if(data[2] != "")
		{
			window.location = data[2];
		}
	});
	//bind click events to  piehcart
	//start by loading the barcharts...
	$("div.barchart").each(function(){BarChart($(this).attr("id"),$(this).attr("data-xmlurl"))});
	$('div.barchart').bind('jqplotDataClick', 
        function (ev, seriesIndex, pointIndex, data) {
            	/* To open in a NEW window use: */
            	/* window.open(data[2]); */
            	/* To open in the same window use: */
   				for(i = 0; i < data.length; i++) $("#debug").append("\nData["+i+"]:"+data[i]);
   				$("#debug").append("\nlink: "+data[2]);
   				window.location = data[2]
            }
        );
        
        //#TO PREVENT PROBLEMS WITH DEBUG IF IT DOES NOT EXIST
        if(!$("#debug"))
        {
        	$("html").append("<div id=\"debug\"></div>");
        	$("div#debug").css("display","none");
        }
});

///some helpter functions here

//####THIS ONE HELPS PROCESS XML


function BarChart(name,xmlurl)
{
	//this is the BarChart Method
	//get the XML data
	$.get(xmlurl,function(xml){
		//we have the URL object as xml
		var width = XMLWidth(xml);//The width of the chart
		var height = XMLHeight(xml);
		var bars = getBars(xml);
		//append these to the div
		$("div#"+name).css("width",width);
		$("div#"+name).css("height",height);
			$.jqplot(name,getBars(xml),{ seriesDefaults:{
	            renderer:$.jqplot.BarRenderer,
	            rendererOptions: {fillToZero: true, barWidth: barWidth(xml)}
	        },
	        axes: {
            // Use a category axis on the x axis and use our custom ticks.
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: getTicks(xml),
	                autoscale: true
	            },
	            yaxis: {
	            	min: getYAxisMin(xml),
	            	max: getYAxisMax(xml),
	            	autoscale: true,
	            	tickInterval: getTickInterval(xml)
	            }
            }
	        });
		});
}

function barWidth(xml)
{
	var width = $(xml).find("render").attr("barWidth");
	if(width) return width; else return null;
}

function getYAxisMin(xml)
{
	var min = $(xml).find("yaxis").attr("min");
	if(min)
	{
		return min;
	}
	else
	{
		return null;	
	}
}

function getYAxisMax(xml)
{
	var max = $(xml).find("yaxis").attr("max");
	if(max) return max;
	if(!max) return null;
}
function getTicks(xml)
{
	//this function should get the ticks from the XML
	var ticks = [];
	$(xml).find("tick").each(function(){
		ticks.push($(this).attr("text"));
	});
	return ticks;
}
function loadBars(categoryid, xml) {
    var bar = [];
    var bars = [];
    $(xml).find("bar").each(function() {
        bar.push(parseInt(categoryid, 10));
        bar.push(parseInt($(this).attr("size"), 10));
        bar.push($(this).attr("link"));
        bars.push(bar);
    });
    return bars; //moved from end of "each" iterator to here.
}
function getBars(xml) {
    var categoryid = 1;
    var bars = [];
    $(xml).find("category").each(function() {
        bars.push(loadBars(categoryid, $(this)));
        categoryid++;
    });
    return bars;
}

function XMLWidth(xml)
{
	//get the width and height of the object via XML
	return $(xml).find("size").attr("width");
}

function XMLHeight(xml)
{
	return $(xml).find("size").attr("height");
}

/*function loadBars(xml,categoryid)
{
	bars = [];//the category to put the bar...probably shouldn't go here.
	$(xml).find("bar").each(
		function(){
			//categoryPos = categoryPos+1;
			//$("#debug").append("\nCATEGORY POSSITION:"+categoryPos)
			//bars.push(categoryPos);
			bar= new Array();
			bar.push(parseInt(categoryid));
			bar.push(parseInt($(this).attr("size")));
			link = $(this).attr("link");
			if(link)bar.push(link); else links.push("#");
			bars.push(bar);
		});
	$("#debug").append("\nDEBUG bars Array in Loadbars:");
	debug2dArray(bars);
	return bars;
}*/


function getTickInterval(xml)
{
	var interval = $(xml).find("yaxis").attr("tickInterval");
	if(interval) return interval;
	else return null;
}

function debug2dArray(arr)
{
	$("#debug").append("\n[");
	for(i = 0; i < arr.length; i++)
	{
		$("#debug").append("\n[");
		for(j = 0; j < arr[i].length; j++)
		{
			if(j != 0) $("#debug").append(","); 
			$("#debug").append(arr[i][j]);
		}
		$("#debug").append("]");
	}
	$("#debug").append("\n]");
	return arr;
}

///THIS IS THE PIE CHART SECTION, Somethings may be borrowed from BarCharts
//###THINGS BORROWED FROM BARCHARTS: debug2dArray

function pieChart(name,xmlurl)
{
	$.get(xmlurl,function(xml)
	{

		loadSize(name,xml);
		slices= new Array();
		slices.push(loadSlices(xml));
		$("#debug").append("\nSLICES ARR (getting ready to load):");
		debug2dArray(slices);
		//debug2dArray(slices)
		//now load in the pie chart
		var plot1 = $.jqplot(name,[slices],
			{
				seriesDefaults:{
					renderer: $.jqplot.PieRenderer,
					rendererOptions: {
				       // Put data labels on the pie slices.
				       // By default, labels show the percentage of the slice.
				        showDataLabels: true
				       }
     		   },
				legend:{show: true, location: 'e'}
		});
	});//end get AJAX request
}



function loadSlices(xml)
{
	slices = new Array();
	$(xml).find("category").each(
		function()
		{
			$(this).find("slice").each(
				function()
				{
					slice = new Array($(this).attr("name"));
					slice.push(parseInt($(this).attr("size")));
					link = $(this).attr("link");
					if(link)slice.push(link);
					else slice.push("");
					slices.push(slice);
				}
			);
		}
	);
	return slices;
}

function loadSize(divid,xml)
{
	width = $(xml).find("size").attr("width");
	if(width) $("#"+divid).css("width",width);
	height = $(xml).find("size").attr("height");
	if(height) $("#"+divid).css("height",height);
	$("#debug").append("\nWidth: "+width+"\nHeight:"+height);
}
