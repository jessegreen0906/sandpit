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
        includes:{
            files:{
	            cwd: 'template',
	            src:['test.html'],
	            dest: 'template/temp/',
	            options:{
		            template: 'template.html',
	            },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-includes');

    grunt.registerTask('default', ['less','includes']);
};