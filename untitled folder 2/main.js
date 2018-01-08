// tracking
(function(){
  var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
})("woopra");
woopra.config({ domain: 'py2exe.net' });
woopra.track();

function exefiletrack() {
  woopra.track("downloaded .exe file");
}

function trackfcbclick() {
  woopra.track("clicked on facebook page");
}

function trackgithubclick() {
  woopra.track("clicked on github page");
}

function trackblogclick() {
  woopra.track("clicked on michaelcukier.com");
}

function itworks() {
  woopra.track("said it works");
  $(".it_works").attr('visibility', 'hidden');
  $(".it_doesnt_work").attr('visibility', 'hidden');
  $(".isitworking").text("Thanks for your feedback!");
}

function itdoesntwork() {
  woopra.track("said it doesnt work");
  $(".it_works").attr('visibility', 'hidden');
  $(".it_doesnt_work").attr('visibility', 'hidden');
  $(".isitworking").text("Thanks for your feedback!");
}


// refresh function
function refreshfunc() {
  location.reload();
}


// regex check char
function regexcheckname(name_of_file) {
  return !/^[\x00-\x7F]*$/.test(name_of_file);
}

function count(s1, letter) {
  return (s1.match( RegExp(letter,'g') ) || [] ).length;
}


// standard librarires list
py_st_libs = ['__future__', '__main__', '_dummy_thread', '_thread', 'abc', 'aifc', 'argparse', 'array', 'ast', 'asynchat', 'asyncio', 'asyncore', 'atexit', 'audioop', 'base64', 'bdb', 'binascii', 'binhex', 'bisect', 'builtins', 'bz2', 'calendar', 'cgi', 'cgitb', 'chunk', 'cmath', 'cmd', 'code', 'codecs', 'codeop', 'collections', 'colorsys', 'compileall', 'concurrent', 'configparser', 'contextlib', 'copy', 'copyreg', 'cProfile', 'csv', 'ctypes', 'datetime', 'dbm', 'decimal', 'difflib', 'dis', 'distutils', 'doctest', 'dummy_threading', 'email', 'encodings', 'ensurepip', 'enum', 'errno', 'faulthandler', 'filecmp', 'fileinput', 'fnmatch', 'formatter', 'fractions', 'ftplib', 'functools', 'gc', 'getopt', 'getpass', 'gettext', 'glob', 'gzip', 'hashlib', 'heapq', 'hmac', 'html', 'http', 'imaplib', 'imghdr', 'imp', 'importlib', 'inspect', 'io', 'ipaddress', 'itertools', 'json', 'keyword', 'lib2to3', 'linecache', 'locale', 'logging', 'lzma', 'macpath', 'mailbox', 'mailcap', 'marshal', 'math', 'mimetypes', 'mmap', 'modulefinder', 'msvcrt', 'multiprocessing', 'netrc', 'nntplib', 'numbers', 'operator', 'optparse', 'os', 'parser', 'pathlib', 'pdb', 'pickle', 'pickletools', 'pkgutil', 'platform', 'plistlib', 'poplib', 'posix', 'pprint', 'profile', 'pstats', 'py_compile', 'pyclbr', 'pydoc', 'queue', 'quopri', 'random', 're', 'reprlib', 'rlcompleter', 'runpy', 'sched', 'select', 'selectors', 'shelve', 'shlex', 'shutil', 'signal', 'site', 'smtpd', 'smtplib', 'sndhdr', 'socket', 'socketserver', 'sqlite3', 'ssl', 'stat', 'statistics', 'string', 'stringprep', 'struct', 'subprocess', 'sunau', 'symbol', 'symtable', 'sys', 'sysconfig', 'tabnanny', 'tarfile', 'telnetlib', 'tempfile', 'test', 'textwrap', 'threading', 'time', 'timeit', 'tkinter', 'token', 'tokenize', 'trace', 'traceback', 'tracemalloc', 'turtle', 'turtledemo', 'types', 'typing', 'unicodedata', 'unittest', 'urllib', 'uu', 'uuid', 'venv', 'warnings', 'wave', 'weakref', 'webbrowser', 'wsgiref', 'xdrlib', 'xml', 'xmlrpc', 'zipapp', 'zipfile', 'zipimport', 'zlib'];


