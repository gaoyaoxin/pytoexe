// tracking
(function(){
  var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
})("woopra");
woopra.config({
  domain: 'py2exe.net'
});
woopra.track();

function exefiletrack() {
  woopra.track("downloaded .exe file", {
          amount: "-",
  });
}


// refresh function
function refreshfunc() {
  location.reload();
}


/* UPLOAD BTN */
$(function(){
  $('#myTags').tagit();
});

pyfile_step1 = false;

pyversion_step2 = 3;

/*
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

    if ((file.name).indexOf(".py") > -1) {
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

    if ((file.name).indexOf(".ico") > -1) {
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
                // socket.emit("pyfileuploaded", file.name);
              }
            }
          }, false);
          return xhr;
        }
      });
    } else {
      $('.fileselector3').text("Error: this is not a .ico file");
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

  var progress_status = 0;

  if (blockconvert == true) {
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
  } else {

    var socket = io.connect();
    var uniqueRoom = Date.now();

    woopra.track('started one convertion...', { amount: uniqueRoom + "/" + $('.fileselector1').text() });

    socket.emit('convertstart', { room: uniqueRoom,
                                  filename: $('.fileselector1').text(),
                                  libs: $('#myTags').tagit('assignedTags'),
                                  additionalfiles: $('.fileselector2').text(),
                                  icofile: $('.fileselector3').text()
                                });
    swal({
      title: "Please wait...",
      html: "room: <strong>" + uniqueRoom + "</strong></br>" +
            "py file: <strong>" + $('.fileselector1').text() + "</strong></br>" +
            "libs: <strong>" + $('#myTags').tagit('assignedTags') + "</strong></br></br>" +
            "<div class='alert_conv_stat'> </div>" +
            "<div class='uk-progress uk-progress-striped uk-active' style='width: 0%;'> 0% </div>",
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

    socket.on('error_happenned', function(data){
       swal.close();
       swal({
         title: "Error!",
         text: "Unexpected error, please try again",
         type: "error",
         showCancelButton: false,
         showConfirmButton: true,
         allowOutsideClick: false,
         allowEscapeKey: false,
         showCloseButton: false
       }).then((result) => {
         if (result.value) {
           location.reload();
           woopra.track('got an unexpected error', { amount: uniqueRoom + "/" + $('.fileselector1').text() });
         }
       })
    });

    socket.on('step1', function(data){
       $(".alert_conv_stat").text("Installing " + $('#myTags').tagit('assignedTags') + "...");
       movebar(25);
     });

    socket.on('step2', function(data){
       $(".alert_conv_stat").text("Running PyInstaller...");
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
       $(".swal2-image").attr("src", "https://camo.githubusercontent.com/54dab78d3ee6afdb2400b4f1710f91dcc97bffae/68747470733a2f2f7261772e6769746875622e636f6d2f6c696d6f6e74652f7377656574616c657274322f6d61737465722f6173736574732f7377616c322d737563636573732e706e67");
       $(".alert_conv_stat").append("<a onClick='exefiletrack()' class='link_remove_underline' href='/pyfilesdownload/" + data.roomfolder + "/" + data.filenamenoext + ".exe'>download .exe here</a>");
       $(".alert_conv_stat").append("<script>woopra.track('made one convertion successfully', { amount: '" + data.roomfolder + "/" + data.filenamenoext + ".exe' });</script>");
     });
   }
});
