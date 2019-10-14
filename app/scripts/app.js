'use strict';

global.jQuery = require('jquery');

require('wsk.main');

var angular = require('angular');

var ngmap = require('ngmap');
var rssfeed = require('./rssfeed');

var app = angular.module('SavusavuFishingApp', [ngmap, rssfeed]);

app.run(['$rootScope', 'NgMap', function($rootScope, NgMap){
  $rootScope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJl7cjTuVvA-JXZrlaPl-r6SB-aoI_9Xs";
  NgMap.getMap().then(function(map){
    $rootScope.map = map;
  });
}]);
