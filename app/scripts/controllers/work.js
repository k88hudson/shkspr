'use strict';

angular.module('shksprApp')
  .controller('WorkCtrl', function ($scope, $http) {
    $scope.hello = 'Hi ;)';
    $http.get('api/all/work').success(function(data) {
       $scope.works = data;
      });
  });
