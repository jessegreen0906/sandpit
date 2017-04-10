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

var Botkit = require('botkit');

var controller = Botkit.slackbot({
	debug: true
});
var bot = controller.spawn({
	token:'xoxb-164806226039-rHMIOVUzOpVKPjI58U4EnfdW'
}).startRTM();

controller.on('message_received', function(bot, message){
	bot.reply(message, 'Yo returned');

});

controller.on('file_shared', function (bot, message) {
	bot.reply(message, 'Someone shared a file');
});

controller.on('file_created', function (bot, message) {
	bot.reply(message, 'Someone created a file');
});
