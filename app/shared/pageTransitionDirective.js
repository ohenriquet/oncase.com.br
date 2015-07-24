(function(){

	angular.module("pageTransitionDirective",[]).

	directive('pageTransition',['$rootScope',function($rootScope){
	    return {
	      restrict: 'A',
	      link: function (scope, elm, attrs) {

		      scope.isRouteLoading = false;

		      $rootScope.$on('$routeChangeStart', function(){
		        scope.isRouteLoading = true;
		        console.log("Page Loading");
		      });

		      $rootScope.$on('$routeChangeSuccess', function(){
		        scope.isRouteLoading = false;
		        console.log("Page Loaded!!!!!");
		      });

	      }
    	};

	}]);
})();