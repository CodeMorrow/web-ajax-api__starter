window.addEventListener("load", function() {

	var update = new XMLHttpRequest();
	update.open ("GET", "api");
	update.send();

	update.addEventListener("load", function(e){
		
		var response = JSON.parse(e.target.response);

		var currentWeather = document.getElementById("currentWeather");
		var currentTemp = document.getElementById("currentTemp");
		var dailySummary = document.getElementById("dailySummary");
		var sunrise = document.getElementById("sunrise");
		var sunset = document.getElementById("sunset");
		var chanceOfRain = document.getElementById("chanceOfRain");
		var humidity = document.getElementById("humidity");
		var wind = document.getElementById("wind");
		var realTemp = document.getElementById("realTemp");
		var precipitation = document.getElementById("precipitation");
		var pressure = document.getElementById("pressure");
		var visibility = document.getElementById("visibility");

		
	});
});