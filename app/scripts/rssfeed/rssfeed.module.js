'use strict';

var angular = require('angular');

var app = angular.module('RssFeed', []);

app.filter('feedDate', function($filter) {
 return function(input) {
   if(input === null){ return ''; }
   var _date = $filter('date')(new Date(input), 'MMM dd, yyyy');
   return _date;
 };
});

app.component('rssFeedWidget', {
  template: [
    '<ul>',
    '<li ng-repeat="item in $ctrl.itemList">',
    '<a href="{{ item.link }}">{{ item.title }}</a> - <small>{{ item.publishedDate | feedDate }}</small>',
    '</li>',
    '</ul>'
  ].join(' '),
  controller: 'RssFeedController'
});

app.controller('RssFeedController',['RssFeedService', function(RssFeedService){
  var url = 'https://savusavufishing.blogspot.com/feeds/posts/default';

  var ctrl = {};
  ctrl.itemList = [];
  RssFeedService.parseFeed(url).then(
    function(result){
      ctrl.itemList = result.data.responseData.feed.entries;
    }
  );
  return ctrl;
}]);

app.factory('RssFeedService', ['$http', function($http){
  return {
    parseFeed : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=7&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  };
}]);

module.exports = app.name;
