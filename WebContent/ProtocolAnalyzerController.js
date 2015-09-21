var protocolApp = angular.module('protocolApp', ['ngResource']);

protocolApp.factory('AnalyzerResource', function($resource){
	return  $resource('http://localhost\\:8081/protocol-analyzer/stream-analyzer');
});

protocolApp.controller('AnalyzerController', ['$scope', 'AnalyzerResource', function($scope, AnalyzerResource){
	$scope.url = "";
	$scope.isDisplayTable = false;
	$scope.errors = [];
	$scope.sortField= undefined;
	$scope.reverse = false;
	
	$scope.analyze = function(){
		//alert($scope.url);
		$scope.errors = AnalyzerResource.query({url:$scope.url}, function(){
			$scope.isDisplayTable = true;
		});
	};
	
	$scope.sort = function(fieldName){
		if($scope.sortFiled === fieldName){
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.sortField = fieldName;
			$scope.reverse = false; 
		}
	};
	
	$scope.isSortDown = function(fieldName){
		return $scope.sortField === fieldName && !$scope.reverse;
	};
	

}]);

