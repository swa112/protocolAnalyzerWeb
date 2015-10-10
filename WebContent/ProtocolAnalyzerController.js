var protocolApp = angular.module('protocolApp', ['ngResource']);

protocolApp.factory('AnalyzerResource', function($resource){
	return  $resource('http://localhost\\:8081/protocal-analyzer/stream-analyzer');
});

protocolApp.controller('AnalyzerController', ['$scope', 'AnalyzerResource', function($scope, AnalyzerResource){
	$scope.url = "";
	$scope.isDisplayTable = false;
	$scope.errorList = [];
	$scope.sortField= '$index';
	$scope.reverse = false;
	$scope.isAnalyzeTS = 'N';
	$scope.isLoading = false;
	
	$scope.analyze = function(){
		//alert($scope.isAnalyzeTS);
		$scope.isLoading = true;
		$scope.isDisplayTable = false;
		$scope.errors = AnalyzerResource.query({url:$scope.url, analyzeTS:$scope.isAnalyzeTS}, function(){			
			$scope.isLoading = false;
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
	
	$scope.isNoInput = function(){
		if(angular.isDefined($scope.url)){
			return $scope.url.length === 0;
		}
		return false;
	}

}]);

