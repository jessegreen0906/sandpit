/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

console.log('test suite running');

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/../phantomcss/phantomcss.js' );
var phantomcss = require( path );
var server = require('webserver').create();
var conf = require(fs.workingDirectory + '/../jdev_foundational/testing_configs/phantomcss.conf');

var html = fs.read( fs.absolute( fs.workingDirectory + '/../../build/content/modulo-css/modulo-css.html' ));

server.listen(5555,function(req,res){
	res.statusCode = 200;
	res.headers = {
		'Cache': 'no-cache',
		'Content-Type': 'text/html;charset=utf-8'
	};
	res.write(html);
	res.close();
});
console.log(conf);
console.log(conf.args);
phantomcss.init({
	rebase: casper.cli.get('rebase'),
	
	screenshotRoot: '../../test/visual-tests/screenshots/baseline',
	failedComparisonsRoot: '../../test/visual-tests/screenshots/failures',
	comparisonResultRoot: '../../test/visual-tests/screenshots/baseline',
	
	addIteratorToImage: false,
	cleanupComparisonImages: true,
	
	failOnCaptureError: false
});
casper.test.begin( 'Demo test', function ( test ) {
	
	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );
	
	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );
	
	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	/*
		The test scenario
	*/
	
	casper.start( 'http://localhost:5555' );
	
	casper.viewport( 1024, 768 );
	
	casper.then( function () {
		phantomcss.screenshot( 'html', 'open coffee machine button' );
	} );
	
	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	} );
	
	/*
	Casper runs tests
	*/
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );