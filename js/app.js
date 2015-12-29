var colors = ["#f1d52b", "#f0a562", "#f05f66", "#f0a2bc", "#b98fbf", "#3392ca", "#59c2e2", "#C2D67F"];
var deg = ['-3deg', '-2deg', '-1deg', '0deg', '1deg', '2deg', '3deg'];
var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","medrybw","RobotCaleb","noobs2ninjas","brunofin"];
var streamerObjects =[];
var baseUrl = 'https://api.twitch.tv/kraken';
var deferreds = [];

$(document).ready(function (){
  getTwitchData();

  $(document).on("click", "div.post-it", function() {
    var id = this.id.slice(-1);
    window.open(streamerObjects[id].url);
  });
});



function getTwitchData() {
  // body...

$.each(streamers, function (i) {
  deferreds.push($.getJSON(baseUrl + '/channels/' + streamers[i]).success( function(data) {
    streamerObjects.push(data);
  }).fail(function (err) {

  }));

});
$.whenAll(deferreds).then(function() {
  $.each(streamerObjects, function (i) {
    deferreds.push($.getJSON(baseUrl + '/streams/' + streamerObjects[i].name, function(data) {
      streamerObjects[i].stream = data.stream;
      var img = streamerObjects[i].logo || 'http://s15.postimg.org/ainj11qmv/noimg.jpg';
      var colorIndex = Math.floor(Math.random() * colors.length);
      var degIndex = Math.floor(Math.random() * deg.length);
      var name = streamerObjects[i].display_name;
      var onlineStatus = (streamerObjects[i].stream === null) ? "Not Streaming" : "LIVE NOW";
      $('.frame').append('<div class="post-it" id="post-it' + i + '"></div');
      $('#post-it' + i).append('<blockquote class="note" id="note' + i + '"><img class="streamerImg" src="'+ img +'"> '+ name +'</blockquote>');
      $('#note' + i).append('<div class="streaming" id="streaming' + i +'">'+ onlineStatus +'</div>');
      if (onlineStatus === "LIVE NOW"){
        $('#streaming' + i).css({"color": "#0f0"});
        $('#note' + i).append('<div class="online">' + streamerObjects[i].stream.game + '</div>');
      }else{
        $('#streaming' + i).css({"color": "#f00"});
      }

      $('#note' + i).css({"background": colors[colorIndex], "transform": "rotate(" + deg[degIndex] + ")"});
    }));
  });
});
$.whenAll(deferreds).then(function () {
  console.log(streamerObjects);
});
/*
  $.each(streamers, function(i) {
        (function(i) { // protects i in an immediately called function
          $.getJSON(baseUrl + '/channels/' + streamers[i]).success( function (data) {
            streamerObjects.push(data);
            $.getJSON(baseUrl + '/streams/' + streamerObjects[i]).success( function (data) {
              streamerObjects[i].stream = data.stream;

              console.log('Generate html for: ', i);
                var img = streamerObjects[i].logo || 'http://s15.postimg.org/ainj11qmv/noimg.jpg';
                var colorIndex = Math.floor(Math.random() * colors.length);
                var degIndex = Math.floor(Math.random() * deg.length);
                var name = streamerObjects[i].display_name;
                var onlineStatus = (streamerObjects[i].stream === null) ? "Not Streaming" : "LIVE NOW";
                $('.frame').append('<div class="post-it" id="post-it' + i + '"></div');
                $('#post-it' + i).append('<blockquote class="note" id="note' + i + '"><img class="streamerImg" src="'+ img +'"> '+ name +'</blockquote>');
                $('#note' + i).append('<div class="streaming" id="streaming' + i +'">'+ onlineStatus +'</div>');
                if (onlineStatus === "LIVE NOW"){
                  $('#streaming' + i).css({"color": "#0f0"});
                }else{
                  $('#streaming' + i).css({"color": "#f00"});
                }

                $('#note' + i).css({"background": colors[colorIndex], "transform": "rotate(" + deg[degIndex] + ")"});
            //  generateHtml(i);
          });
          });
        })(i);
    });*/
}

(function($) {
    $.whenAll = function(deferreds) {
        return $.when.apply($, deferreds);
    };
})(jQuery);
/*
function generateHtml(i) {
  // body...
  console.log('Generate html for: ', i);
    var img = streamerObjects[i].logo || 'http://s15.postimg.org/ainj11qmv/noimg.jpg';
    var colorIndex = Math.floor(Math.random() * colors.length);
    var degIndex = Math.floor(Math.random() * deg.length);
    var name = streamerObjects[i].display_name;
    var onlineStatus = (streamerObjects[i].stream === null) ? "Not Streaming" : "LIVE NOW";
    $('.frame').append('<div class="post-it" id="post-it' + i + '"></div');
    $('#post-it' + i).append('<blockquote class="note" id="note' + i + '"><img class="streamerImg" src="'+ img +'"> '+ name +'</blockquote>');
    $('#note' + i).append('<div class="streaming" id="streaming' + i +'">'+ onlineStatus +'</div>');
    if (onlineStatus === "LIVE NOW"){
      $('#streaming' + i).css({"color": "#0f0"});
    }else{
      $('#streaming' + i).css({"color": "#f00"});
    }

    $('#note' + i).css({"background": colors[colorIndex], "transform": "rotate(" + deg[degIndex] + ")"});

}
*/
