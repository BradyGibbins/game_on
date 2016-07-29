app.directive('platformInfo', function(){
	return {
		templateUrl:'app/directives/platformInfo.html',
		replace:true,
		scope:{
			platform:'=',
		}
	};
});