module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var version = "";

    grunt.initConfig({
        connect: {
            demo: {
                options: {base: 'src'}
            }
        },
        assemble: {
            options: {
                layoutdir: 'src/docs/layout',
                partials: ['src/docs/includes/**/*.hbs']
            },
            watch: {
                expand: true,
                cwd: 'src/docs/page',
                src: ['**/*.hbs'],
                dest: '<%= connect.demo.options.base %>'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src' + version + '/css-edit/',
                src: ['*.css', '!*.min.css'],
                dest: 'src/' + version + '/css/',
                ext: '.css'
            }
        },
        uglify: {
            options: {
                banner: '/*!  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss Z") %> */\n',
                mangle: false
            },
            min: {
                expand: true,
                cwd: 'src' + version + '/js-edit/',
                src: ['**/*.js'],
                dest: 'src' + version + '/js/'
            }
        },
        watch: {
            assemble: {
                files: ['src/docs/**/*.hbs'],
                tasks: 'assemble'
            },
            cssmin: {
                files: ['src' + version + '/css-edit/*.css'],
                tasks: ['cssmin']
            },
            uglify: {
                files: ['src' + version + '/js-edit/*.js'],
                tasks: ['uglify']
            }
        }
    });
    grunt.registerTask('default', ['connect', 'watch']);
    // plug in
    var taskName;
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }
    grunt.loadNpmTasks('assemble');
};