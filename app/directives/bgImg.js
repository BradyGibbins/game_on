app.directive('bgImg', function(){
	return function(scope, elem, attrs){
		var url = attrs.bgImg;
		elem.css({
			background:'url('+url+')',
			'background-size':'cover',
			'background-repeat':'no-repeat',
			'background-position':'center'
		});
	};
});