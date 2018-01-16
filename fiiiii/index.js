const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;
const fileUpload = require('express-fileupload');
const path = require('path');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable = require('formidable');
const async = require('async');
const repout = require('shelljs');
const spawn = require('child_process').spawn;

app.use(express.static('public'));

app.set("view engine", "pug"); 
app.set("views", path.join(__dirname, "views"));

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
      if(err){
        console.log("error renaming file!");
      }
     });
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req)
});

function checkErrorAndEmit(outputted_error, whichRoom_error, eventualLibs) {
  if ((outputted_error.toString()).indexOf("struct.error: unpack requires a bytes object of length 16") > -1) {
    io.to(whichRoom_error).emit('catched_error_happenned', {which_error: "Incorrect .ico file."});

  } else if ((outputted_error.toString()).indexOf("SyntaxError: Missing parentheses in call to 'print'") > -1) {
    io.to(whichRoom_error).emit('catched_error_happenned', {which_error: "You uploaded a Python 2.* script. Only Python 3.* is supported at the moment."});

  } else if ((outputted_error.toString()).indexOf("No matching distribution found for") > -1) {
    io.to(whichRoom_error).emit('catched_error_happenned', {which_error: "pip can't find one of these library(s): " + eventualLibs});

  } else if ((outputted_error.toString()).indexOf("SyntaxError:") > -1) {
    io.to(whichRoom_error).emit('catched_error_happenned', {which_error: "There's an error in your .py file. Please make sure it runs correctly before trying to convert it."});

  } else if ((outputted_error.toString()).indexOf("IndentationError:") > -1) {
    io.to(whichRoom_error).emit('catched_error_happenned', {which_error: "You must indent your python script with 4 whitespaces"});

  } else {
    io.to(whichRoom_error).emit('error_happenned');
  }
}

resourcepathfunction = `
import os
def resource_path(relative):
    if hasattr(sys, "_MEIPASS"):
        return os.path.join(sys._MEIPASS, relative)
    return os.path.join(relative)
`

