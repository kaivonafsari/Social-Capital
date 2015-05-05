//This is a factory shared by the dashboard and search controllers. The functions
//here will be used in both controllers' scopes.

angular.module('socialStock.factory', [])

	.factory('clientFactory', function($http){


		//gets portfolio for currently logged-in user
		var getPortfolio = function () {
		    return $http({
		      method: 'GET',
		      url: '/api/portfolio'
		    })
		    .then(function (resp) {
		      return resp.data;
		    });
		  };

		//gets Twitter stats for a specific handle; 
		var getTwitterInfo = function (handle) {
		    return $http({
		      method: 'POST',
		      url: '/api/twitter',
		      data: handle
		    })
		    .then(function (resp) {
		      return resp.data;
		    });
		  };


		return {
			getPortfolio: getPortfolio,
			getTwitterInfo: getTwitterInfo
		}


	})