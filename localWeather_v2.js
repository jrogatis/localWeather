
// JavaScript Document
 'use strict';

var app = angular.module('Weather', []);

app.factory('WeatherApi', function($http) {
  var obj = {};

  
  //aqui pega a localização
  obj.getLoc = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
  obj.getCurrent = function(city) {
    var api = "http://api.openweathermap.org/data/2.5/weather?q=";
	//aqui que tem que trocar pra ja carregar em farenheit
    var units = "&units=metric";
    var appid = "&APPID=438e296b695c5e45a161426407c0b2c2";
    var cb = "&callback=JSON_CALLBACK";
    //console.log(api + city + units+ appid + cb);
    return $http.jsonp(api + city + units+ appid + cb);
  };
  return obj;
});

app.controller('MainCtrl', function($scope, WeatherApi) {
  $scope.Data = {};
  $scope.Data.unit ='C';
  $scope.Data.sysChange = false;
  WeatherApi.getLoc().success(function(data) {
    var city = data.city + ',' + data.country;
    $scope.Data.city = data.city;
    $scope.Data.country = data.country;
    WeatherApi.getCurrent(city).success(function(data) {
      CurrentWeather(data);
    });
  });

  function CurrentWeather(data) {
    $scope.Data.temp = Math.round(data.main.temp);
    $scope.Data.Cel = Math.round(data.main.temp);
    $scope.Data.des = data.weather[0].main;
	$scope.Data.icon = data.weather[0].icon;
    $scope.Data.Fah = Math.round( ($scope.Data.temp * 9)/5 + 32 );
  }

  //aqui troca a escala
  $scope.Data.sys= function(){
   if($scope.Data.sysChange){
     $scope.Data.unit ='C';
     $scope.Data.temp = $scope.Data.Cel;
     return $scope.Data.sysChange = false;
     }
    $scope.Data.unit ='F';
    $scope.Data.temp = $scope.Data.Fah;
    return $scope.Data.sysChange = true;
  }; 
  
  
});