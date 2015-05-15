angular.module('socialStock')

.controller('DashCtrl', function($scope, $http, clientFactory, d3Factory) {
  console.log("inside DashCtrl!");
  $scope.name = 'Yo yo yo';

  $scope.obj = {};

  $scope.obj = clientFactory;


  // $scope.portfolio = clientFactory.
  d3Factory.updatePie();

  // console.log('scope portfolio from within the dashboard ctrl', $scope.portfolio);

});
