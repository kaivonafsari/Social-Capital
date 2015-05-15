angular.module('socialStock')

.factory('d3Factory', function($http, clientFactory) {

    var d3Factory = {};
    var portfolio;


    d3Factory.updatePie = function() {
      
      clientFactory.getPortfolio()
      .then(function(data) {
        portfolio = data.data;
        console.log('portfolio from d3 update pie', portfolio);
      }).then(function(){
        
        var MAX_ASSETS = pieColors.length - 2;
        var values = [];
        var labels = [];
        var stocks = portfolio.stocks;

        // Networth is set to equal user's current cash balance
        var netWorth = portfolio.cash_balance;

        var stockValue = 0;
        var assets = [];

        // Values & Labels array will be used by D3
        // Pushes cash balance with fixed decimel of two to the values array.
        values.push(+portfolio.cash_balance.toFixed(2));

        // Pushes relevant label to labels array
        labels.push('Cash');

        // put all the stock assets in a name/value array
        // iterates over all user's stocks and builds an object with name and stock value
        // pushes those objects into 'assets' array
        for (var i = 0; i < portfolio.stocks.length; i++) {

          // Stock value is the stock's current price x number of shares of given stock
          stockValue = stocks[i].current_price * stocks[i].shares;
          netWorth += stockValue;
          stockValue = +stockValue.toFixed(2);
          assets.push({name: stocks[i].screen_name, value: stockValue});
        }

        // sort Assets array by descending value
        assets = assets.sort(function(a, b) {
            return b.value - a.value;
        });

        //console.log('sorted assets: ', JSON.stringify(assets));
        var assetValue = 0;
        
        // Iterates over all stocks in 'assets' array, pushs their Name and Value to relevant arrays
        for (var i = 0; i < assets.length && i < MAX_ASSETS; i++) {
          values.push(assets[i].value);
          labels.push(assets[i].name);
          assetValue += assets[i].value;
        }

        var otherValue = netWorth - portfolio.cash_balance - assetValue;
        if (otherValue > 0 && assets.length > MAX_ASSETS) {
          values.push(otherValue);
          labels.push('Other');
        }
        // values.unshift(netWorth);
        // console.log('labels: ', labels, 'values: ', values);
        // console.log('pie colors: ', JSON.stringify(pieColors));
        var content = [];
        for (var i = 0; i < values.length; i++) {
          content.push({label: labels[i], value: values[i], color: pieColors[i]});
        }
        
        // D3 part
        pieConfig.data.content = content;
        // console.log('PIE DATA: ', JSON.stringify(pieConfig, null, '\t'));
        
        var pie = document.querySelector('svg');
        
        // If there is already a pie --> remove that pie from the DOM 
        if (pie) {
           console.log('old pie removed');
           pie.parentNode.removeChild(pie);
         }

        // Define and set the pie
        var pieWidth = document.body.clientWidth * .4;
        var pieHeight = pieWidth * 0.9;
        pieConfig.size.canvasHeight = pieHeight;
        pieConfig.size.canvasWidth = pieWidth
        var pie = new d3pie("pieChart", pieConfig);

      });
    };

    return d3Factory;

});