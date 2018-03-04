/*
	Get all michelin starred restaurants: name, zipcode and nbStars

 */
var fs = require('fs');
request = require('request');
cheerio = require('cheerio');

function scrapePage () {

 for (i = 1; i<35; i++){
	var pageURL = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin'.concat('/page-',i);
	//make an HTTP request for the page to be scraped
	request(pageURL, function (err, res, responsehtml) {
	  if (!err && res.statusCode == 200) {
	  		//create the cheerio object
	        var $ = cheerio.load(responsehtml);
		    restaurantsByPage = $('div[attr-gtm-type="poi"]');
		    hrefByPage = $('a[class="poi-card-link"]');
		    for (j = 0; j < restaurantsByPage.length; j++) { 
				    var href = hrefByPage[j].attribs['href'];
				    var pageURL2 = 'https://restaurant.michelin.fr'.concat(href);
				    request(pageURL2, function (err, res, responsehtml) {
						  if (!err && res.statusCode == 200) {
						  		//create the cheerio object
						        var cv      = cheerio.load(responsehtml);

						        //write isolated sections of the entire scraped page to the local file system

						    	var name    = cv('.poi_intro-display-title').text();
						    	var nbstars = cv('.michelin-poi-distinctions-list .content-wrapper').text().charAt(0);
						    	name = name.substr(7, name.length - 5);
						    	var codeZip = cv('.addressfield-container-inline .postal-code').first().text();
								var jsonText= '{' + '"name" : ' + '"' +name+ '",' + ' "zip" : "' +codeZip+ '", ' + '"nbStars" : ' + '"' + nbstars + '"},\n';
								//write the header to the local file system
                                fs.appendFile('AllStarredMichelinRestaurants.json', jsonText);
							    
						  }
						});	
			}		
	  }	    
	});
 }
}

//scrape the page
scrapePage();
  