$(document).ready(function(){
  
  channel = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  
  for (i = 0; i < channel.length; i++) {
    function makeStreamsURL() {
      return "https://wind-bow.glitch.me/twitch-api/streams/" + channel[i] + "?callback=?";
    }
    
    function makeChannelsURL() {
      return "https://wind-bow.glitch.me/twitch-api/channels/" + channel[i] + "?callback=?";
    }
    
    $.getJSON(makeStreamsURL(), function(data) {
      if(data.stream==null) {
        var urlFull = data._links.self;
        var urlSlug = urlFull.substring(urlFull.lastIndexOf('/') + 1)
        $("#offline").append("<b>" + urlSlug + ":</b></br> Offline<hr/>")
      } else {
        $("#status").prepend( "<b>" + data.stream.channel.display_name + ":</b></br>" + "<a href='" + data.stream.channel._links.self + " ' target='_blank'>" + data.stream.channel.game + ", " + data.stream.channel.status + "</a><hr/>")
     }
    });
    
    $.getJSON(makeChannelsURL(), function(data) {
      if(data.status=="404") {
        $("#nochannel").prepend(data.message + "<hr/>")
      }
    });
  }    
})