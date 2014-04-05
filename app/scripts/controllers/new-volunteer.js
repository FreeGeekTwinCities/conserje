'use strict';

angular.module('conserjeApp')
  .controller('NewVolunteerCtrl', function ($scope, $resource, $rootScope) {
    $scope.formData = {};
    $scope.alerts = [];
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
    
    $scope.processForm = function () {
        var newVolunteer = new Volunteer($scope.formData);
        newVolunteer.$save(function(newVolunteer, company, data) {
          console.log(newVolunteer);
          console.log($rootScope.company);
          $scope.formData = {};
          $scope.alerts.push({
              type: 'success', 
              msg: "<p>Welcome to " + $rootScope.company.name + ", " + newVolunteer.name + "! You are volunteer #" + newVolunteer.id + ".</p><p>Would you like to <a href=#>Sign In</a>?</p>"
          });
        });
        
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    
    var _video = null,
        patData = null;
    
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function() {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function (videoElem) {
        // The video element contains the captured camera data
        _video = videoElem;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            $scope.showDemos = true;
        });
    };

    $scope.makeSnapshot = function makeSnapshot() {
      console.log(_video);
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            patData = idata;
        }
    };
    
    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };
  });
