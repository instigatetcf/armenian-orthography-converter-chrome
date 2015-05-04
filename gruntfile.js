module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');

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
        },
        dev: {
            files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/armenian-orthography-converter/src/',
                    src: ['mashtots.js', 'mashtots-dom.js'],
                    dest: 'dest/'
                }
            ]
        }
    };

    var compress = {
        main: {
            options: {
                archive: 'mashtots.zip'
            },
            files: [
                {
                    expand: true,
                    cwd: 'dest/',
                    src: ['**'],
                    dest: ''
                }
            ]
        }
    };

    var replace = {
        main: {
            options: {
                patterns: [
                    {
                        match: 'files',
                        replacement: '"mashtots.min.js"'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    src: ['dest/manifest.json'],
                    dest: ''
                }
            ]
        },
        dev: {
            options: {
                patterns: [
                    {
                        match: 'files',
                        replacement: '"mashtots.js", "mashtots-dom.js"'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    src: ['dest/manifest.json'],
                    dest: ''
                }
            ]
        }
    };

    var clean = {
        dest: "dest/"
    }

    grunt.initConfig({
        copy: copy,
        compress: compress,
        replace: replace,
        clean: clean
    });

    grunt.registerTask('build', ['clean:dest', 'copy:main', 'replace:main', 'compress:main']);
    grunt.registerTask('build-dev', ['clean:dest', 'copy:dev', 'replace:dev', 'compress:main']);
};
