const path = require('path');
module.exports = {
	entry: {
		upskill: "./build/rawJs/content/react-upskill/control.js",
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'build/content/react-upskill/app-bundle.js')
	},
	module: {
		rules: [
		],
	}
};
