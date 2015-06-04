'use strict';
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var fs = require('fs');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'www',
        dist: 'dist/www',
        doc: 'doc'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
			
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer'],
                require: 'bootsrap-sass-official'
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css',
                       '<%= yeoman.app %>/styles/images'],
                tasks: ['autoprefixer']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
                    '<%= yeoman.app %>/scripts/**/*.js',
                    '<%= yeoman.app %>/resources/**/*',
                    '<%= yeoman.app %>/styles/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
					['<%= yeoman.app %>/scripts/*.ts']
                ]
            },
            //            karma: {
            //                files: ['app/scripts/**/*.js', 'test/unit/**/*.js'],
            //                tasks: ['karma:unit:run']
            //            },
            dist: {
                files: ['<%= yeoman.dist %>/**/*'],
                tasks: []
            }
            //            ,
            //            doc: {
            //                files: ['{.tmp,<%= yeoman.app %>}/scripts/**/*.js'],
            //                tasks: ['docular', 'open:doc']
            //}
        },
		
		// Compile Typescript
        ts: {
          default : {
            src: ["'<%= yeoman.app %>/**/*.ts","<%= yeoman.app %>/*.ts", "!node_modules/**/*.ts"],
            watch: '<%= yeoman.app %>',
            out: "<%= yeoman.app %>/main.min.js"
              
          }
        },
         typescript: {
            base: {
            src: ['<%= yeoman.app %>/scripts/**/*.ts'],
            dest: '<%= yeoman.app %>/scripts/',
            options: { declaration: false, sourceMap: false, module: 'commonjs', target: 'es5', basePath: '<%= yeoman.app %>/scripts/', }
          }
        },
		
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        connect: {
            options: {
                protocol: 'http',
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            server: {
                proxies: [
            ]
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [

                            function (request, response, next) {
                                if (request.url.indexOf('/api') !== -1) {
                                    setTimeout(function () {
                                        next();
                                    }, 1000);
                                } else {
                                    next();
                                }
                            },
                            lrSnippet,
                            proxySnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app),
                            function (request, response, next) {
                                console.log("request method: " + JSON.stringify(request.method));
                                var rawpath = request.url.split('?')[0];
                                console.log("request url: " + JSON.stringify(request.url));
                                var path = require('path').resolve(__dirname, 'app/' + rawpath);
                                console.log("request path : " + JSON.stringify(path));
                                console.log("request current dir : " + JSON.stringify(__dirname));
                                if ((request.method === 'PUT' || request.method === 'POST')) {
                                    console.log('inside put/post');
                                    request.content = '';
                                    request.addListener("data", function (chunk) {
                                        request.content += chunk;
                                    });
                                    request.addListener("end", function () {
                                        console.log("request content: " + JSON.stringify(request.content));
                                        if (fs.existsSync(path)) {
                                            fs.writeFile(path, request.content, function (err) {
                                                if (err) {
                                                    throw err;
                                                }
                                                console.log('file saved');
                                                response.end('file was saved');
                                            });
                                            return;
                                        }

                                        if (request.url === '/log') {
                                            var filePath = 'server/log/server.log';
                                            var logData = JSON.parse(request.content);
                                            fs.appendFile(filePath, logData.logUrl + '\n' + logData.logMessage + '\n', function (err) {
                                                if (err) {
                                                    throw err;
                                                }
                                                console.log('log saved');
                                                response.end('log was saved');
                                            });
                                            return;
                                        }
                                    });
                                    return;
                                }
                                next();
                            }
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app),
                            mountFolder(connect, 'test')];
                    }
                }
            },
            dist: {
                options: {
                    port: 9002,
                    middleware: function (connect) {
                        return [mountFolder(connect, yeomanConfig.dist)];
                    }
                }
            },
            doc: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [mountFolder(connect, yeomanConfig.doc)];
                    }
                }
            }
        },
        open: {
            server: {
                url: '<%= connect.options.protocol %>://<%= connect.options.hostname %>:<%= connect.options.port %>'
            },
            doc: {
                url: '<%= connect.options.protocol %>://<%= connect.options.hostname %>:<%= connect.doc.options.port %>'
            },
            dist: {
                url: '<%= connect.options.protocol %>://<%= connect.options.hostname %>:<%= connect.dist.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: 'www/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/styles/images',
                httpGeneratedImagesPath: '/styles/images/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {
                options: {
                    debugInfo: false
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        uglify: {
            dist: {
                files: {
					
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/*.js',
                        '<%= yeoman.dist %>/styles/*.css',
                        '<%= yeoman.dist %>/styles/images/*.{png,gif,jpg,jpeg}'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    steps: {
                        js: ['concat', 'uglifyjs'],
                        css: ['cssmin']
                    },
                    post: {}
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/views/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/scripts/**', '<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/styles/images']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                   cwd: '<%= yeoman.app %>/styles/images',
                    src: '**/*.{jpg,jpeg,svg,gif,png}',
                    dest: '<%= yeoman.dist %>/styles/images'
                 },{
                     expand: true,
                    cwd: '<%= yeoman.app %>/images',
                     src: '**/*.{jpg,jpeg,svg,gif,png}',
                     dest: '<%= yeoman.dist %>/images'
                 }]
            }
         },
        tinypng: {
            options: {
                apiKey: "l_QIDgceoKGF8PBNRr3cmYy_Nhfa9F1p",
                checkSigs: true,
                sigFile: '<%= yeoman.dist %>/styles/images/tinypng_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: false
            },
            dist: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles/images',
                src: '**/*.png',
                dest: '<%= yeoman.dist %>/styles/images'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/**/*.*'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt,html}',
                        '.htaccess',
                        'resources/**',
						'fonts/**',
                        'views/**/*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>styles/images',
                    src: [
                        'generated/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>/bower_components/angular-i18n',
                    dest: '<%= yeoman.dist %>/resources/i18n/angular',
                    src: ['angular-locale_en-us.js'
                    ]
                }
				, {
                    expand: true,
                    cwd: '<%= yeoman.app %>/bower_components/jquery-ui/themes/smoothness/images',
                    dest: '<%= yeoman.dist %>/styles/images',
                    src: [
                        '*'
                    ]
                }
                , {
                    expand: true,
                    cwd: 'config',
                    dest: 'dist/config',
                    src: [
                        '*'
                    ]
                }
                , {
                    expand: true,
                    cwd: 'assets',
                    dest: 'dist/assets',
                    src: [
                        '*'
                    ]
                }
                ]
            },
            i18n: {
                expand: true,
                cwd: '<%= yeoman.app %>/bower_components/angular-i18n',
                src: ['angular-locale_en-us.js'],
                dest: '.tmp/resources/i18n/angular'
            },
            png: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles/images',
                src: ['**/*.png'],
                dest: '<%= yeoman.dist %>/styles/images'
            },
			img: {
				expand: true,
                cwd: '<%= yeoman.app %>/styles/images',
                src: ['**/*.png'],
                dest: '<%= yeoman.dist %>/styles/images'
			}
        },
        concurrent: {
            server: [
                'compass:server',
                'copy:i18n'
            ],
            test: [
                'compass',
                'copy:i18n'
            ],
            dist: [
                'imagemin',
                'copy:png',
				'copy:img'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-docular');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'configureProxies:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
	    'typescript',
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('devmode', [
        'karma:unit',
        'watch:karma'
    ]);

    grunt.registerTask('watchCss', [
        'compass:server',
  'watch'
    ]);

    grunt.registerTask('doc', [
        'docular',
        'connect:doc',
        'open:doc',
        'watch:doc'
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
		//'typescript',
        'compass:dist',
        'autoprefixer',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        //'tinypng',
        'concurrent:dist',
        'copy:dist',
        'rev',
        'cdnify',
        'usemin',
        'htmlmin'

    ]);

    grunt.registerTask('default', [
        'server'
    ]);
	
	grunt.registerTask("ts", ["ts"]);
};