$(document).ready(function(){

	function expandDiv(){
		$('.background-image').toggleClass('changed');
		$('.main').toggleClass('main-changed');
		$('#logo').toggleClass('hidden');
		$('.credits').toggleClass('hidden');
		$('#weather-icon').toggleClass('hidden');

		//set text to minimise or expand
		var originalText = $('#expand-btn').text().trim();

		if(originalText === 'Expand'){
			$('#expand-btn').text('Minimise');
			return;
		} else {
            $('#expand-btn').text('Expand');
        }
	}//expandDiv

	$('#expand-btn').click(expandDiv);

	//get user location
	$.getJSON("http://freegeoip.net/json/", getUserLocation);
	var city, latitude, longitude;

	function getUserLocation(data){
		city = data.city;
		latitude = data.latitude;
		longitude = data.longitude;
    	$('#city-name').html(city + ", " + data.region_name);


    	var wundergroundAPI = 'https://api.wunderground.com/api/1fd8a0bdde10363b/geolookup/conditions/q/' + latitude + ',' + longitude + '.json';
		$.getJSON(wundergroundAPI, setWeatherData);

		//callback
		function setWeatherData(json){
			$('#temp-num').html(Math.round(json.current_observation.temp_c));
			$('#weather-main').html(json.current_observation.weather);

			setBackground(json.current_observation.weather);			

			var tempInCelsius = parseInt($('#temp-num').text(), 10);
	
			//change fron celsius to fahrenheit and back
			$('#temp-measure').click(function(){

				var text = $(this).text().trim();
			
				if (text === 'C'){
					$('#temp-measure').html('F');
					var tempInFah = ((tempInCelsius * 9)/5) + 32;
					$('#temp-num').html(tempInFah);
				} else if(text === 'F'){
					$('#temp-measure').html('C');
					$('#temp-num').html(tempInCelsius);
					
				}
			});//temp-measure click
		}//setWeatherData
	}//getUserLocation


	function setBackground(desc){

		var backgroundImgUrl;

		if(desc.includes("Cloud") || desc.includes("Overcast")){
			backgroundImgUrl = "url(img/cloudy.jpg)";
			$('#weather-icon').addClass(' wi-cloudy');
		} else if(desc.includes("Clear")){
			backgroundImgUrl = "url(img/clear.jpg)";
			$('#weather-icon').addClass(' wi-night-clear');
		} else if(desc.includes("Rain") || desc.includes("Spray") || desc.includes("Hail")){
			backgroundImgUrl = "url(img/rain.jpg)";
			$('#weather-icon').addClass(' wi-rain');
		} else if(desc.includes("Fog") || desc.includes("Mist") || desc.includes("Haze")){
			backgroundImgUrl = "url(img/fog.jpg)";
			$('#weather-icon').addClass(' wi-fog');
		} else if(desc.includes("Drizzle")){
			backgroundImgUrl = "url(img/drizzle.jpeg)";
			$('#weather-icon').addClass(' wi-showers');
		} else if(desc.includes("Snow") || desc.includes("Ice") || desc.includes("Freezing")){
			backgroundImgUrl = "url(img/snowy.jpg)";
			$('#weather-icon').addClass(' wi-snow');
		} else if(desc.includes("Thunderstorm")){
			backgroundImgUrl = "url(img/thunderstorm.jpg)";
			$('#weather-icon').addClass(' wi-thunderstorm');
		} else{
			backgroundImgUrl = "url(img/what.png)";
			$('#weather-icon').addClass(' wi-cloud-refresh');
		}

		$('.background-image').css('background-image', backgroundImgUrl);
	}
		

});