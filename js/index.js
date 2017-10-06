//"http://api.wunderground.com/api/07d4e3fb39202f3d/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json"

$(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude;
      $.getJSON(weatherUrl, function(data) {
        console.log(data);
        document.getElementById("city").innerHTML = data['name'] + ", " + data['sys']['country'];
        document.getElementById("temp-c").innerHTML = Math.round(data['main']['temp']) + " C° in ";
        document.getElementById("temp-f").innerHTML = Math.round((data['main']['temp'] * 9) / 5 + 32) + " F° in ";
        document.getElementById("weather").innerHTML = data.weather[0].main;
        if(data.weather[0].main == "Clouds") {
          $("body").css("background-image", "url(https://tau0.files.wordpress.com/2012/11/rolling_hills_cloudy_skies.jpg)");
        } else if(data.weather[0].main == "Clear") {
          $("body").css("background-image", "url(https://static.pexels.com/photos/188029/pexels-photo-188029.jpeg)") 
        } else if(data.weather[0].main == "Rain") {
          $("body").css("background-image", "url(https://images5.alphacoders.com/407/407884.jpg)");
        } else if(data.weather[0].main == "Snow") {
          $("body").css("background-image", "url(http://wallup.net/wp-content/uploads/2015/12/155439-landscape-snow-forest-mountain.jpg)");
        } else {
          $("body").css("background-image", "url(http://wallpapercave.com/wp/kwt3LcL.jpg)");
        }
        $("#icon").attr('src', data.weather[0].icon);
        $("#scale").on("click", function() {
          if($("#temp-c").hasClass("hidden")){
            $("#temp-c").removeClass("hidden");
            $("#temp-f").addClass("hidden");
          } else {
            $("#temp-f").removeClass("hidden");
            $("#temp-c").addClass("hidden");
          }
        });
      });
    });
  }
});