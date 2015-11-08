var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$location,$window) {
    
    
    $scope.statusDevice="Offline";
    var statusCount=0;
    
$scope.$watch('$viewContentLoaded', function(){
    // do something
    if(statusCount==0){
    $scope.statusDevice="Online";
    statusCount=1;
    
    }
    else if(statusCount==1){
    	statusCount=0;
    }
 });



});