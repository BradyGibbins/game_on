app.directive('reviewSummary', function(){
	return{
		templateUrl:'app/directives/reviewSummary.html',
		replace:true,
		scope:{
			review:'='
		}
	};
});