global.jQuery = require('jquery');

require('jquery.googleslides');
require('wsk.main');

var angular = require('angular');

var ngmap = require('ngmap');
var rssfeed = require('./rssfeed/');

angular.module('SavusavuFishingApp', [ngmap, rssfeed.name]);
