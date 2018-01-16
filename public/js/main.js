new ResizeSensor(jQuery($(".s3")), function() {
  totalHeight = (($(".s2").height()) + ($(".s3").height()) + ($(".s4").height()) + ($(".s5").height()) + ($(".s6").height()) + ($(".s7").height())); 
  $(".site-description").height(totalHeight + 134);
});

new ResizeSensor(jQuery($(".s4")), function() {
  totalHeight = (($(".s2").height()) + ($(".s3").height()) + ($(".s4").height()) + ($(".s5").height()) + ($(".s6").height()) + ($(".s7").height())); 
  $(".site-description").height(totalHeight + 134);
});

new ResizeSensor(jQuery($(".s5")), function() {
  totalHeight = (($(".s2").height()) + ($(".s3").height()) + ($(".s4").height()) + ($(".s5").height()) + ($(".s6").height()) + ($(".s7").height())); 
  $(".site-description").height(totalHeight + 134);
});

new ResizeSensor(jQuery($(".s6")), function() {
  totalHeight = (($(".s2").height()) + ($(".s3").height()) + ($(".s4").height()) + ($(".s5").height()) + ($(".s6").height()) + ($(".s7").height())); 
  $(".site-description").height(totalHeight + 134);
});

var hided_importlibs = false;
var hided_addfiles = false;
var hided_icofile = false;
var hided_appspec = false;

$(".importlibscontainer").css("opacity", 0);
$(".addfilescontainer").css("opacity", 0);
$(".customiconcontainer").css("opacity", 0);
$(".appspeccontainer").css("opacity", 0);

// $(".showbutton_importlibs").text("show");
$(".showbutton_importlibs").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');

//$(".showbutton_addfiles").text("show");
$(".showbutton_addfiles").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');

//$(".showbutton_icofile").text("show");
$(".showbutton_icofile").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');

//$(".showbutton_appspec").text("show");
$(".showbutton_appspec").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');

$(document).ready(function() {
  $(".showbutton_importlibs").click(function () {
    console.log(hided_importlibs);
    // gtag('event', 'showed more import libs');
    if (hided_importlibs == false) {
      // $(".showbutton_importlibs").text("hide");
      $(".showbutton_importlibs").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
      $( ".importlibscontainer" ).slideToggle(200, function () {
        if ($('.importlibscontainer').is(":visible")) {
          $( ".importlibscontainer" ).animate({opacity: 1}, 200);
        }
      });
      $(".hr1").show();
      hided_importlibs = true;
    } else {
      // $(".showbutton_importlibs").text("show");
      $(".showbutton_importlibs").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
      $( ".importlibscontainer" ).animate({opacity: 0}, 200, function() {
        $(".importlibscontainer").hide(function() {
          $( ".importlibscontainer" ).slideToggle(200);
        });
      });
      hided_importlibs = false;
    }
  });

  $(".showbutton_addfiles").click(function () {
    woopra.track("showed more add files");
    if (hided_addfiles == false) {
      // $(".showbutton_addfiles").text("hide");
      $(".showbutton_addfiles").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
      $( ".addfilescontainer" ).slideToggle(200, function () {
        if ($('.addfilescontainer').is(":visible")) {
          $( ".addfilescontainer" ).animate({opacity: 1}, 200);
        }
      });
      // $(".hr2").show();
      hided_addfiles = true;
    } else {
      // $(".showbutton_addfiles").text("show");
      $(".showbutton_addfiles").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
      $( ".addfilescontainer" ).animate({opacity: 0}, 200, function() {
        $(".addfilescontainer").hide(function() {
          $( ".addfilescontainer" ).slideToggle(200);
        });
      });
      hided_addfiles = false;
    }
  });

  $(".showbutton_icofile").click(function () {
    woopra.track("showed more ico file");
    if (hided_icofile == false) {
      //$(".showbutton_icofile").text("hide");
      $(".showbutton_icofile").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
      $( ".customiconcontainer" ).slideToggle(200, function () {
        if ($('.customiconcontainer').is(":visible")) {
          $( ".customiconcontainer" ).animate({opacity: 1}, 200);
        }
      });
      // $(".hr3").show();
      hided_icofile = true;
    } else {
      //$(".showbutton_icofile").text("show");
      $(".showbutton_icofile").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
      $( ".customiconcontainer" ).animate({opacity: 0}, 100, function() {
        $(".customiconcontainer").hide(function() {
          $( ".customiconcontainer" ).slideToggle(100);
        });
      });
      hided_icofile = false;
    }
  });

  $(".showbutton_appspec").click(function () {
    woopra.track("showed more app spec");
    if (hided_appspec == false) {
      //$(".showbutton_appspec").text("hide");
      $(".showbutton_appspec").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
      $( ".appspeccontainer" ).slideToggle(200, function () {
        if ($('.appspeccontainer').is(":visible")) {
          $( ".appspeccontainer" ).animate({opacity: 1}, 200);
        }
      });
      // $(".hr4").show();
      hided_appspec = true;
    } else {
      //$(".showbutton_appspec").text("show");
      $(".showbutton_appspec").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
      $( ".appspeccontainer" ).animate({opacity: 0}, 100, function() {
        $(".appspeccontainer").hide(function() {
          $( ".appspeccontainer" ).slideToggle(100);
        });
      });
      hided_appspec = false;
    }
  });
});


