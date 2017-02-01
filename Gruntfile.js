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

                }],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less']);
};