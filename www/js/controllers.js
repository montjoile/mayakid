angular.module('starter.controllers', ['ngAudio'])



.controller('AudioCtrl', function($scope,  $cordovaNativeAudio) {
  $scope.isSoundLoaded = false;
  $scope.audio = null;
  $scope.media = null;


  function playNativeSound(name){
    $cordovaNativeAudio.play(name);
  }

  function loadSound(name, audio){
    $cordovaNativeAudio
            .preloadSimple(name, audio)
            .then(function (msg) {
            }, function (error) {
              alert(error); 
            });
      $scope.isSoundLoaded = true;
      playNativeSound(name);
  }

  $scope.playNative = function(name, audio){
    if($scope.isSoundLoaded){
      playNativeSound(name);
    }
    else{
      loadSound(name, audio);
    }
  }

  $scope.playNativeLoop = function (){
    if($scope.isSoundLoaded){
      $cordovaNativeAudio.loop('mySound');
    }
    else{
      loadSound();
    }
  }

  $scope.stopNative = function(){
      $cordovaNativeAudio.stop('mySound');
  }

  $scope.playWebAudio = function()
  {
    try{
      $scope.audio = new Audio('http://codedreaming.com/wp-content/uploads/main_tune.mp3');
      $scope.audio.play();
    }
    catch(e){
      alert(e);
    }
  }

  $scope.playWebAudioLoop = function()
  {
    $scope.audio = new Audio('http://codedreaming.com/wp-content/uploads/main_tune.mp3');
    $scope.audio.loop = true;
    $scope.audio.play();
  }

  $scope.stopWeb = function(){
    $scope.audio.pause();
  }


})

     

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
      /*for (var i = 0; i < $scope.animals.length; i++) {
        $scope.animals[i].audio = ngAudio.load($scope.animals[i].audio);
      };*/
    });

    setTimeout(function() {
        $ionicSlideBoxDelegate.slide(0);
        $ionicSlideBoxDelegate.update();
        $scope.$apply();
      });


})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});





//Fisher-Yates Shuffle algorithm for animals in slidebox
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