// tracking
/*
(function(){
  var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
})("woopra");
woopra.config({ domain: 'py2exe.net' });
woopra.track();
*/

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
  $(".isitworking").html("<div style='margin-top: 15px;'> Thanks for your feedback! </div> ");
}

function itdoesntwork() {
  woopra.track("said it doesnt work");
  $(".it_works").attr('visibility', 'hidden');
  $(".it_doesnt_work").attr('visibility', 'hidden');
  $(".isitworking").html("<div style='margin-top: 15px;'> Thanks for your feedback! </div> ");
}


// refresh function
function justPutBack() {
  pyfile_step1 = false;

  $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-cloud-upload" aria-hidden="true"></i>Select your .py file...');
  $('.fileselector1').css("border", "1px dashed lightgrey");
  $('.fileselector1').css("color", "grey");

  $('.fileselector2').html('<i style="margin-right: 10px" class="fa fa-cloud-upload" aria-hidden="true"></i>Select additional file(s)...');
  $('.fileselector2').css("border", "1px dashed lightgrey");
  $('.fileselector2').css("color", "grey");

  $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-cloud-upload" aria-hidden="true"></i>Select your .ico file...');
  $('.fileselector3').css("border", "1px dashed lightgrey");
  $('.fileselector3').css("color", "grey");

  swal.close();
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
  $('.console-based').css({'border':'solid 3px rgb(97, 166, 97)', 'color':'rgb(97, 166, 97)'});
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
  $('.window-based').css({'border':'solid 3px rgb(97, 166, 97)', 'color':'rgb(97, 166, 97)'});
  $('.console-based').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  window_based = true;
});
$('.console-based').on('click', function () {
  $('.console-based').css({'border':'solid 3px rgb(97, 166, 97)', 'color':'rgb(97, 166, 97)'});
  $('.window-based').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  window_based = false;
});






/* UPLOAD PY FILE */

$('.fileselector1').on('click', function (){
  console.log("stil working");
    woopra.track("clicked on select py file");
    $('#upload-input-1').click();
});

