/*

var socket = io.connect();
var uniqueRoom = Date.now();
var bar = document.getElementById('pbar');

function convertstart(){
  $(".whatcurrent").text('starting conversion on room ' + uniqueRoom);
  $(".startconv").attr("disabled", true);
  $(".startconv").text("");
  $(".startconv").append("<img width=30px src='http://www.eroshotels.co.in/image/timer.gif'>");
  socket.emit("subscribe", { room: uniqueRoom });
  socket.emit('convertstart', uniqueRoom);
  bar.value += 30;
}

socket.on('step1', function(data){
  $(".whatcurrent").text('libraries installed, now running pyinstaller... ');
  bar.value += 40;
});

socket.on('step2', function(data){
  bar.value += 20;
});

socket.on('step3', function(data){
  bar.value += 10;
  $(".startconv").attr("disabled", false);
  $(".downloadlink").attr('href', "/pyfilesdownload/" + data.unique_id + "/" + data.pyfilewithoutext + ".exe")
  $(".startconv").text("download "+data.pyfilewithoutext+".exe");
  $(".startconv").removeAttr("onclick");
  $(".whatcurrent").text('success: .py file converted ! ');
});

*/

/* UPLOAD BTN */
$(function(){
  $('#myTags').tagit();
});

pyfile_step1 = false;
pyversion_step2 = 0;

$('.pythonversion2').on('click', function () {
  $('.pythonversion2').css({'border':'solid 3px darkgrey', 'color':'grey'});
  $('.pythonversion3').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  // window.chosenversion = 2;
  pyversion_step2 = 2;
});

$('.pythonversion3').on('click', function () {
  $('.pythonversion3').css({'border':'solid 3px darkgrey', 'color':'grey'});
  $('.pythonversion2').css({'border':'solid 3px #EEEEEE', 'color':'lightgrey'});
  // window.chosenversion = 3;
  pyversion_step2 = 3;
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
              // $('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                $('.fileselector1').text(file.name);
                // socket.emit("pyfileuploaded", file.name);
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

  // var files = $(this).get(0).files;
  // console.log($(this).get(0).files);

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

  var progress_status = 0;

  // console.log(pyfile_step1);
  // console.log(pyversion_step2);
  if (pyfile_step1 != true) {
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
    // var bar = document.getElementById('pbar');
    /*
    $(".whatcurrent").text('Status: starting convertion on room ' + uniqueRoom + ' ...');
    $(".whatcurrent").css('visibility', "visible");
    $(".convbut").attr("class", "no-click button button-primary convbut");
    $(".convbut").text("");
    $(".convbut").append("<div class='loader'></div>");
    */
    // socket.emit("subscribe", { room: uniqueRoom });
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

    /*socket.on('step0', function(data){
      // loopprogress(0, 11);
      socket.emit('step0_1');
    });*/

    function loopprogress(p_start, p_end) {
      for(var i = p_start; i < p_end; i++) {
        (function(i){
          setTimeout(function(){
            console.log(i + "/100");
            $(".uk-progress").css('width', i + '%');
            $(".uk-progress").text(i + '%');
          }, 1000 * i)
        })(i)
      }
    }

    function movebar(where) {
      $(".uk-progress").css('width', where + '%');
      $(".uk-progress").text(where + '%');
    }

    socket.on('step1', function(data){
      $(".alert_conv_stat").text("Installing " + $('#myTags').tagit('assignedTags') + "...");
      // loopprogress(12, 41);
      //socket.emit('step1_2');
      // progress_status = 10;
      movebar(25);
      // console.log("progress: " + progress_status);
   });

   socket.on('step2', function(data){
     $(".alert_conv_stat").text("Running PyInstaller...");
     // loopprogress(42, 71);
     // socket.emit('step2_3');
     // progress_status = 30;
     movebar(45);
     // console.log("progress: " + progress_status);
  });

/*
 socket.on('step4', function(data){
   // progress_status = 100;
   movebar(100);
 });
*/

 socket.on('step3', function(data){
   movebar(100);
   // progress_status = 100;
   $(".swal2-close").css('visibility', 'visible');
   $(".alert_conv_stat").text("");
   $(".swal2-title").text("Done!");
   $(".swal2-image").attr("src", "https://camo.githubusercontent.com/54dab78d3ee6afdb2400b4f1710f91dcc97bffae/68747470733a2f2f7261772e6769746875622e636f6d2f6c696d6f6e74652f7377656574616c657274322f6d61737465722f6173736574732f7377616c322d737563636573732e706e67");
   $(".alert_conv_stat").append("<a class='link_remove_underline' href='/pyfilesdownload/" + data.roomfolder + "/" + data.filenamenoext + ".exe'>download .exe here</a>")
   // console.log("progress: " + progress_status);
   // loopprogress(42, 71);
   // socket.emit('step2_3');
});
/*

    socket.on('step2', function(data){
      $(".alert_conv_stat").text("Running PyInstaller through Wine...")
      for(var i = 30; i < 70; i++) {
        (function(i){
          setTimeout(function(){
            $(".uk-progress").css('width', i + '%');
            $(".uk-progress").text(i + '%');
        }, 100 * i)
       })(i);
      }
    });
    */

    /*

    socket.on('step3', function(data){
      $(".alert_conv_stat").text("Moving .exe file to the right folder...")
      for(var i = 70; i < 101; i++) {
        (function(i){
          setTimeout(function(){
            $(".uk-progress").css('width', i + '%');
            $(".uk-progress").text(i + '%');
        }, 10 * i)
       })(i);
      }
    });

    */

    // $(".alert_conv_stat").text("");
    // $(".alert_conv_stat").append("<a href='/pyfilesdownload/" + data.roomfolder + "/" + data.filenamenoext + ".exe'> Convertion finished, download your exe file here </a>");

  }
/*
  socket.on('step1', function(data){
    $(".whatcurrent").text('libraries installed, now running pyinstaller... ');
    // bar.value += 40;
  });

  socket.on('step2', function(data){
    // bar.value += 20;
  });

  socket.on('step3', function(data){
    // bar.value += 10;
    $(".convbut").attr("disabled", false);
    $(".convbut").attr('href', "/pyfilesdownload/" + data.unique_id + "/" + data.pyfilewithoutext + ".exe")
    $(".convbut").text("download "+data.pyfilewithoutext+".exe");
    $(".convbut").removeAttr("onclick");
    $(".whatcurrent").text('success: .py file converted ! ');
  });
*/

});
