var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    
    $scope.statusDevice="Offline";

$scope.$watch('$viewContentLoaded', function(){
    // do something
    $scope.statusDevice="Online";
 });

});