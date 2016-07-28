window.addEventListener("load", function() {

	var update = new XMLHttpRequest();
	update.open ("GET", "api");
	update.send();

	update.addEventListener("load", function(e){
		
		var response = JSON.parse(e.target.response);

		var currentWeather = document.getElementById("currentWeather");
		var currentTemp = document.getElementById("currentTemp");
		var todayHighTemp = document.getElementById("todayHighTemp");
		var todayLowTemp = document.getElementById("todayLowTemp");
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


		currentWeather.innerHTML = response.currently.summary;
		currentTemp.innerHTML = Math.round(response.currently.apparentTemperature) + "&deg;";
		todayHighTemp.innerHTML = Math.round(response.daily.data[0].temperatureMax) + "&deg;";
		todayLowTemp.innerHTML = Math.round(response.daily.data[0].temperatureMin) + "&deg;";
		dailySummary.innerHTML = "Today: " + response.daily.summary;
		sunrise.innerHTML = convertTime(response.daily.data[0].sunriseTime);
		sunset.innerHTML = convertTime(response.daily.data[0].sunsetTime);
		chanceOfRain.innerHTML = response.daily.data[0].precipProbability + "%";
		humidity.innerHTML = response.daily.data[0].humidity * 100 + "%";
		wind.innerHTML = Math.round(response.daily.data[0].windSpeed) + " mph " + degToCompass(response.daily.data[0].windBearing);
		realTemp.innerHTML = Math.round(response.daily.data[0].apparentTemperatureMax) + "&deg;";
		precipitation.innerHTML = response.daily.data[0].precipIntensity + " in";
		pressure.innerHTML = Math.round(29.92 * response.daily.data[0].pressure / 1013.25) + " in";
		visibility.innerHTML = response.daily.data[0].visibility + " mi";
		populateHourlyTemps(response.hourly.data);
		populateDailyHighs(response.daily.data);
		populateDailyLows(response.daily.data);

		function convertTime (unixTime){
	    	var date = new Date(unixTime*1000);
			var hours = date.getHours();
			var minutes = "0" + date.getMinutes();
			return hours + ':' + minutes.substr(-2);
	    };

	    function populateHourlyTemps (hourlyData){
	    	var tempArr = document.getElementsByClassName("hourlyTemp");
	    	for (i = 0; i < tempArr.length; i++){
	    		tempArr[i].innerHTML = Math.round(hourlyData[i+7].temperature) + "&deg;";
	    	}
	    };

	  	function populateDailyHighs (highData){
	    	var highArr = document.getElementsByClassName("dayHighTemp");
	    	for (i = 0; i < highArr.length; i++){
	    		highArr[i].innerHTML = Math.round(highData[i].temperatureMax) + "&deg;";
	    	}
	    };

		function populateDailyLows (lowData){
	    	var lowArr = document.getElementsByClassName("dayLowTemp");
	    	for (i = 0; i < lowArr.length; i++){
	    		lowArr[i].innerHTML = Math.round(lowData[i].temperatureMin) + "&deg;";
	    	}
	    };  

	    function degToCompass(num) {
            var val = Math.floor((num / 45) + 0.5);
            var arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
            return arr[(val % 8)];
        };

	});
});