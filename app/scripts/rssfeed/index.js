'use strict';

var angular = require('angular');

var app = angular.module('RssFeed', []);

app.component('rssFeedWidget', {
  template: [
    '<ul>',
    '<li ng-repeat="item in $ctrl.itemList">',
    '<a href="{{ item.link }}">{{ item.title }}</a> - {{ item.publishedDate }}',
    '</li>',
    '</ul>'
  ],
  controller: 'RssFeedController'
});

app.controller('RssFeedController',['RssFeedService', function(RssFeedService){
  var url = 'https://savusavufishing.blogspot.com/feeds/posts/default';

  var ctrl = {};
  ctrl.itemList = [];
  RssFeedService.parseFeed(url).then(
    function(data){
      ctrl.itemList = data.responseData.feed.entries;
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
