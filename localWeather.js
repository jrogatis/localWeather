
// JavaScript Document
 'use strict';
var wKey = "438e296b695c5e45a161426407c0b2c2";
var frKey = "12da02b5459e1186526f8f83d108b686";
var googleMapsKey = 'AIzaSyAkPuviFCSHpqIqLH18J2jrbArgO_xmtDc';
 var lat;
 var long;
var gScale = "celsius";
var gTemp;
var gTempMax;
var gTempMin;
var gPressure;

$(document).ready(function() {
	
	$.getScript("localizationFunctions.js");

	$("#button-conversion").button(); 
		 
	//pega a posição  e transforma em text    
	$( "#button-conversion" ).button().click(function(){
		//alert($("#button-conversion").text());
		if (  gScale === 'celsius' )   {
			  gScale = "fahrenheit";
		  
			placeValues (CelsiusToFarenheit(gTemp),CelsiusToFarenheit(gTempMin), CelsiusToFarenheit(gTempMax), gPressure, 'F');		
			
			} else {
				gScale = 'celsius';
				placeValues (gTemp,gTempMin, gTempMax, gPressure, 'C');
				
				}
		
	 });
	 
	 //aqui eu tenho que chamar pela 1 vez os gets... como fazer assinc ?
	 navigator.geolocation.getCurrentPosition(success, error, options);
	
	 
});

/**********************************************************************/
/* funcao que coloca as variaveis no lugar */

function placeValues (temp, tempMin, tempMax, pressure, scale) {
	
	 if (scale === 'F') {
		 $( "#button-conversion" ).text('to \xB0C' );
		  scale = ' \xB0F.';
		 } else {
		$( "#button-conversion" ).text('to \xB0F' );
			 scale =  ' \xB0C.' ;}  
	 
		 $("#temp").text("Temp: " + temp + scale );
		 $("#pressure").text("Pressure: "+  pressure  + ' hPa.');
		 $("#temp_max").text("Min. Temp: "+ tempMin + scale);
		 $("#temp_min").text("Max. Temp: "+ tempMax + scale);
	  		
	
	}
	
/**********************************************************************/
/* funcões de conversão */
	
function CelsiusToFarenheit(temp){
	
		return temp * 9 / 5 + 32 ;  
	}

	function kalvinToCelsius(temp){
		
		return ((Math.round((temp - 273.15)*10))/10).toFixed(2) ;
		
		}
	function FarenheitToCelsius(temp){

		return (temp - 32) * 5 / 9 ;  
	}
		

/**********************************************************************/
/* funcões de localizão */











//acha a long e lati
/*	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};		

	function success(pos) { 
		
	  var crd = pos.coords;
	  
	  lat = crd.latitude;
	  long = crd.longitude;
	  //agora que tenho a lat e long acho o nome da cidade...  e o tempo dela
	   displayLocation(lat,long);
	   //getWeather(lat,long);
	   //getWeather2(lat,long);
	}
	
	function error(err) {
		
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	}
	
	

//funcão para buscar no google o end
 function displayLocation(latitude,longitude){
	
        var request = new XMLHttpRequest();
        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=false';
        var async = false;
		console.log(url);
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState === 4 && request.status === 200){
			  
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
		//AQUI carrego a cidade e pais
            $("#city").text(address.address_components[3].long_name + ' - ' + address.address_components[6].long_name);	
	
          }
        };
        request.send();
		
		
      }


function getWeather(latitude, longitude) {
    var temperature = 0;
    var dfd = $.Deferred();
	var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude + '&APPID=' + wKey;
   /* var url = "http://api.openweathermap.org/data/2.5/weather?lat=";
    url += latitude;
    url += "&lon=";
    url += longitude;
    url += "&cnt=1";*/
   /* $.ajax({
        type: "POST",
        dataType: "jsonp",
        url: url + "&callback=?",
        async: false,
        success: function (data) {
            temperature = data.main.temp_min;
            alert(temperature);
            dfd.resolve(temperature);
        },
        error: function (errorData) {
            alert("Error while getting weather data :: " + errorData.status);
        }
    });
    return dfd.promise();
}

    //funcão para buscar o tempo
	/*function getWeather(latitude,longitude){
     $.ajax({
       type:"GET",
       url:'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude + '&APPID=' + wKey,
       dataType : "jsonp",
       success:function(result){
           console.log(result);       
       },
       error: function(xhr, status, error) {
           console.log(status);
       }
     });
    }
		
	/*
        var request = new XMLHttpRequest();
        var method = 'GET';
        //var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude + '&APPID=' + wKey;
		var url = "https://api.forecast.io/forecast/" + frKey + "/" + latitude + "," + longitude;
		console.log(url);
        var async = false;

        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState === 4 && request.status === 200){
			  
            var data = JSON.parse(request.responseText);
			//var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			//var tempK =  data[0].temperature;
			alert(data[0].latitude);
			//var tempMinK=  data.main.temp_min;
			//var tempMaxK=  data.main.temp_max;
			
			//gTemp =  kalvinToCelsius(tempK);
			/*gTempMin=  kalvinToCelsius(tempMinK);
			gTempMax=  kalvinToCelsius(tempMaxK);
			gPressure = data.main.pressure;
			
			$("#weather_icon").attr('src', icon);
			//placeValues(gTemp,gTempMin,gTempMax,gPressure , 'C' );
            
          } 
        };
        request.send(); */

//nova funcào para buscar o tempo
/*function getWeather2 (latitude,longitude){
	
	 var urlFr = "https://api.forecast.io/forecast/" + frKey + "/" + latitude + "," + longitude;
$.ajax({
	crossDomain: true,
    crossOrigin: true,
	dataType: 'json',
    url: urlFr,
    success: function(data) {
        console.log(data);
    }
});
} */



