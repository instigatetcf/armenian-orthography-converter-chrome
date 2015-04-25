module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');

    var copy = {
        main: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/armenian-orthography-converter/dest/',
                    src: ['mashtots.min.js'],
                    dest: 'dest/'
                }
            ]
        }
    };

    grunt.initConfig({
        copy: copy
    });

    grunt.registerTask('build', 'copy:main');
};
