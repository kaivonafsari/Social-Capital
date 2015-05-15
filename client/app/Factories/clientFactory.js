//This is a factory shared by the dashboard and search controllers. The functions
//here will be used in both controllers' scopes.

angular.module('socialStock')

.factory('clientFactory', function($http) {

    var clientFactory = {};

    /**
     * This function makes a Twitter API request and returns the user's information (follower count, etc)
     *  @param {String} handle - Twitter handle to query
     */

    clientFactory.searchStock = function(query){
        clientFactory.getTwitterInfo(query).then(function(data){
            clientFactory.portfolio = [data.data];
            console.log('client factory portfolio:', clientFactory.portfolio);
              // $scope.searchTerm = '';
            });
    };


    clientFactory.getTwitterInfo = function(handle) {
        return $http({
                method: 'POST',
                url: '/api/twitter',
                data: {
                    twitterHandle: handle
                }
            })
            .then(function(resp) {
                var stock_id = resp.data.id;
                // getGrowthRate();
                return resp;
            });
    };

    clientFactory.getGrowthRate = function(stock_id){
        return $http({
                method: 'GET',
                dataType: 'jsonp',
                url: 'http://api.twittercounter.com/?apikey=2dc2e68f8a5190a63b2d4c8f4d8a53d8&output=jsonp&twitter_id=1367531'
        })
        .then(function(resp){
            console.log('response from twitter counter', resp);
        });
    };

    /**
     * This function returns the portfolio for the currently logged in user.
     */
    clientFactory.getPortfolio = function() {
        return $http({
                method: 'GET',
                url: '/api/portfolio'
            })
            .then(function(resp) {
                console.log("initial resp: ", resp.data)
                console.log('getPortfolio response: ', resp)
                return resp;
            });
    };

    /**
     * This function buys a specific stock.
     * @param {Object} stockInfo - stock to buy. Object properties defined in DashboardController
     */
    clientFactory.buyStock = function(stockInfo) {
        console.log(stockInfo);
        return $http({
                method: 'POST',
                url: '/api/portfolio/buy',
                data: stockInfo
            })
            .then(function(resp) {
                return resp;
            });
    };

    /**
     * This function sells a specific stock.
     * @param {Object} stockInfo - stock to sell. Object properties defined in DashboardController
     */
    clientFactory.sellStock = function(stockInfo) {
        return $http({
                method: 'POST',
                url: '/api/portfolio/sell',
                data: stockInfo
            })
            .then(function(resp) {
                return resp;
            });
    };

    clientFactory.getUserInfo = function() {
        return $http({
                method: 'GET',
                url: '/api/profileID'
            })
            .then(function(resp) {
                console.log('response from getting server', resp);
                // console.log("initial resp: ", resp.data)
                // console.log('getPortfolio response: ', resp)
                return resp;
            });
    };

    //provides access to these functions to controllers
    return clientFactory;

});