// disable copy/paste for librarires import
$('#myTags').bind('cut copy paste', function (e) {
    $(".ui-autocomplete-input").css("width", "350px");
    $(".ui-autocomplete-input").attr("placeholder", "error: copy/paste not allowed. please write the libraries manually");
    e.preventDefault();
});

/* UPLOAD BTN */
$(function(){
  $('#myTags').tagit({
    placeholderText: "Write your libraries here..."
  });
  $('.console-based').css({'border':'solid 3px darkgrey', 'color':'grey'});
});

pyfile_step1 = false;

pyversion_step2 = 3;
/* LATER PYTHON 2.* IMPLEMENTATION
pyversion_step2 = 0;
$('.pythonversion2').on('click', function () {
  $('.pythonversion2').css({'border':'solid 3px darkgrey', 'color':'grey'});
  $('.pythonversion3').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  pyversion_step2 = 2;
});
$('.pythonversion3').on('click', function () {
  $('.pythonversion3').css({'border':'solid 3px darkgrey', 'color':'grey'});
  $('.pythonversion2').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  pyversion_step2 = 3;
});
*/




window_based = false;
$('.window-based').on('click', function () {
  $('.window-based').css({'border':'solid 3px darkgrey', 'color':'grey'});
  $('.console-based').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  window_based = true;
});
$('.console-based').on('click', function () {
  $('.console-based').css({'border':'solid 3px darkgrey', 'color':'grey'});
  $('.window-based').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  window_based = false;
});






/* UPLOAD PY FILE */

$('.fileselector1').on('click', function (){
    $('#upload-input-1').click();
});

$('#upload-input-1').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
    console.log(((file.name).slice(-3, (file.name).length)) == ".py");

    if (this.files[0].size > 10000000) {
      $('.fileselector1').text("Error: file size exceed 10MB");
      woopra.track('(frontend) ERROR: .py file size exceed 10mb');
      pyfile_step1 = false;
    } else if (regexcheckname(file.name) == true) {
      $('.fileselector1').text("Error: please name your file with english characters only");
      woopra.track('(frontend) Error: please name your file with english characters only');
      pyfile_step1 = false;
    } else if (count(file.name, '\\.') > 1) {
      $('.fileselector1').text("Error: your python file name contains 2 or more dots ('.'): please rename it so that it contains only one ('.')");
      woopra.track('(frontend) Error: your python file name contains 2 or more dots: please rename it so that it contains only one dot');
      pyfile_step1 = false;
    } else if ((file.name).indexOf("'") > -1) {
      $('.fileselector1').text("Incorrect .py file");
      woopra.track('(frontend) Error: Incorrect .py file with single quote');
      pyfile_step1 = false;
    } else if ((file.name).indexOf('"') > -1) {
      $('.fileselector1').text("Incorrect .py file");
      woopra.track('(frontend) Error: Incorrect .py file with double quote');
      pyfile_step1 = false;
    } else if ((((file.name).slice(-3, (file.name).length)) == ".py") == true) {
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          console.log('upload successful!\n' + data);
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update the Bootstrap progress bar with the new percentage
              $('.fileselector1').text(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                $('.fileselector1').text(file.name);
                pyfile_step1 = true;
              }
            }
          }, false);
          return xhr;
        }
      });
    } else {
      $('.fileselector1').text("Error: this is not a .py file");
      woopra.track('(frontend) Error: this is not a .py file');
      pyfile_step1 = false;
    }
  }
});














/* ADDITIONAL FILES */

$('.fileselector2').on('click', function (){
    // alert("BOB");
    $('#upload-input-2').click();
});

$('#upload-input-2').on('change', function(){

  var allfiles = $('#upload-input-2').prop("files");
  var allnames = $.map(allfiles, function(val) { return val.name; });
  var files = $(this).get(0).files;

  totalSizeFiles = 0;
  $.map(allfiles, function(val) {
    totalSizeFiles += (val).size;
  });

  var checkforeign = false;
  $.map(allfiles, function(val) {
    if (regexcheckname(val.name) == true) {
      checkforeign = true;
    }
  });

  var checkhack = false;
  $.map(allfiles, function(val) {
    if ((val.name).indexOf('"') > -1) {
      checkhack = true;
    }
  });

  $.map(allfiles, function(val) {
    if ((val.name).indexOf("'") > -1) {
      checkhack = true;
    }
  });

  if (totalSizeFiles > 10000000) {
    $('.fileselector2').text("Error: total file(s) size exceed 10MB");
    woopra.track('(frontend) ERROR: total file(s) size exceed 10mb');
  } else if (checkhack == true) {
    $('.fileselector2').text("Error: incorrect file upload");
    woopra.track('(frontend) ERROR: incorrect file upload');
  } else if (checkforeign == true) {
    $('.fileselector2').text("Error: please name your additional file(s) with english characters only");
    woopra.track('(frontend) ERROR: please name your additional file(s) with english characters only');
  } else if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log('upload successful!\n' + data);
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.fileselector2').text(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.fileselector2').text(allnames);
              // socket.emit("pyfileuploaded", file.name);
            }
          }
        }, false);
        return xhr;
      }
    });
  }
});













