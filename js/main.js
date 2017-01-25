$(document).ready(function(){
	
	$('#expand-btn').click(expandDiv);

	function expandDiv(){
		$('.background-image').toggleClass('changed');
		$('.main').toggleClass('main-changed');
		$('#logo').toggleClass('hidden');
		$('#info-expanded').toggleClass('hidden');
		$('#weather-desc').toggleClass('hidden');


        var originalText = $(this).text().trim();

        $("#expand-btn").text("Minimise");

        if (originalText == "Minimise") {
            $(this).text("Expand");
        }
	}



	//get city location
	$.getJSON("http://freegeoip.net/json/", getUserLocation);
	var city, latitude, longitude;

	function getUserLocation(data){
		city = data.city;
		latitude = data.latitude;
		longitude = data.longitude;
    	$('#city-name').html(city);

    	var openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID=7d5c5edd1c7087657932772fe42c8d39";
		$.getJSON(openWeatherAPI, setWeatherData);

		//callback
		function setWeatherData(json){
			$('#temp-num').html(Math.round(json.main.temp));
			$('#weather-main').html(json.weather[0].main);

			var backgroundImgUrl;
			switch(json.weather[0].main){
				case "Clouds":
					backgroundImgUrl = "url(img/cloudy.jpg)";
					$('#weather-icon').addClass(' wi-cloudy');
					break;
				case "Drizzle": 
					backgroundImgUrl = "url(img/drizzle.jpeg)";
					$('#weather-icon').addClass(' wi-showers');
					break;
				case "Rain": 
					backgroundImgUrl = "url(img/rain.jpg)";
					$('#weather-icon').addClass(' wi-rain');
					break;
				case "Snow": 
					backgroundImgUrl = "url(img/snowy.jpg)";
					$('#weather-icon').addClass(' wi-snow');
					break;
				case "Sunny":
					backgroundImgUrl = "url(img/sunny.jpg)";
					$('#weather-icon').addClass(' wi-hot');
					break;
				case "Clear":
					backgroundImgUrl = "url(img/clear.jpg)";
					$('#weather-icon').addClass(' wi-night-clear');
					break;
				case "Thunderstorm":
					backgroundImgUrl = "url(img/thunderstorm.jpg)";
					$('#weather-icon').addClass(' wi-thunderstorm');
					break;
				default:
					backgroundImgUrl = "url(img/sunny.jpg)";
					$('#weather-icon').addClass(' wi-hot');
			}
			$('.background-image').css('background-image', backgroundImgUrl);
			$('#info-expanded').html((json.weather[0].description).toUpperCase());
		

			var tempInCelsius = parseInt($('#temp-num').text(), 10);
	
			//change fron celsius to fahrenheit
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
			});


		}


	}


});