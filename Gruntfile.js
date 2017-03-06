module.exports = function(grunt) {

    grunt.initConfig({
       less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'template',
                    src: ['css/*.less'],
                    dest: 'template',
                    ext: '.css'

                },
                {
                    expand: true,
                    cwd: 'modulo-css',
                    src: ['css/*.less'],
                    dest: 'modulo-css',
                    ext: '.css'

                },
                {
                    expand: true,
                    cwd: 'form-template',
                    src: ['css/*.less'],
                    dest: 'form-template',
                    ext: '.css'
                }],
            },
       },
		htmlbuild: {
			dist: {
				src: 'src/**/*.html',
				dest: 'build/',
				options: {
					sections: {
						template: {
							header: 'partials/header.tmp.html',
							footer: 'partials/footer.tmp.html'
						}
					},
					styles: {
						template: ['src/template/css/style.css'],
						form: ['src/form-template/css/style.css']
					},
					scripts: {
						template: ['src/template/js/jquery-3.1.0.js']
					}
				}
			}
		},
	    pagedetails: {
		    default: {
			    src: 'src/*',
			    files: [{
				    src: 'src/*',
			    }]
		    }
		},
    });

    grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-html-build');

	// grunt.task.registerMultiTask('pagedetails', 'Updates information of the header/footer template files to reflect page specific details', function() {
	// 	grunt.log.writeln('Running"page-details"');
	// 	grunt.config.requires(this.src);
	// 	console.log(this.data.src);
	// 	var a = grunt.file.expand(this.data.src);
	// 	a.forEach(function (file) {
	// 		grunt.log.writeln(file);
	// 		file.write()
	// 	});
	// });
    grunt.registerTask('default', ['less','htmlbuild']);
};