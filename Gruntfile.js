module.exports = function(grunt) {

    grunt.initConfig({
       less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/css/',
                    src: ['**/*.less'],
                    dest: 'src/assets/css/',
                    ext: '.css'

                },
				]
            },
       },
		htmlbuild: {
			dist: {
				expand: true,
				cwd: 'src/',
				src: 'content/**/*.html',
				dest: 'build/',
				options: {
					sections: {
						template: {
							header: 'partials/header.tmp.html',
							footer: 'partials/footer.tmp.html'
						}
					},
					styles: {
						template: ['build/assets/css/global/style.css'],
					},
					scripts: {
						template: ['build/assets/js/jquery-3.1.0.js']
					}
				}
			}
		},
	    copy: {
		    main: {
			    files: [
				    {expand: true, cwd: 'src/', src: ['assets/**/*'], dest: 'build/'},
				    
			    ]
		    }
	    }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['less','htmlbuild','copy']);
};