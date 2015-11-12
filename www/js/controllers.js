angular.module('starter.controllers', ['ngAudio'])





     

//musica de ambiente:
 .controller('SoundController',function($scope, ngAudio, $cordovaNativeAudio, $ionicPlatform){
    //$scope.audio = ngAudio.play('sounds/ambient/ambient.mp3');


  /*  $ionicPlatform.ready(function() {
        $cordovaNativeAudio.preloadComplex('ambient', 'sounds/ambient/ambient.mp3', 1, 1);
        $cordovaNativeAudio.loop('ambient');*/
        /*$cordovaNativeAudio
            .preloadComplex('ambient', 'sounds/ambient/ambient.mp3', 1, 1)
            .then(function (msg) {
              console.log(msg);
            }, function (error) {
              console.error(error);
            });
        $cordovaNativeAudio.loop('ambient');*/
   // });

 })
  





//controlador del slide-box
.controller('SlideBoxController', function($scope, $ionicSlideBoxDelegate){

  $scope.disableSwipe = function() {
   $ionicSlideBoxDelegate.enableSlide(false);
  };
  $scope.nextSlide = function(){
    $ionicSlideBoxDelegate.next();
  };
  $scope.previousSlide = function(){
    $ionicSlideBoxDelegate.previous();
  }
})
 



//granja controller  
.controller('GranjaController', function($scope, ngAudio, $ionicSlideBoxDelegate, $http) {
  $http.get('data/granja.json').
    success(function(data, status, headers, config){
      $scope.animals = data;
      data = shuffleArray(data);
      //envia el src del audio a ngAudio:
      for (var i = 0; i < $scope.animals.length; i++) {
        $scope.animals[i].audio = ngAudio.load($scope.animals[i].audio);
      };
    });

    setTimeout(function() {
        $ionicSlideBoxDelegate.slide(0);
        $ionicSlideBoxDelegate.update();
        $scope.$apply();
      });


})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});





//Fisher-Yates Shuffle algorithm
function shuffleArray(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}     