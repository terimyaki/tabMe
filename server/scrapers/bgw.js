'use strict';
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var cheerio = require('cheerio');

var scrapeBGW = function(type, key, link, htmlText){
	var $ = cheerio.load(htmlText);
	var strikePrice = $('.msrp .price').first().text();
	var currentPrice = $('.regular-price .price').first().text();
	var availability = $('.availability').first().text().trim();
	var name = $('.product-name h1').text();
	var url = $('link').filter(function(i,el){
			return $(this).attr('rel') === 'canonical';
		}).first().attr('href');
	if(url === undefined) url = link;

	return {
		type : type,
		key : key,
		linkInfo : {
			scrapeDate : Date.now(),
			name : name,
			currentPrice : currentPrice,
			strikePrice : strikePrice,
			availability : availability,
			url : url
		}
	};
};

var pathParser = function(pathname){
	return pathname.split('/').pop().split('.').shift();
};

module.exports = {
	pathParser : pathParser,
	scraper : scrapeBGW
};