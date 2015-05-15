angular.module('socialStock')

.controller('SearchResultCtrl', function($scope, $http, clientFactory) {
  
  $scope.obj = {};

  $scope.obj = clientFactory;
});
