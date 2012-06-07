$(document).ready(function(){
	//make select boxes ajax-compatible by adding two params data-onchange=true and data-url="/path/to"
	$('select[data-onchange]').live("change",function(){
	   $.ajax({type: "post",
	         url: $(this).attr("data-url"),
	         data: $(this).serialize(),
	         success: function(data){eval(data);},
	         dataType: "script"});
	});
});