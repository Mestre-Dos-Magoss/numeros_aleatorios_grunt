module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        less:{
            development:{
                files:{
                    "dev/style/main.css" : "src/style/main.less"
                }
            },
            production:{
                options:{
                    compress:true
                },
                files:{
                    "dist/style/main.min.css" : "src/style/main.less"
                }
            }
        },
        watch:{
            less:{
                files:["src/style/**/*.less"],
                tasks:["less:development"]
            },
            html:{
                files:["src/index.html"],
                tasks:["replace:dev"]
            }
        },
        replace:{ //ele substitui o arquivo e envia para outra pasta
            dev:{  //nome da minha tarefa, aqui no caso está relacionado a pasta do arquivo
                options:{
                    patterns:[ //aqui é onde fica a descrição do que deve ser feito e injetado no arquivo;
                        {      //@@
                            match:"ENDEREÇO_DO_CSS",//nome da descrição,que também será usado com referência para ele injetar o endereço
                            replacement:"./style/main.css" // O link que ele injetará
                        },
                        {
                            match:"ENDEREÇO_DO_JS",
                            replacement:"../src/script/main.js"
                        }
                    ]
                },
                files:[
                {
                    expand:true,
                    flatten:true,
                    src:["src/index.html"],
                    dest:"dev/"
                }
              ]
            },
            dist:{  //nome da minha tarefa, aqui no caso está relacionado a pasta do arquivo
                options:{
                    patterns:[ //aqui é onde fica a descrição do que deve ser feito e injetado no arquivo;
                        {      //@@
                            match:"ENDEREÇO_DO_CSS",//nome da descrição,que também será usado com referência para ele injetar o endereço
                            replacement:"./style/main.min.css" // O link que ele injetará
                        },
                        {
                            match:"ENDEREÇO_DO_JS",
                            replacement:"dist/script/main.min.js"
                        }
                    ]
                },
                files:[
                {
                    expand:true,
                    flatten:true,
                    src:["prebuild/index.html"],
                    dest:"dist/"
                }
              ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },                
                files:{
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean:{
            prebuild:["prebuild/"]
        },
        uglify:{
            target:{
                files:{
                    "./dist/script/main.min.js" :" src/script/main.js"
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default",["watch"]);
    grunt.registerTask("build",["less:production","htmlmin:dist","replace:dist","clean","uglify:target"]);
} 










    // grunt.loadNpmTasks("grunt-contrib-sass");
    // grunt.loadNpmTasks("grunt-concurrent");
       // sass:{
        //     dist:{
        //         options:{
        //             style:"compressed"
        //         },
        //         files:{
        //             "main2.css":"main.scss"
        //         }
        //     }
        // },
        // concurrent:{
        //      target: ["fale","ouça","less","sass"]
             
        // }    
        // grunt.registerTask("fale",function(){
    //     const expect = this.async()
    //     setTimeout(function(){
    //         console.log("iiiihhhrrraaaaaaaaa");
    //         expect();
    //     },3000)
        
    // })

    // grunt.registerTask("ouça",function(){
    //      console.log("iiaahhuuuu");
    // })