/* UPLOAD .ICO FILE */

$('.fileselector3').on('click', function (){
    $('#upload-input-3').click();
});

$('#upload-input-3').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }



    if (this.files[0].size > 10000000) {
      $('.fileselector3').text("Error: .ico file size exceed 10MB");
      woopra.track('(frontend) Error: .ico file size exceed 10MB');
    } else if (regexcheckname(file.name) == true) {
      $('.fileselector3').text("Error: please name your .ico file with english characters only");
      woopra.track('(frontend) Error: please name your .ico file with english characters only');
    } else if ((file.name).indexOf("'") > -1) {
      $('.fileselector3').text("Incorrect .ico file");
      woopra.track('(frontend) Error: Incorrect .ico file with single quote');
    } else if ((file.name).indexOf('"') > -1) {
      $('.fileselector3').text("Incorrect .ico file");
      woopra.track('(frontend) Error: Incorrect .ico file with double quote');
    } else if ((((file.name).slice(-4, (file.name).length)) == ".ico") == true) {
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          console.log('upload successful!\n' + data);
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update the Bootstrap progress bar with the new percentage
              $('.fileselector3').text(percentComplete + '%');
              // $('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                $('.fileselector3').text(file.name);
              }
            }
          }, false);
          return xhr;
        }
      });
    } else {
      $('.fileselector3').text("Error: this is not a .ico file");
      woopra.track('(frontend) Error: this is not a .ico file');
    }
  }
});










