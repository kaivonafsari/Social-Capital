angular.module('socialStock')

.controller('SearchResultCtrl', function($scope, $http, $location, clientFactory) {
  
  $scope.obj = {};

  $scope.obj = clientFactory;

  $scope.buyStock = function(shares){
    var date = new Date();
    var purchase = {
      "screen_name": "@" + $scope.obj.searchResult[0].screen_name,
      "image_url": $scope.obj.searchResult[0].image_url,
      "name": $scope.obj.searchResult[0].name,
      "follower_count_at_purchase": $scope.obj.searchResult[0].follower_count_at_query_time,
      "price_at_purchase": $scope.obj.searchResult[0].price_at_purchase,
      "date_of_purchase": date.toString(),
      "shares": +shares
    };
    clientFactory.buyStock(purchase).then(function(data){
      console.log("Data received from portfolio controller to search.js: ", data)
        if(data.data === "Overdraft! You cannot buy this stock!") {
          alert("Overdraft! You cannot buy this stock!");
        }
        if(data.data === "In this version, you cannot buy the same stock twice. Try again.") {
          alert("In this version, you cannot buy the same stock twice. Try again.");
        }
        $scope.load();
        $location.path('/portfolio');
    });
  }

});
