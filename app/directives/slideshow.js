app.directive('slideshow', function(){
	return{
		templateUrl:'app/directives/slideshow.html',
		replace:true,
		scope:{
			slides:'='
		}
	};
});