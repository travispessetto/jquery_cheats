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
		var data = $(this).serialize();
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
	//start by loading the barcharts...
	$("div.barchart").each(function(){BarChart($(this).attr("id"),$(this).attr("data-xmlurl"))});
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
		//append these to the div
			$.jqplot(name,getBars(xml),{ seriesDefaults:{
	            renderer:$.jqplot.BarRenderer,
	            rendererOptions: {fillToZero: false},
	        },
	        axes: {
            // Use a category axis on the x axis and use our custom ticks.
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: getTicks(xml)
	            },
	            yaxix:
	            {
	            	min: $(xml).find("yaxis").attr("min"),
	            	max: $(xml).find("yaxix").attr("max")
	            }
            }
	        });
		});
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

function getBars(xml)
{
	//this function aims at translating the data into a 2d array for rendering
	var twoDArray = [];
	$(xml).find("category").each(
		function(){
			twoDArray.push(loadBars($(this)));
		});
	return twoDArray;
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

function loadBars(xml)
{
	var bars = [];
	$(xml).find("bar").each(
		function(){
			alert("BAR VALUE:"+$(this).attr("size"));
			bars.push($(this).attr("size"));
		});
	return bars;
}