/* THIS IS THE CODE THAT FIRES ONCE A PY FILE HAS BEEN UPLOADED successfully */
io.on('connection', function(client) {
  client.on('convertstart', function(data) {
    var reachedError = false;

    var room_ = data.room;
    var filename_ = data.filename;
    var no_ext_filename_ = (data.filename).split(".")[0];
    var libraries_ = data.libs.toString();
    var addfiles_ = data.additionalfiles;
    var icofile_ = data.icofile;
    var windowbased_ = data.isitwindowbased; 

    // avoid being hacked by inserting '' between libraries name
    if (libraries_ != "") {
      clean_list_lib = "";
      var gothrough = libraries_.split(",").map(function (val) {
        clean_list_lib += " '" + val + "'"
      });
    }

    async.series([

        function (callback) {
          console.log('# STARTING on room ' + room_);
          client.join(room_);
          callback(null, '');
        },

// install libraries if needed

        function (callback) {
          if (libraries_ == "") {
            callback(null, '');
          } else {
            io.to(room_).emit('step1');
            callback(null, '');
          }
        },
        function (callback) {
          if (libraries_ == "") {
            callback(null, '');
          } else {
            require('child_process').exec('sudo wine pip3 --no-cache-dir install ' + clean_list_lib, callback);
          }
        },
        function (callback) {
          io.to(room_).emit('step2');
          callback(null, '');
        },

// create unique working dir, move files over there

        function (callback) {
          // 1. create unique folder in ./uploads
          fs.mkdir('./workingdir/' + room_, callback);
        },
        function (callback) {
          // create folder called additionalfiles
          if (addfiles_ == " Select additional file(s)...") {
            callback(null, '');
          } else {
            fs.mkdir('./workingdir/' + room_ + '/additionalfiles', callback);
          }
        },
        function (callback) {
          // 2. move .py file in that folder
          require('child_process').exec('mv "./uploads/' + filename_ + '" ./workingdir/' + room_ + '/', callback);
        },
        function (callback) {
          // 3. move additional file(s) in that folder
          if (addfiles_ == " Select additional file(s)...") {
            callback(null, '');
          } else {
            var str = addfiles_;
            var arr = str.split(",").map(function (val) {
              require('child_process').exec('mv "./uploads/' + val + '" ./workingdir/' + room_ + "/additionalfiles/" );
            });
            callback(null, '');
          }
        },
        function (callback) {
          // 4. moving .ico file in that folder
          if ((icofile_ == " Select your .ico file...") || (icofile_ == "Error: this is not a .ico file")) {
            callback(null, '');
          } else {
            require('child_process').exec('mv "./uploads/' + icofile_ + '" ./workingdir/' + room_ + "/" , callback);
          }
        },

// modify .py file -> 1. add resourcepath function IF there are additional files

        function (callback) {
          if (addfiles_ != " Select additional file(s)...") {
            var data = fs.readFileSync("./workingdir/" + room_ + "/" + filename_); //read existing contents into data
            var fd = fs.openSync("./workingdir/" + room_ + "/" + filename_, 'w+');
            var buffer = new Buffer(resourcepathfunction);
            fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
            fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
            fs.close(fd);
            callback(null, '');
          } else {
            callback(null, '');
          }
        },
        // 2. replace every occurence of <filename> with resource_path(os.path.join('data', '<filename>'))
        function (callback) {
          if (addfiles_ != " Select additional file(s)...") {
            var str2 = addfiles_;
            // first replace every occurence of <'filename'> with <"filename">
            var arr2_ = str2.split(",").map(function (val2_) {
              replacement_ = '"' + val2_ + '"';
              repout.sed('-i', "'" + val2_ + "'", replacement_, "./workingdir/" + room_ + "/" + filename_);
            });
            // then replace occurence of <"filename"> to resource_path(os.path.join('data', '<filename>'))
            var arr2 = str2.split(",").map(function (val2) {
              replacement = "resource_path(os.path.join('data', '" + val2 + "'))";
              repout.sed('-i', '"' + val2 + '"', replacement, "./workingdir/" + room_ + "/" + filename_);
            });
            callback(null, '');
          } else {
            callback(null, '');
          }
        },

// start convertion with PyInstaller

        function (callback) {
          // if it's window based
          if (windowbased_ == true) {
            if ((addfiles_ == " Select additional file(s)..." && icofile_ == " Select your .ico file...") || (addfiles_ == " Select additional file(s)..." && icofile_ == "Error: this is not a .ico file")) {
              // possibility 1 -> no add files and no ico file
              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + "/build/ --onefile --icon=./basic-logo.ico --clean --windowed";
              var ls    = spawn('sh', ['-c', cmd]);

              // spawn wrongly thinks pyinstaller is stdout-ing errors, so I have to collect the ouput from stderr:
              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                console.log('stderr: ' + data.toString());
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');

                }
              });



            } else if ((addfiles_ != " Select additional file(s)..." && icofile_ == " Select your .ico file...") || (addfiles_ != " Select additional file(s)..." && icofile_ == "Error: this is not a .ico file")) {
              // possibility 2 -> add files only


              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + '/dist/ --workpath ./workingdir/' + room_ + '/build/ --onefile --icon=./basic-logo.ico --clean --windowed --add-data "workingdir/' + room_ + '/additionalfiles/;data"'
              var ls    = spawn('sh', ['-c', cmd]);

              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                console.log('stderr: ' + data.toString());
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');

                }
              });


            } else if ((addfiles_ == " Select additional file(s)..." && icofile_ != " Select your .ico file...") || (addfiles_ == " Select additional file(s)..." && icofile_ != "Error: this is not a .ico file")) {
              // possibility 3 -> ico file only
              // require('child_process').exec('wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean --windowed', callback);


              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean --windowed';
              var ls    = spawn('sh', ['-c', cmd]);

              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                console.log('stderr: ' + data.toString());
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');

                }
              });


            } else if ((addfiles_ != " Select additional file(s)..." && icofile_ != " Select your .ico file...") || (addfiles_ != " Select additional file(s)..." && icofile_ != "Error: this is not a .ico file")) {
              // possibility 4 -> add files AND ico file
              // require('child_process').exec('wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean --windowed ' + '--add-data "workingdir/' + room_ + '/additionalfiles/;data"', callback);




              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean --windowed ' + '--add-data "workingdir/' + room_ + '/additionalfiles/;data"';
              var ls    = spawn('sh', ['-c', cmd]);

              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                console.log('stderr: ' + data.toString());
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');
                }
              });




            }
          } else {
          // if it's console-based
            if ((addfiles_ == " Select additional file(s)..." && icofile_ == " Select your .ico file...") || (addfiles_ == " Select additional file(s)..." && icofile_ == "Error: this is not a .ico file")) {
              // possibility 1 -> no add files and no ico file
              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + "/build/ --onefile --icon=./basic-logo.ico --clean";
              var ls    = spawn('sh', ['-c', cmd]);

              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                console.log('stderr: ' + data.toString());
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');
                }
              });





            } else if ((addfiles_ != " Select additional file(s)..." && icofile_ == " Select your .ico file...") || (addfiles_ != " Select additional file(s)..." && icofile_ == "Error: this is not a .ico file")) {
              // possibility 2 -> add files only
              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + '/dist/ --workpath ./workingdir/' + room_ + '/build/ --onefile --icon=./basic-logo.ico --clean --add-data "workingdir/' + room_ + '/additionalfiles/;data"'
              var ls    = spawn('sh', ['-c', cmd]);

              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');

                }
              });




            } else if ((addfiles_ == " Select additional file(s)..." && icofile_ != " Select your .ico file...") || (addfiles_ == " Select additional file(s)..." && icofile_ != "Error: this is not a .ico file")) {
              // possibility 3 -> ico file only
              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean';
              var ls    = spawn('sh', ['-c', cmd]);

              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                console.log('stderr: ' + data.toString());
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');

                }
              });


            } else if ((addfiles_ != " Select additional file(s)..." && icofile_ != " Select your .ico file...") || (addfiles_ != " Select additional file(s)..." && icofile_ != "Error: this is not a .ico file")) {
              // possibility 4 -> add files AND ico file
              cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean ' + '--add-data "workingdir/' + room_ + '/additionalfiles/;data"';
              var ls    = spawn('sh', ['-c', cmd]);



              fullStdout = "";
              ls.stderr.on('data', function (data) {
                fullStdout += data.toString();
                if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
                  callback(null, '');
                }
              });
              ls.on('exit', function (code) {
                if (code != 0) {
                  console.log("reach & dtect that error in pyinstaller")
                  reachedError = true;
                  checkErrorAndEmit(fullStdout, room_);
                  callback(null, '');
                }
              });
            }
          }
        },

