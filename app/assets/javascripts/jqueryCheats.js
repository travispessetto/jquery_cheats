$(document).ready(function(){
	//the following are for AJAX requests of form objects
	$("select[data-onchange]").live("change",function()
	{
		$.ajax({type: "post",
		url: $(this).attr("data-url"),
		data: $(this).serialize(),
		success: function(data){eval(data);},
		dataType: "script"});
	});
	$('input[type="radio"][data-onclick]').live("change", function(){
		data = $(this).serialze();
		if($(this).attr("data-params"))
		{
			data += "&"+$(this).attr("data-params");
		}
		$.ajax({
			type: "post",
			url: eval($(this).attr("data-onclick")),
			data: data,
			success: function(data){eval(data);},
			dataType: "script"
		})
	});
	//The following Load jqPlot graphs and charts
	$("div.piechart").each(function(){
		pieChart($(this).attr("id"),$(this).attr("data-xmlurl"));
	});
	$("div.barchart").each(function(){
		barChart($(this).attr("id"),$(this).attr("data-xmlurl"));
	});
	//The following provide click-to-link capabilities in charts
	$("div.piechart").bind('jqplotDataClick',function(ev,seriesIndex,pointIndex,data){
		if(data[2] != "") window.location = data[2];
	});
	$("div.barchart").bind('jqplotDataClick',function(ev,seriesIndex,pointIndex,data){
		if(data[2] != "") window.location = data[2];
	});
});
//functions specific to barchart
function barChart(name,xmlurl)
{
	$.get(xmlurl,function(xml){
		loadBGImage(name,xml);
		establishSize(name,xml);
		$.jqplot(name,[getBars(xml)],{
		seriesDefaults:
		{
			renderer: $.jqplot.BarRenderer,
			renderOptions: 
			{
				fillToZero:true, barWidth: getBarWidth(xml)
			}
		},
		title:
		{
			text: getTitle(xml)
		},
		grid:
		{
			background: getBGColor(xml),
			gridLine: getGridLineColor(xml),
			borderColor: getGridBorderColor(xml)
		},
		axes:
		{
			xaxis:
			{
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: getTicks(xml),
				autoscale: true
			}
		}
	});
	});
}
function getBars(xml)
{
	var bars =[];
	var bar = [];
	var categoryId = 1;
	$(xml).find("category").each(function(){
		$(this).find("bar").each(function()
		{
			bar.push(categoryId);
			bar.push(parseInt($(this).attr("size")));
			var link = $(this).attr("link");
			if(link) bar.push(link); else bar.push("");
			bars.push(bar);
			bar = new Array();
		});
		categoryId++;
	});
	return bars;
}
function getBarWidth(xml)
{
	var width = $(xml).find("render").attr("barwidth");
	if(!width) return null; else return width;
}
function getTicks(xml)
{
	var ticks = [];
	$(xml).find("category").each(function(){
		ticks.push ($(this).find("tick").attr("text"));
	});
	return ticks;
}
//functions specific to piechart
function pieChart(name,xmlurl)
{
	$.get(xmlurl,function(xml)
	{
		establishSize(name,xml);
		loadBGImage(name,xml);
		$.jqplot(name,[getSlices(xml)],
		{
			seriesDefaults:
			{
				renderer: $.jqplot.PieRenderer,
				renderOptions:
				{
					showDataLabels: true
				}
			},
			legend:
			{
				show: true,
				location: 'e'
			}
		});
	});
}
function getSlices(xml)
{
	var slices = [];
	$(xml).find("category").each(function(){
		$(this).find("slice").each(function(){
				slice = new Array($(this).attr("name"));
				slice.push(parseInt($(this).attr("size")));
				var link = $(this).attr("link");
				alert(link);
				if(link) slice.push(link); else slice.push("");
				slices.push(slice);				
			});
	});
	return slices;
}
//functions that can be used by all
function loadBGImage(name,xml)
{
	var bgimage="none";
	$(xml).find("backgroundImage").each(function()
	{
		bgimage = "url('"+$(this).text()+"')";
	});
	$("div#"+name).css("background-image",bgimage);
}
function establishSize(name,xml)
{
	var $grid = $(xml).find("grid");
	$("div#"+name).css("width",$grid.find("width").text());
	$("div#"+name).css("height",$grid.find("height").text());
}
function getTitle(xml)
{
	var title = null;
	$(xml).find("title").each(function(){
		title = $(this).text();
	});
	return title;
}
function getBGColor(xml)
{
	return $(xml).find("background").text();
}
function getGridLineColor(xml)
{
	return $(xml).find("grid lineColor").text();
}
function getGridBorderColor(xml)
{
	return $(xml).find("grid borderColor").text();
}
