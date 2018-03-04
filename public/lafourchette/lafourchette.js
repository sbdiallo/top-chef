

var fs = require('fs');
request = require('request');
cheerio = require('cheerio');


var Reader = require('readline').createInterface({
  input: require('fs').createReadStream('id-lafourchette.txt')
});


//We parse all the id's of our lafourchette - michelin restaurants to get all their current deals if exist.
Reader.on('line', function (line) {
	
	var pageURL = 'https://m.lafourchette.com/api/restaurant/'.concat(line)+'/sale-type';
	getDeals(pageURL, line);

});

//get all the deals
function getDeals(pageURL, id) {

    request(pageURL, function (error, response, html) {

        if (!error && response.statusCode === 200) {
			var deals = []
            var Arr = JSON.parse(response.body)
            for(j = 0; j < Arr.length; j++) {
                if (Arr[j].is_special_offer) {
                    deals.push(Arr[j])
                }
            }        
            if (deals.length > 0){
           			
	            fs.appendFile('./dealsLafourchette.json',
	                '{ "id_restaurant": "'
	                + id + '"'
	                + ', "deals": '
	                + JSON.stringify(deals)
	                + '},\n')               
            }

        } else {
            console.log("error" + pageURL);
        }
    })
}



