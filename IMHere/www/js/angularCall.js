var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$location,$window) {
    var number =0;
    $scope.statusDevice="Offline";
    var statusCount=0;
    $scope.x=1;
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

$scope.openChat = function(number) {

        
        $window.location.href = "../templates/chat.html";
        $scope.numberChat=number;
    };
    

    $scope.number = 5;
    $scope.getNumber = function(num) {
    return new Array(num);   
    }

});