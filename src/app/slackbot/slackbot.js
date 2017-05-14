//Catfan slackbot

const fs = require('fs');
var Botkit = require('botkit');
var request = require('request');

var controller = Botkit.slackbot({
	debug: true
});
var bot = controller.spawn({
	token:'xoxb-164806226039-rHMIOVUzOpVKPjI58U4EnfdW'
}).startRTM();

controller.on('ambient', function(bot, message){
	console.log('J-debug: Handling message');
	if(message.type == 'message') {
		bot.reply(message, 'Yo returned');
	} else {
		console.log('J-Debug: No yo message');
	}

});

controller.on('file_share', function (bot, message) {
	console.log('J-debug: file shared function firing');
	var regEx = /.*[Cc][Aa][Tt].*/;
	if(regEx.test(message.text)) {
		bot.reply(message, 'Is this a cat picture? I love cats. I\'ll give you one back');
		var response = selectResponse();
		bot.reply(message, response);
	}
});

function selectResponse() {
	var response = {};
	response.username = "catfan";
	var selector = Math.floor(Math.random() * 5);
	var url = [
		"http://cdn.ebaumsworld.com/mediaFiles/picture/635984/80880181.jpg",
		"https://i.ytimg.com/vi/7UyXLgr5f88/maxresdefault.jpg",
		"http://media.boreme.com/post_media/2009/dead-cat.jpg",
		"http://s2.quickmeme.com/img/fa/faa8ec8d871ce82131b9f1bf0c8d07dccba3277a66b40231d64db9b97315f511.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPuv8p5-GBssceHMxgJyHmyUQnVtpzNvcPb1MyuUy2ilHBUEzlw"
	];
	var msg = [
		"The most useful sort of cat... a rug",
		"This is the best looking cat imaginable",
		"The best pose a cat can be in",
		"The cutest cat possible",
		"Some wisdom about cats"
	];
	
	response.attachments = [
		{
			"image_url": url[selector],
			'text': msg[selector]
		}
	];

	return response;
}