$('#upload-input-1').on('change', function(){
  console.log("stil working too");

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
      woopra.track('(frontend) ERROR: .py file size exceed 10mb');
      pyfile_step1 = false;
      $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: file size exceed 10MB");
      $('.fileselector1').css("border","1px solid #c9302c");
      $('.fileselector1').css("color"," #c9302c");

    } else if (regexcheckname(file.name) == true) {
      woopra.track('(frontend) Error: please name your file with english characters only');
      pyfile_step1 = false;
      $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: please name your file with english characters only");
      $('.fileselector1').css("border","1px solid #c9302c");
      $('.fileselector1').css("color"," #c9302c");

    } else if (count(file.name, '\\.') > 1) {
      woopra.track('(frontend) Error: your python file name contains 2 or more dots: please rename it so that it contains only one dot');
      pyfile_step1 = false;
      $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: incorrect file name");
      $('.fileselector1').css("border","1px solid #c9302c");
      $('.fileselector1').css("color"," #c9302c");

    } else if ((file.name).indexOf("'") > -1) {
      woopra.track('(frontend) Error: Incorrect .py file with single quote');
      pyfile_step1 = false;
      $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: incorrect file name");
      $('.fileselector1').css("border","1px solid #c9302c");
      $('.fileselector1').css("color"," #c9302c");

    } else if ((file.name).indexOf('"') > -1) {
      $('.fileselector1').text("Incorrect .py file");
      woopra.track('(frontend) Error: Incorrect .py file with double quote');
      pyfile_step1 = false;
      $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: incorrect file name");
      $('.fileselector1').css("border","1px solid #c9302c");
      $('.fileselector1').css("color"," #c9302c");

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
                $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-check-circle" aria-hidden="true"></i>' + file.name);
                $('.fileselector1').css("border","1px solid #61A661");
                $('.fileselector1').css("color"," #61A661");
                pyfile_step1 = true;
              }
            }
          }, false);
          return xhr;
        }
      });
    } else {
      woopra.track('(frontend) Error: this is not a .py file');
      pyfile_step1 = false;
      $('.fileselector1').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "This is not a .py file");
      $('.fileselector1').css("border","1px solid #c9302c");
      $('.fileselector1').css("color"," #c9302c");
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
    woopra.track('(frontend) ERROR: total file(s) size exceed 10mb');
    $('.fileselector2').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: total file(s) size exceed 10MB");
    $('.fileselector2').css("border","1px solid #c9302c");
    $('.fileselector2').css("color"," #c9302c");

  } else if (checkhack == true) {
    woopra.track('(frontend) ERROR: incorrect file upload');
    $('.fileselector2').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: incorrect file(s) upload");
    $('.fileselector2').css("border","1px solid #c9302c");
    $('.fileselector2').css("color"," #c9302c");

  } else if (checkforeign == true) {
    woopra.track('(frontend) ERROR: please name your additional file(s) with english characters only');
    $('.fileselector2').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: please name your additional file(s) with english characters only");
    $('.fileselector2').css("border","1px solid #c9302c");
    $('.fileselector2').css("color"," #c9302c");

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
              $('.fileselector2').html('<i style="margin-right: 10px" class="fa fa-check-circle" aria-hidden="true"></i>' + allnames.toString().replace(/,/g, " — "));
              $('.fileselector2').css("border","1px solid #61A661");
              $('.fileselector2').css("color"," #61A661");
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
      woopra.track('(frontend) Error: .ico file size exceed 10MB');
      $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: .ico file size exceed 10MB");
      $('.fileselector3').css("border","1px solid #c9302c");
      $('.fileselector3').css("color"," #c9302c");

    } else if (regexcheckname(file.name) == true) {
      woopra.track('(frontend) Error: please name your .ico file with english characters only');
      $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: please name your .ico file with english characters only");
      $('.fileselector3').css("border","1px solid #c9302c");
      $('.fileselector3').css("color"," #c9302c");

    } else if ((file.name).indexOf("'") > -1) {
      woopra.track('(frontend) Error: Incorrect .ico file with single quote');
      $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Incorrect .ico file");
      $('.fileselector3').css("border","1px solid #c9302c");
      $('.fileselector3').css("color"," #c9302c");

    } else if ((file.name).indexOf('"') > -1) {
      woopra.track('(frontend) Error: Incorrect .ico file with double quote');
      $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Incorrect .ico file");
      $('.fileselector3').css("border","1px solid #c9302c");
      $('.fileselector3').css("color"," #c9302c");

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
                $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-check-circle" aria-hidden="true"></i>' + file.name);
                $('.fileselector3').css("border","1px solid #61A661");
                $('.fileselector3').css("color"," #61A661");
              }
            }
          }, false);
          return xhr;
        }
      });
    } else {
      woopra.track('(frontend) Error: this is not a .ico file');
      $('.fileselector3').html('<i style="margin-right: 10px" class="fa fa-times-circle" aria-hidden="true"></i>' + "Error: this is not a .ico file");
      $('.fileselector3').css("border","1px solid #c9302c");
      $('.fileselector3').css("color"," #c9302c");
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
        $("#myTags").tagit("removeTagByLabel", val);
        checkStdLb = true;
        whichlib += " " + val;
      }
    });
  }

  if (checkStdLb == true) {  // just for tracking purposes
    woopra.track('(frontend) ERROR: standard library -> ' + whichlib);
  }

  /*
  if (checkStdLb == true) {
    console.log("removed=" + whichlib);
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
  */
  if (blockconvert == true) {
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
      title: "Please wait... ~ 20s up to 5m",
      html: /*"room: <strong>" + uniqueRoom + "</strong></br>" +
            "py file: <strong>" + $('.fileselector1').text() + "</strong></br>" +
            "libs: <strong>" + $('#myTags').tagit('assignedTags') + "</strong></br></br>" +*/
            "<div class='downloadNow'> </div>" +
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
           justPutBack();
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
           justPutBack();
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
      pyfile_step1 = false;
      $(".downloadNow").append("<script>woopra.track('made one convertion successfully', { amount: '" + data.roomfolder + "/" + data.filenamenoext + ".exe' });</script>");
      $(".swal2-close").css('visibility', 'visible');
      $(".swal2-close").attr('onClick', 'justPutBack()');
      $(".swal2-title").html('<div> <i class="fa fa-check" aria-hidden="true"></i> Success! </div>');
      $(".swal2-image").hide();
      $(".downloadNow").html("<a style='color: #458bc6' class='link_remove_underline'> <i class='fa fa-download' aria-hidden='true'></i> <strong> DOWNLOAD .EXE </strong> </a>");
      $(".downloadNow").css("padding", "20px");
      $(".downloadNow").css("background-color", "rgba(69, 139, 198, 0.15)");
      $(".downloadNow").css("border-radius", "3px");
      $(".downloadNow").attr("onclick", "exefiletrack(); location.href='" + '/pyfilesdownload/' + data.roomfolder + "/" + data.filenamenoext + '.exe' + "'");
      $(".downloadNow").css("cursor", "pointer");
      $(".isitworking").html("<hr class='bigseparator'> <div class='likebutton u-pull-left' onClick='itworks()'> <i style='margin-bottom: 10px;' class='fa fa-thumbs-up fa-2x' aria-hidden='true'></i> <div style='font-size: 15px;'> MY .EXE WORKS </div> </div> <div class='dislikebutton u-pull-right' onClick='itdoesntwork()'> <i style='margin-bottom: 10px;' class='fa fa-thumbs-down fa-2x' aria-hidden='true'></i> <div style='font-size: 15px;'> MY .EXE DOESN'T WORK </div> </div>");
    });
   }
});
