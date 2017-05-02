/**
 * Created by jesse on 5/04/2017.
 */
// var Slackbot = require('slackbots');
//
// console.log('slackbot starting');
// var bot = new Slackbot({
// 	token:'xoxb-164806226039-rHMIOVUzOpVKPjI58U4EnfdW',
// 	name: 'catfan'
// });
//
// bot.on('start', function () {
// 	console.log('Sending start message');
// 	bot.postMessageToChannel('general', 'start');
// });
//
// bot.on('message', function(data) {
// 	console.log('new message');
// 	console.log(data);
// 	if (data.type!='hello'&&data.type!='reconnect_url'&&data.username!='catfan') {
// 		bot.postMessageToChannel('general', 'message');
// 	}
// });
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
	var regEx = /.*cat.*/;
	if(regEx.test(message.text)) {
		bot.reply(message, 'Is this a cat picture');
		var response = selectResponse();
		response.channels = message.channel;
		response.token = bot.config.token;
		request.post({
			url: 'https://slack.com/api/files.upload',
			formData: {
				token: response.token,
				title: 'title',
				file: response.file,
				filename: response.filename,
				filetype: response.filetype,
				text: response.text,
				channels: response.channels
			}
		}, function (err, response) {
			if(err) {
				console.log(JSON.parse(err.body));
			} else {
				console.log(JSON.parse(response.body));
			}
		});

		// bot.api.files.upload(response);
		// bot.reply(message, response);
	}
	bot.reply(message, 'Someone shared a file');
});

function selectResponse() {
	var response = {};
	var filepath = './images/deadCat.jpeg';
	response.file = fs.createReadStream(filepath, 'binary');
	response.filename = 'deadCat.jpeg';
	response.filetype = 'text';
	response.text = 'Cats? I love cats. Here\'s a picture for you';

	return response;
}