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

app.use( require('express-force-domain')('http://py2exe.net') );

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
    var gotAndError = false;

    var room_ = data.room;
    var filename_ = data.filename;
    var no_ext_filename_ = (data.filename).split(".")[0];
    var libraries_ = data.libs;
    var addfiles_ = data.additionalfiles;
    var icofile_ = data.icofile;
    var windowbased_ = data.isitwindowbased; 
    var modules_ = data.additionalmodules;
    var pyversion_ = data.pyversion;

    // first remove standard libraries from libraries list and add '' between libs name
    py_st_libs = ['__future__', '__main__', '_dummy_thread', '_thread', 'abc', 'aifc', 
    'argparse', 'array', 'ast', 'asynchat', 'asyncio', 'asyncore', 'atexit', 'audioop', 
    'base64', 'bdb', 'binascii', 'binhex', 'bisect', 'builtins', 'bz2', 'calendar', 'cgi', 
    'cgitb', 'chunk', 'cmath', 'cmd', 'code', 'codecs', 'codeop', 'collections', 'colorsys', 
    'compileall', 'concurrent', 'configparser', 'contextlib', 'copy', 'copyreg', 'cProfile', 
    'csv', 'ctypes', 'datetime', 'dbm', 'decimal', 'difflib', 'dis', 'distutils', 'doctest', 
    'dummy_threading', 'email', 'encodings', 'ensurepip', 'enum', 'errno', 'faulthandler', 
    'filecmp', 'fileinput', 'fnmatch', 'formatter', 'fractions', 'ftplib', 'functools', 
    'gc', 'getopt', 'getpass', 'gettext', 'glob', 'gzip', 'hashlib', 'heapq', 'hmac', 'html', 
    'http', 'imaplib', 'imghdr', 'imp', 'importlib', 'inspect', 'io', 'ipaddress', 'itertools', 
    'json', 'keyword', 'lib2to3', 'linecache', 'locale', 'logging', 'lzma', 'macpath', 
    'mailbox', 'mailcap', 'marshal', 'math', 'mimetypes', 'mmap', 'modulefinder', 'msvcrt', 
    'multiprocessing', 'netrc', 'nntplib', 'numbers', 'operator', 'optparse', 'os', 'parser', 
    'pathlib', 'pdb', 'pickle', 'pickletools', 'pkgutil', 'platform', 'plistlib', 'poplib', 
    'posix', 'pprint', 'profile', 'pstats', 'py_compile', 'pyclbr', 'pydoc', 'queue', 'quopri', 
    'random', 're', 'reprlib', 'rlcompleter', 'runpy', 'sched', 'select', 'selectors', 'shelve', 
    'shlex', 'shutil', 'signal', 'site', 'smtpd', 'smtplib', 'sndhdr', 'socket', 'socketserver', 
    'sqlite3', 'ssl', 'stat', 'statistics', 'string', 'stringprep', 'struct', 'subprocess', 'sunau', 
    'symbol', 'symtable', 'sys', 'sysconfig', 'tabnanny', 'tarfile', 'telnetlib', 'tempfile', 'test', 
    'textwrap', 'threading', 'time', 'timeit', 'tkinter', 'token', 'tokenize', 'trace', 'traceback', 
    'tracemalloc', 'turtle', 'turtledemo', 'types', 'typing', 'unicodedata', 'unittest', 'urllib', 
    'uu', 'uuid', 'venv', 'warnings', 'wave', 'weakref', 'webbrowser', 'wsgiref', 'xdrlib', 'xml', 
    'xmlrpc', 'zipapp', 'zipfile', 'zipimport', 'zlib'];

    clean_list_lib = "";
    if (libraries_ != false) {
		var gothrough2 = (libraries_.toString()).split(",").map(function (val) {
			if (py_st_libs.indexOf(val) == -1) { // if val is not in py_st_libs
				clean_list_lib += " '" + val + "'"; 
			}
		});
	}

    async.series([
    	

        function (callback) {
          console.log('### STARTING convertion - ' + room_);
          client.join(room_);
          callback(null, '');
        },

// install libraries if needed

        function (callback) {
          if (libraries_ == false) {
            callback(null, '');
          } else {
            io.to(room_).emit('step1');
            callback(null, '');
          }
        },
        function (callback) {
          if (libraries_ == false) {
            callback(null, '');
          } else {
          	if (pyversion_ == 3) {
            	require('child_process').exec('sudo wine pip3 --no-cache-dir install ' + clean_list_lib, callback);
            } else if (pyversion_ == 2) {
            	require('child_process').exec('sudo wine /root/.wine/drive_c/Python27/Scripts/pip2.exe --no-cache-dir install ' + clean_list_lib, callback);
            }
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
          // 2. move .py file in that folder
          require('child_process').exec('mv "./uploads/' + filename_ + '" ./workingdir/' + room_ + '/', callback);
        },
        function (callback) {
          // * create folder called additionalfiles IF NEEDED
          if (addfiles_ == false) {
            callback(null, '');
          } else {
            fs.mkdir('./workingdir/' + room_ + '/additionalfiles', callback);
          }
        },
        function (callback) {
          // * move additional file(s) in that folder IF NEEDED
          if (addfiles_ == false) {
            callback(null, '');
          } else {
            var str = addfiles_;
            var arr = str.split(" - ").map(function (val) {
              require('child_process').exec('mv "./uploads/' + val + '" ./workingdir/' + room_ + "/additionalfiles/" );
            });
            callback(null, '');
          }
        },
        function (callback) {
          // * create folder called additionalicon IF NEEDED
          if (icofile_ == false) {
            callback(null, '');
          } else {
            fs.mkdir('./workingdir/' + room_ + '/additionalicon', callback);
          }
        },
        function (callback) {
          // * move .ico file in that folder IF NEEDED
          if (icofile_ == false) {
            callback(null, '');
          } else {
            require('child_process').exec('mv "./uploads/' + icofile_ + '" ./workingdir/' + room_ + "/additionalicon/" , callback);
          }
        },
        function (callback) {
          // * create folder called additionalmodules IF NEEDED
          if (modules_ == false) {
            callback(null, '');
          } else {
            fs.mkdir('./workingdir/' + room_ + '/additionalmodules', callback);
          }
        },
        function (callback) {
          // * move additional modules file in that folder IF NEEDED
          if (modules_ == false) {
            callback(null, '');
          } else {
            var str = modules_;
            var arr = str.split(" - ").map(function (val) {
              require('child_process').exec('mv "./uploads/' + val + '" ./workingdir/' + room_ + "/additionalmodules/" );
            });
	        callback(null, '');
          }
        },

// modify .py file -> 1. add resourcepath function IF there are additional files

        function (callback) {
          if (addfiles_ != false) {
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
          if (addfiles_ != false) {
            var str2 = addfiles_;
            // first replace every occurence of <'filename'> with <"filename">
            var arr2_ = str2.split(" - ").map(function (val2_) {
              replacement_ = '"' + val2_ + '"';
              repout.sed('-i', "'" + val2_ + "'", replacement_, "./workingdir/" + room_ + "/" + filename_);
            });
            // then replace occurence of <"filename"> to resource_path(os.path.join('data', '<filename>'))
            var arr2 = str2.split(" - ").map(function (val2) {
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

        	if (pyversion_ == 3) {
				global.finalCommand = 'wine pyinstaller -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + "/build/ --clean --onefile";
        	} else if (pyversion_ == 2) {
				global.finalCommand = 'wine /root/.wine/drive_c/Python27/Scripts/pyinstaller.exe -y "./workingdir/' + room_ + '/' + filename_ + '" --distpath ./workingdir/' + room_ + "/dist/ --workpath ./workingdir/" + room_ + "/build/ --clean --onefile";
        	}

	    	// get ico file if there is any
	    	if (icofile_ != false) {
	        	cmd_icofile = ' --icon="./workingdir/' + room_ + "/additionalicon/" + icofile_ + '" ';
	    	} else {
	    		cmd_icofile = " --icon=./basic-logo.ico ";
	    	}

	    	// get additional files if there are any
	    	if (addfiles_ != false) {
	        	cmd_addfiles = ' --add-data "workingdir/' + room_ + '/additionalfiles/;data" ';
	    	} else {
	    		cmd_addfiles = "";
	    	}

	    	// get windowed mode
	    	if (windowbased_ == true) {
	    		cmd_windowed = " --windowed ";
	    	} else {
	    		cmd_windowed = "";
	    	}

	    	// get windowed mode
	    	if (modules_ != false) {
	    		cmd_modules = ' -p "workingdir/' + room_ + '/additionalmodules/" ';
	    	} else {
	    		cmd_modules = "";
	    	}

			finalCommand += cmd_icofile;
			finalCommand += cmd_windowed;
			finalCommand += cmd_addfiles;
			finalCommand += cmd_modules;

            callback(null, '');

        	// TESTS (DO NOT DELETE)

        },

        function (callback) {

			var ls    = spawn('sh', ['-c', finalCommand]);

			global.fullStdout = "";
			ls.stderr.on('data', function (data) {
				fullStdout += data.toString();
				// console.log('stderr: ' + data.toString());
				if ( (data.toString()).indexOf("Building EXE from out00-EXE.toc completed successfully") > -1) {
					callback(null, ''); // CONVERTION FINISHED 
				}
			});
			ls.on('exit', function (code) {
				if (code != 0) {
					console.log("ERROR IN CONVERTION !");
					if ((fullStdout.toString()).indexOf("struct.error: unpack requires a bytes object of length 16") > -1) {
						io.to(room_).emit('catched_error_happenned', {which_error: "Incorrect .ico file."});
					} else if ((fullStdout.toString()).indexOf("SyntaxError: Missing parentheses in call to 'print'") > -1) {
						io.to(room_).emit('catched_error_happenned', {which_error: "You uploaded a Python 2.* script."});
					} else if ((fullStdout.toString()).indexOf("SyntaxError:") > -1) {
						io.to(room_).emit('catched_error_happenned', {which_error: "There's an error in your .py file. Please make sure it runs correctly before trying to convert it."});
					} else if ((fullStdout.toString()).indexOf("IndentationError:") > -1) {
						io.to(room_).emit('catched_error_happenned', {which_error: "You must indent your python script with 4 whitespaces"});
					} else if ((fullStdout.toString()).indexOf("TabError:") > -1) {
			            io.to(room_).emit('catched_error_happenned', {which_error: "You must indent your python script with 4 whitespaces"});
		            } else {
						io.to(room_).emit('error_happenned');
					}
					gotAndError = true;
					callback(null, '');
				}
			});
        },

// write the error in .txt file

        function (callback) {
        	if (gotAndError == true) {
				fs.writeFile("./errorlogs/" + room_ + "-" + filename_ + "-pyinstaller_error.txt", fullStdout, function(the_error) {
					if(the_error) { return console.log("couldnt write damn file"); }
				});
				callback(null, '');
			} else {
				callback(null, '');
			}
    	},

// convertion done, now move file to downloadable directory

        function (callback) {
	        fs.mkdir('./public/pyfilesdownload/' + room_, callback);
        },
        function (callback) {
        	if (gotAndError == false) {
            	require('child_process').exec('mv "./workingdir/' + room_ + "/dist/" + no_ext_filename_ + '.exe" ./public/pyfilesdownload/' + room_ + "/", callback);
            } else {
            	callback(null, '');
            }
        },
        function (callback) {
            io.to(room_).emit('step3');
            callback(null, '');
        },

// delete .spec file in root folder, useless

        function (callback) {
            require('child_process').exec('rm "./' + no_ext_filename_ + '.spec"', callback);
        },

// create .bat file for quick troubleshoot

        function (callback) {
            require('child_process').exec('printf "' + no_ext_filename_ + '.exe & pause" > /p2e/public/pyfilesdownload/' + room_ + '/' + no_ext_filename_ + '.bat', callback);
        },

// update frontend, convertion is finished

        function (callback) {
        	if (gotAndError == false) {
				io.to(room_).emit('step4', {roomfolder: room_, filenamenoext: no_ext_filename_});
				callback(null, '');
			} else {
				callback(null, '');
			}
		},

// delete junk

    function (callback) {
			fs.mkdir('./workingdir/' + room_ + '_', callback);
		},
		function (callback) {
			require('child_process').exec('mv "./workingdir/' + room_ + '/' + filename_ + '" ./workingdir/' + room_ + '_', callback);
		}, 
		function (callback) {
			if (addfiles_ != false) {
				require('child_process').exec('sudo mv -v ./workingdir/' + room_ + '/additionalfiles/* ./workingdir/' + room_ + '_', callback);
			} else {
      	callback(null, '');
			}
		},
		function (callback) {
			if (icofile_ != false) {
				require('child_process').exec('sudo mv -v ./workingdir/' + room_ + '/additionalicon/* ./workingdir/' + room_ + '_', callback);
			} else {
      	callback(null, '');
			}
		},
		function (callback) {
			if (modules_ != false) {
				require('child_process').exec('sudo mv -v ./workingdir/' + room_ + '/additionalmodules/* ./workingdir/' + room_ + '_', callback);
			} else {
      	callback(null, '');
			}
		},
    function (callback) {
			require('child_process').exec('sudo rm -rf ./workingdir/' + room_, callback);
		},

// leave the room when everything's finished

        function (callback) {
        	console.log("### FINISHED CONVERTION WITH NO ERROR");
            client.leave(room_);
            callback(null, '');
        }
    ],
    function (err, result) {
		if (err) {
			console.log(err.toString());
			if ((err.toString()).indexOf("No matching distribution found for") > -1) {
				io.to(room_).emit('catched_error_happenned', {which_error: "pip can't find one of these library(s): " + libraries_});
			} else {
				io.to(room_).emit('error_happenned');
			}
			fs.writeFile("./errorlogs/" + room_ + "-" + filename_ + "-other_error.txt", err, function(the_error) {
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
		res.send("In maintenance </br> Will be back very shortly. " + trackMissedWoop);
	});
	app.get('/dev', function(req, res){
		res.render('makeconv');
	});
	app.get('*', function(req, res){
		res.send("In maintenance </br> Will be very back shortly. " + trackMissedWoop);
	});
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