// convertion done, now move file to downloadable directory

        function (callback) {
          if (reachedError == false) {
            fs.mkdir('./public/pyfilesdownload/' + room_, callback);
          } else {
            callback(null, '');
          }
        },
        function (callback) {
          if (reachedError == false) {
            require('child_process').exec('mv "./workingdir/' + room_ + "/dist/" + no_ext_filename_ + '.exe" ./public/pyfilesdownload/' + room_ + "/", callback);
          } else {
            callback(null, '');
          }
        },
        function (callback) {
          if (reachedError == false) {
            io.to(room_).emit('step3');
            callback(null, '');
          } else {
            callback(null, '');
          }
        },
        function (callback) {
          if (reachedError == false) {
            require('child_process').exec('rm "./' + no_ext_filename_ + '.spec"', callback);
          } else {
            callback(null, '');
          }
        },
        function (callback) {
          if (reachedError == false) {
            io.to(room_).emit('step4', {roomfolder: room_, filenamenoext: no_ext_filename_});
            callback(null, '');
          } else {
            callback(null, '');
          }
        },
        function (callback) {
          if (reachedError == false) {
            client.leave(room_);
            callback(null, '');
          } else {
            callback(null, '');
          }
        }
    ],
    function (err, result) {
      if (err) {
        checkErrorAndEmit(err, room_, libraries_);
        fs.writeFile("./errorlogs/" + room_ + "-" + filename_ + ".txt", err, function(the_error) {
          if(the_error) { return console.log("couldnt write damn file"); }
        });
      }
      if (reachedError == true) {
        fs.writeFile("./errorlogs/" + room_ + "-" + filename_ + ".txt", fullStdout, function(the_error) {
          if(the_error) { return console.log("couldnt write damn file"); }
        });
        require('child_process').exec('rm "./' + no_ext_filename_ + '.spec"');
      }
    });
  });
});

var trackMissedWoop = `<script>(function(){
  var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
})("woopra");
woopra.config({ domain: 'py2exe.net' });
woopra.track("MISSED 1 VISITOR");</script>`


// live dev mode
devmode = false;
if (devmode == false) {
	app.get('/', function(req, res){
		res.render('makeconv');
	});
	app.get('*', function(req, res){
		res.render('makeconv');
	});
} else {
	app.get('/', function(req, res){
		res.send("In maintenance (16th Jan 2018, 16:00 - UK time). </br> Will be back shortly. " + trackMissedWoop);
	});
	app.get('/dev', function(req, res){
		res.render('makeconv');
	});
	app.get('*', function(req, res){
		res.send("In maintenance (16th Jan 2018, 16:00 - UK time). </br> Will be back shortly. " + trackMissedWoop);
	});
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
