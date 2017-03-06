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
						template: ['build/assets/css/template/css/style.css'],
						form: ['build/assets/css/form-template/css/style.css'],
					},
					scripts: {
						template: ['src/template/js/jquery-3.1.0.js']
					}
				}
			}
		},
	    copy: {
		    main: {
			    files: [
				    {expand: true, cwd: 'src/', src: ['**/img/*'], dest: 'build/assets/img/'},
				    {expand: true, cwd: 'src/', src: ['**/css/*.css'], dest: 'build/assets/css/'},
				    
			    ]
		    }
	    }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['less','htmlbuild', 'copy']);
};