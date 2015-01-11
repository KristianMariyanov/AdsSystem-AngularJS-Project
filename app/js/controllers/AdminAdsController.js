'use strict';

app.controller('AdminAdsController',
    function ($scope, $routeParams, $location, adminService, notifyService, pageSize) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize,
            'Status': $routeParams.id
        };
        if ($routeParams.id == 'all') {
            $scope.adsParams.Status = null;
        }

        $scope.reloadAdminAds = function() {
            adminService.getAdminAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Cannot load admin ads", err);
                }
            );
        };

        $scope.approveAd = function(adId) {
            adminService.approveAd(
                adId,
                function success(data) {
                    notifyService.showInfo('Successfully Approve ad');
                    $scope.reloadAdminAds();
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };

        $scope.rejectAd = function(adId) {
            adminService.rejectAd(
                adId,
                function success(data) {
                    notifyService.showInfo('Successfully rejected ad');
                    $scope.reloadAdminAds();
                    //$route.reload();
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };

        $scope.reloadAdminAds();

        $scope.$on("categorySelectionChanged", function(event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAdminAds();
        });

        // This event is sent by RightSideBarController when the current town is changed
        $scope.$on("townSelectionChanged", function(event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAdminAds();
        });

        $scope.deactivateAd = function(adId) {
            userService.deactivateAd(
                adId,
                function success(data) {
                    notifyService.showInfo('Successfully deactivated ad');
                    $scope.reloadUserAds();
                    //$route.reload();
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };


    }
);
