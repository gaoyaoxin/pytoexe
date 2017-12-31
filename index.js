const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const path = require('path');
const shortid = require('shortid');
const sleep = require('system-sleep');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable = require('formidable');
const async = require('async');

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
    // fs.writeFile("text.txt", data, (error) => { /* handle error */ });
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

/* THIS IS THE CODE THAT FIRES ONCE A PY FILE HAS BEEN UPLOADED successfully */
io.on('connection', function(client) {
  client.on('convertstart', function(data) {
    var room_ = data.room;
    var filename_ = data.filename;
    var no_ext_filename_ = (data.filename).split(".")[0];
    var libraries_ = data.libs.toString().replace(/,/g, " ");

    client.join(room_);
    io.to(room_).emit('step0');

    client.on('step0_1', function(data) {
      console.log("--- step 1 ---");
      require('child_process').execSync('sudo wine pip3 install ' + libraries_);
      io.to(room_).emit('step1');
    });

    client.on('step1_2', function(data) {
      console.log("--- step 2 ---");
      io.to(room_).emit('step2');
    });

    client.on('step2_3', function(data) {
      console.log("--- step 3 ---");
      require('child_process').exec('wine pyinstaller -y ./uploads/' + filename_ + " --distpath ./uploads/" + room_ + "/dist/ --workpath ./uploads/" + room_ + "/build/ --onefile");
    });

    /*

    async.series([
        function op1(callback) {
          console.log('# STARTING -> room ' + room_ + ' * filename: ' + filename_ + " * libraries: " + libraries_);
          client.join(room_, callback.bind(null, ''));
          // callback(null, '');
        },
        function op2(callback) {
          console.log("# - step 1 - #")
          io.to(room_).emit('step0');
          // callback(null, '');
        },
        function op3(callback) {
          console.log("# - step 2 - #")
          // console.log("blob");
          var install_libs = require('child_process').exec('sudo wine pip3 install ' + libraries_, callback);
        },
        function op4(callback) {
          console.log("# - step 3 - #")
          io.to(room_).emit('step1', null, callback);
          // callback(null, '');
        },
        function (callback) {
          console.log("# - step 4 - #")
          var run_pyinstaller = require('child_process').exec('wine pyinstaller -y ./uploads/' + filename_ + " --distpath ./uploads/" + room_ + "/dist/ --workpath ./uploads/" + room_ + "/build/ --onefile", callback);
          // callback(null, '');
        },
        function (callback) {
          console.log("# - step 5 - #")
          io.to(room_).emit('step2', null, callback);
          // callback(null, '');
        },

        function (callback) {
          console.log("# - step 6 - #")
          fs.mkdir('./public/pyfilesdownload/' + room_, callback);
          // callback(null, '');
        },
        function (callback) {
          console.log("# - step 7 - #")
          var move_file = require('child_process').exec('cp ./uploads/' + room_ + "/dist/" + no_ext_filename_ + ".exe ./public/pyfilesdownload/" + room_ + "/", callback);
          // callback(null, '');
        },
        function (callback) {
          console.log("####### LAST ONE #");
          io.to(room_).emit('step3', {roomfolder: room_, filenamenoext: no_ext_filename_}, callback);
          // callback(null, '');
        }

    ],
    function (err, result) {
        console.log(result);
    });

    */



    // #1 -> installing libraries

/*
    // #2 -> run pyinstaller
    // var result = require('child_process').execSync('wine pyinstaller -y ./uploads/' + unique_id + "/" + pyfile.name + " --distpath ./pyfiles/" + unique_id + "/dist/ --workpath ./pyfiles/" + unique_id + "/build/ --onefile");
    io.to(data.room).emit('step2', '');
    var run_pyinstaller = require('child_process').execSync('wine pyinstaller -y ./uploads/' + filename_ + " --distpath ./uploads/" + room_ + "/dist/ --workpath ./uploads/" + room_ + "/build/ --onefile");

    // #3 -> move file to public folder
    io.to(data.room).emit('step3', {roomfolder: room_, filenamenoext: no_ext_filename_});
    fs.mkdirSync('./public/pyfilesdownload/' + room_);
    var move_file = require('child_process').execSync('cp ./uploads/' + room_ + "/dist/" + no_ext_filename_ + ".exe ./public/pyfilesdownload/" + room_ + "/");
*/
    /*
    client.leave(data);
    */
  });
});

/*
app.post('/uploadpy', function(req, res) {

  pyfile = req.files.sampleFile;
  unique_id = shortid.generate();
  libs = req.body.py_libraries;
  pyfilewithoutext = (req.files.sampleFile.name).split(".")[0];

  fs.mkdirSync('./pyfiles/' + unique_id);
  fs.mkdirSync('./public/pyfilesdownload/' + unique_id);

  // move file to proper dir
  pyfile.mv('./pyfiles/' + unique_id + "/" + pyfile.name, function(err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      // if succcessfully moved file, we can start convertion
      res.render('convertion', {
        pyfile: pyfile.name,
        uniqueid: unique_id,
        libs: libs
      });
      // when user land on the initial convertion page
      io.on('connection', function(client) {
        client.on('subscribe', function(data) { client.join(data.room); })
        console.log('Client connected...');

        // when user click on 'convert'
        client.on('convertstart', function(data) {
          console.log('Joined room ' + data);
          client.join(data);

          // #1 -> download libraries with pip
          var result = require('child_process').execSync('sudo wine pip3 install ' + libs);
          io.to(data).emit('step1', libs);

          // #2 -> run pyinstaller
          var result = require('child_process').execSync('wine pyinstaller -y ./pyfiles/' + unique_id + "/" + pyfile.name + " --distpath ./pyfiles/" + unique_id + "/dist/ --workpath ./pyfiles/" + unique_id + "/build/ --onefile");
          io.to(data).emit('step2', '');

          // #3 -> move file to public folder
          var result = require('child_process').execSync('cp ./pyfiles/' + unique_id + "/dist/" + pyfilewithoutext + ".exe ./public/pyfilesdownload/" + unique_id + "/");
          io.to(data).emit('step3', {pyfilewithoutext: pyfilewithoutext, unique_id:unique_id});

          client.leave(data);
        });
      });
    }
  });
});
*/

app.get('/', function(req, res){
  res.render('makeconv');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
