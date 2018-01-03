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
    var room_ = data.room;
    var filename_ = data.filename;
    var no_ext_filename_ = (data.filename).split(".")[0];
    var libraries_ = data.libs.toString().replace(/,/g, " ");
    var addfiles_ = data.additionalfiles;
    var icofile_ = data.icofile;

    async.series([
        function (callback) {
          console.log('# STARTING on room ' + room_);
          client.join(room_);
          callback(null, '');
        },

// create unique working dir, move files over there

        function (callback) {
          // 1. create unique folder in ./uploads
          fs.mkdir('./workingdir/' + room_, callback);
        },
        function (callback) {
          // create folder called additionalfiles
          if (addfiles_ == " Drop or select additional file(s)...") {
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
          if (addfiles_ == " Drop or select additional file(s)...") {
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
          if (icofile_ == " Drop or select your .ico file...") {
            callback(null, '');
          } else {
            require('child_process').exec('mv "./uploads/' + icofile_ + '" ./workingdir/' + room_ + "/" , callback);
          }
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
            require('child_process').exec('sudo wine pip3 install ' + libraries_, callback);
          }
        },
        function (callback) {
          io.to(room_).emit('step2');
          callback(null, '');
        },

// modify .py file -> 1. add resourcepath function

        function (callback) {
          var data = fs.readFileSync("./workingdir/" + room_ + "/" + filename_); //read existing contents into data
          var fd = fs.openSync("./workingdir/" + room_ + "/" + filename_, 'w+');
          var buffer = new Buffer(resourcepathfunction);
          fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
          fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
          fs.close(fd);
          callback(null, '');
        },
        // 2. replace every occurence of <filename> with resource_path(os.path.join('data', '<filename>'))
        function (callback) {
          var str2 = addfiles_;
          var arr2 = str2.split(",").map(function (val2) {
            replacement = "resource_path(os.path.join('data', '" + val2 + "'))";
            repout.sed('-i', '"' + val2 + '"', replacement, "./workingdir/" + room_ + "/" + filename_);
          });
          callback(null, '');
        },
        function (callback) {
          if (addfiles_ == " Drop or select additional file(s)..." && icofile_ == " Drop or select your .ico file...") {
            // possibility 1 -> no add files and no ico file
            require('child_process').exec('wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + "/build/ --onefile --icon=./basic-logo.ico --clean", callback);

          } else if (addfiles_ != " Drop or select additional file(s)..." && icofile_ == " Drop or select your .ico file...") {
            // possibility 2 -> add files only
            cmd = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + '/dist/ --workpath ./workingdir/' + room_ + '/build/ --onefile --icon=./basic-logo.ico --clean --add-data "workingdir/' + room_ + '/additionalfiles/;data"'
            require('child_process').exec(cmd, callback);

          } else if (addfiles_ == " Drop or select additional file(s)..." && icofile_ != " Drop or select your .ico file...") {
            // possibility 3 -> ico file only
            require('child_process').exec('wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean', callback);

          } else if (addfiles_ != " Drop or select additional file(s)..." && icofile_ != " Drop or select your .ico file...") {
            // possibility 4 -> add files AND ico file
            require('child_process').exec('wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + '/build/ --onefile --icon="./workingdir/' + room_ + "/" + icofile_ + '" --clean ' + '--add-data "workingdir/' + room_ + '/additionalfiles/;data"', callback);
          }
        },
        function (callback) {
          fs.mkdir('./public/pyfilesdownload/' + room_, callback);
        },
        function (callback) {
          require('child_process').exec('mv "./workingdir/' + room_ + "/dist/" + no_ext_filename_ + '.exe" ./public/pyfilesdownload/' + room_ + "/", callback);
        },
        function (callback) {
          io.to(room_).emit('step3');
          callback(null, '');
        },
        function (callback) {
          require('child_process').exec('rm "./' + no_ext_filename_ + '.spec"', callback);
        },
        function (callback) {
          if (libraries_ == "") {
            callback(null, '');
          } else {
            require('child_process').exec("wine pip3 uninstall " + libraries_ + " -y", callback);
          }
        },
        function (callback) {
          io.to(room_).emit('step4', {roomfolder: room_, filenamenoext: no_ext_filename_});
          callback(null, '');
        },
        function (callback) {
          client.leave(room_);
          callback(null, '');
        }
    ],
    function (err, result) {
        if (err) {
          io.to(room_).emit('error_happenned');
        }
    });
  });
});

app.get('/', function(req, res){
  res.render('makeconv');
  // res.send("in maintenance (3rd Jan 2018) - will be back shortly");
});
/*
app.get('/dev', function(req, res){
  res.render('makeconv');
});
*/

http.listen(port, function(){
  console.log('listening on *:' + port);
});