/* CONVERT BUTTON */
$('.convbut').on('click', function (){

  checkFilename = $('.fileselector1').text();
  checkIcofile = $('.fileselector3').text();

  blockconvert = false;
  var loopAddFiles = $.map($('#upload-input-2').prop("files"), function(val) {
    if (val.name == checkFilename) {
      return blockconvert = true;
    } else if (val.name == checkIcofile) {
      return blockconvert = true;
    }
  });

  checkStdLb = false;
  whichlib = "";
  getLibs = $('#myTags').tagit('assignedTags').toString();
  if (getLibs != "") {
    var gothrough = getLibs.split(",").map(function (val) {
      if ($.inArray(val, py_st_libs) >= 0) {
        checkStdLb = true;
        whichlib += " " + val;
      }
    });
  }

  if (checkStdLb == true) {
    woopra.track('(frontend) ERROR: standard library');
    swal({
      title: "Error!",
      text: "The module(s) you imported (" + whichlib + " ) is/are part of Python's standard libraries. You don't need to import these modules here.",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    })
  } else if (blockconvert == true) {
    woopra.track('(frontend) ERROR: two or more files with same name');
    swal({
      title: "Error!",
      text: "Two or more of the files you uploaded have the same name. Please rename them.",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    })
  } else if (pyfile_step1 != true) {
    woopra.track('(frontend) ERROR: no .py file uploaded');
    swal({
      title: "Error!",
      text: "Please upload a .py file",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    })
  } else if (pyversion_step2 == 0) {
    woopra.track('(frontend) ERROR: .py version not selected');
    swal({
      title: "Error!",
      text: "Please select the python version of your .py file",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    })
  } else if (($('#myTags').text()).indexOf("'") > -1) {
    woopra.track("(frontend) ERROR: incorrect library name (" + getLibs + ")");
    swal({
      title: "Error!",
      text: "Incorrect library name",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    })
  } else if (($('#myTags').text()).indexOf('"') > -1) {
    woopra.track('(frontend) ERROR: incorrect library name ('+ getLibs + ')');
    swal({
      title: "Error!",
      text: "Incorrect library name",
      type: "error",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    })
  } else {

    var socket = io.connect();
    var uniqueRoom = Date.now();

    woopra.track('started one convertion...', { amount: uniqueRoom + "/" + $('.fileselector1').text() + " - addfiles: " + $('.fileselector2').text() + " - libs: " + $('#myTags').tagit('assignedTags') + " - icofile: " + $('.fileselector3').text() + " - windowbased: " + window_based});

    socket.emit('convertstart', { room: uniqueRoom,
                                  filename: $('.fileselector1').text(),
                                  libs: $('#myTags').tagit('assignedTags'),
                                  additionalfiles: $('.fileselector2').text(),
                                  icofile: $('.fileselector3').text(),
                                  isitwindowbased: window_based
                                });
    swal({
      title: "Please wait... ~ 20s to 1m",
      html: /*"room: <strong>" + uniqueRoom + "</strong></br>" +
            "py file: <strong>" + $('.fileselector1').text() + "</strong></br>" +
            "libs: <strong>" + $('#myTags').tagit('assignedTags') + "</strong></br></br>" +*/
            "<div class='alert_conv_stat'> </div>" +
            "<div class='uk-progress uk-progress-striped uk-active' style='width: 0%;'> 0% </div> </br>" +
            "<div class='isitworking'> </div>",
      imageUrl: "http://www.eroshotels.co.in/image/timer.gif",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCloseButton: true
    })

    $(".swal2-close").css('visibility', 'hidden');

    function movebar(where) {
      $(".uk-progress").css('width', where + '%');
      $(".uk-progress").text(where + '%');
    }

    socket.on('catched_error_happenned', function(data){
      woopra.track('got a catched error: ' + data.which_error);
       swal.close();
       swal({
         title: "Error!",
         text: data.which_error,
         type: "error",
         showCancelButton: false,
         showConfirmButton: true,
         allowOutsideClick: false,
         allowEscapeKey: false,
         showCloseButton: false
       }).then((result) => {
         if (result.value) {
           /* add this, with booleans for filesector3 & filesector3
           $('.fileselector1').text(" Select your .py file...");
           $('.fileselector2').text(" Select your .ico file...");
           $('.fileselector3').text(" Select your additional file(s)...");
           pyfile_step1 = false;
           in the meantime: */
           location.reload();
         }
       });
    });

    socket.on('error_happenned', function(data){
       swal.close();
       woopra.track('got an unexpected error on ' + uniqueRoom);
       swal({
         title: "Error!",
         text: "Unexpected error. Please try again.",
         type: "error",
         showCancelButton: false,
         showConfirmButton: true,
         allowOutsideClick: false,
         allowEscapeKey: false,
         showCloseButton: false
       }).then((result) => {
         if (result.value) {
           location.reload();
         }
       })
    });

    socket.on('step1', function(data){
       $(".alert_conv_stat").text("Installing " + $('#myTags').tagit('assignedTags') + "...");
       movebar(25);
     });

    socket.on('step2', function(data){
       $(".alert_conv_stat").text("Converting...");
       movebar(45);
    });

    socket.on('step3', function(data){
       $(".alert_conv_stat").text("Cleaning...");
       movebar(75);
    });

    socket.on('step4', function(data){
       movebar(100);
       $(".swal2-close").css('visibility', 'visible');
       $(".swal2-close").attr('onClick', 'refreshfunc()');
       $(".alert_conv_stat").text("");
       $(".swal2-title").text("Done!");
       $(".swal2-image").attr("src", "");
       $(".swal2-image").attr("src", "https://camo.githubusercontent.com/54dab78d3ee6afdb2400b4f1710f91dcc97bffae/68747470733a2f2f7261772e6769746875622e636f6d2f6c696d6f6e74652f7377656574616c657274322f6d61737465722f6173736574732f7377616c322d737563636573732e706e67");
       $(".alert_conv_stat").append("<a onClick='exefiletrack()' class='link_remove_underline' href='/pyfilesdownload/" + data.roomfolder + "/" + data.filenamenoext + ".exe'>DOWNLOAD .EXE</a>");
       $(".alert_conv_stat").css("padding", "20px");
       $(".alert_conv_stat").css("border", "1px solid lightgrey");
       $(".isitworking").append("<hr> Help us improve: <br><br> <button class='it_doesnt_work' onClick='itdoesntwork()'> report that my .exe file doesn't work </button>")
       $(".alert_conv_stat").append("<script>woopra.track('made one convertion successfully', { amount: '" + data.roomfolder + "/" + data.filenamenoext + ".exe' });</script>");
     });
   }
});
