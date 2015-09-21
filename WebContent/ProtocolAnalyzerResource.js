angular.module('resource', ['ngResource'])
.factory('AnalyzerResource', function($resource){
	return  $resource('http://localhost\\:8080/protocol-analyzer/stream-analyzer/:url')
});