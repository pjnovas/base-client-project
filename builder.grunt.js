module.exports = function(grunt) {

  grunt.registerMultiTask('builder', 'Builds app for CommonJS modules using WebMake.', function() {
    var done = this.async()
      , fs = require('fs') 
      , webmake = require('webmake')
      , src = this.files[0].src
      , dest = this.files[0].dest;
    
    function checkErr(err, from){
      if (err) {
        grunt.log.error(err);
        grunt.fail.warn(from);
      }
    }

    webmake(src, function (err, content) {
      checkErr(err, 'Fail from WebMake');

      fs.writeFile(dest, content, function(err) {
        checkErr(err, 'Fail from FileSystem');

        grunt.log.writeln("App Modules created successfully!");
        done();
      }); 
    });
  });
  
};