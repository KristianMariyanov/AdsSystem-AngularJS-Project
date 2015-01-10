'use strict';

app.controller('UserAdsController',
   function ($scope, userService, notifyService, pageSize) {
      $scope.adsParams = {
          'startPage' : 1,
          'pageSize' : pageSize
      };

      $scope.reloadUserAds = function() {
          userService.getUserAds(
              $scope.adsParams,
              function success(data) {
                  $scope.ads = data;
              },
              function error(err) {
                  notifyService.showError("Cannot load user ads", err);
              }
          );
      };

      $scope.reloadUserAds();
	  
	  // This event is sent by RightSideBarController when the current category is changed
        $scope.$on("statusSelectionChanged", function(event, selectStatusId) {
            $scope.adsParams.categoryId = selectStatusId;
            $scope.adsParams.startPage = 1;
            $scope.reloadUserAds();
        });

   }
);
