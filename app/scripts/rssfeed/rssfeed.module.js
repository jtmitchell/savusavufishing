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

app.factory('RssFeedService', ['$http', '$sce', function($http, $sce){
  return {
    parseFeed : function(url){
      var config = {
        params: {
          alt: 'json'
        }
      }
      return $http.get(url, config).then(function(response){
        var feed = [];
        response.data.feed.entry.forEach(function(e){
          var entry = {
            title: e.title.$t,
            publishedDate: e.published.$t,
            media: {
              url: e.media$thumbnail.url,
              height: e.media$thumbnail.height,
              width: e.media$thumbnail.width
            }
          };
          feed.push(entry);
        });
        return feed;
      });
    }
  };
}]);

module.exports = app.name;
