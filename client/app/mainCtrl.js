angular.module('socialStock')

.controller('MainCtrl', function($scope, $http, $location, clientFactory, d3Factory) {

  $scope.portfolio = {};

  $scope.load = function() {
    clientFactory.getPortfolio()
    .then(function(data) {
      $scope.portfolio = data.data;
      console.log('portfolio', $scope.portfolio)
      $scope.networth = 0;
      $scope.networth += $scope.portfolio.cash_balance;
      
      for (var i = 0; i < data.data.stocks.length; i++) {
        $scope.networth += data.data.stocks[i].current_price * data.data.stocks[i].shares;
      }
      
    })
    .then(function(){
      console.log('updating pie');
      // d3Factory.updatePie($scope.portfolio);
    });
  }
  $scope.load();

  $scope.search = function(handle){
    clientFactory.searchStock(handle);
    $location.path('/searchresult');
  };

  $scope.getUser = function(){
    clientFactory.getUserInfo().then(function(data){
      $scope.user = data.data;
      console.log('scope user', $scope.user);
    });
  };
  $scope.getUser();


});
