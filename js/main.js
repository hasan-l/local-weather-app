var LocalWeatherApp = function(){

	//cached jQuery objects
	var $expandBtn = $('#expand-btn');
	var $weatherIcon = $('#weather-icon');
	var $backgroundImg = $('.background-image');
	var $tempNum = $('#temp-num');
	var $tempMeasure = $('#temp-measure');

	$expandBtn.click(expandDiv);
	
	function expandDiv(){
		//implements blur on background when div expanded
		$backgroundImg.toggleClass('changed');
		//increases container size with a transition
		$('.weather-container').toggleClass('weather-container-changed');
		$('#logo').toggleClass('hidden');
		$('.credits').toggleClass('hidden');
		$weatherIcon.toggleClass('hidden');

		//set text content of button to minimise if expanded and vice versa
		var originalText = $expandBtn.text().trim();

		if(originalText === 'Expand'){
			$expandBtn.text('Minimise');
			return;
		} else {
            $expandBtn.text('Expand');
        }
	}//expandDiv


	//get user location via AJAX call
	$.getJSON("https://freegeoip.net/json/", getUserLocation);

	function getUserLocation(data){
		var city = data.city;
		var latitude = data.latitude;
		var longitude = data.longitude;
		//inputs 'city, Region' into span, i.e. Slough, England
    	$('#city-name').html(city + ", " + data.region_name);

    	var wundergroundAPI = 'https://api.wunderground.com/api/1fd8a0bdde10363b/geolookup/conditions/q/' + latitude + ',' + longitude + '.json';
    	//get and set the weather data via AJAX call after other call is complete (nested callbacks)
		$.getJSON(wundergroundAPI, setWeatherData);

		//callback
		function setWeatherData(json){
			$tempNum.html(Math.round(json.current_observation.temp_c));
			$('#weather-info').html(json.current_observation.weather);

			setBackground(json.current_observation.weather);			

			var tempInCelsius = parseInt($tempNum.text(), 10);
	
			//change fron celsius to fahrenheit and back
			$tempMeasure.click(function(){

				var text = $(this).text().trim();
			
				if (text === 'C'){
					$tempMeasure.html('F');
					var tempInFah = ((tempInCelsius * 9)/5) + 32;
					$tempNum.html(tempInFah);
				} else if(text === 'F'){
					$tempMeasure.html('C');
					$tempNum.html(tempInCelsius);
				}
			});//temp-measure click
		}//setWeatherData
	}//getUserLocation

	//sets Background image based on description on weather data found in JSON format from API call
	function setBackground(desc){

		var backgroundImgUrl = '';

		if(desc.includes("Cloud") || desc.includes("Overcast")){
			backgroundImgUrl = "url(img/cloudy.jpg)";
			$weatherIcon.addClass(' wi-cloudy');
		} else if(desc.includes("Clear")){
			backgroundImgUrl = "url(img/clear.jpg)";
			$weatherIcon.addClass(' wi-night-clear');
		} else if(desc.includes("Rain") || desc.includes("Spray") || desc.includes("Hail")){
			backgroundImgUrl = "url(img/rain.jpg)";
			$weatherIcon.addClass(' wi-rain');
		} else if(desc.includes("Fog") || desc.includes("Mist") || desc.includes("Haze")){
			backgroundImgUrl = "url(img/fog.jpg)";
			$weatherIcon.addClass(' wi-fog');
		} else if(desc.includes("Drizzle")){
			backgroundImgUrl = "url(img/drizzle.jpeg)";
			$weatherIcon.addClass(' wi-showers');
		} else if(desc.includes("Snow") || desc.includes("Ice") || desc.includes("Freezing")){
			backgroundImgUrl = "url(img/snowy.jpg)";
			$weatherIcon.addClass(' wi-snow');
		} else if(desc.includes("Thunderstorm")){
			backgroundImgUrl = "url(img/thunderstorm.jpg)";
			$weatherIcon.addClass(' wi-thunderstorm');
		} else{
			backgroundImgUrl = "url(img/what.png)";
			$weatherIcon.addClass(' wi-cloud-refresh');
		}

		$backgroundImg .css('background-image', backgroundImgUrl);
	}

	return{
		setBackground: setBackground
	}
}();