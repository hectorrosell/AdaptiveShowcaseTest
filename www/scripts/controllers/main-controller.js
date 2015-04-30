  (function (angular) {
      'use strict';

      angular
          .module('ADApp.Controllers')
          .controller('MainController', MainController)

      function MainController($scope, $log, $state, $rootScope) {

          $log.debug("MainController");

          $scope.unit_list = unitList;
          $scope.method_list = methodList;
          $scope.detail_list = detailList;

          $scope.main_list = dataInfo;

          //$scope.units_list = unitList;
          //$scope.methods_list = methodList;

          $rootScope.itemMainListSelected = function (id) {
              $log.debug("itemMainListSelected");
              var lengthList = dataInfo.length;
              for (var i = 0; i < lengthList; i++) {
                  if (id === $scope.main_list[i].id) {
                      unitList = $scope.main_list[i];
                      console.log(unitList);
                      $state.go('main-page.units-list');
                  }
              }
          };

          $rootScope.itemUnitListSelected = function (id) {
              $log.debug("itemUnitListSelected");
              var lengthList2 = unitList.list.length;
              for (var i2 = 0; i2 < lengthList2; i2++) {

                  if (id === unitList.list[i2].id) {
                      methodList = unitList.list[i2];
                      console.log("Test: " + methodList);
                      $state.go('main-page.methods-list');
                  }
              }
          };

          $rootScope.itemMethodListSelected = function (id) {
              $log.debug("itemMethodListSelected");
              var lengthList2 = methodList.list.length;
              for (var i2 = 0; i2 < lengthList2; i2++) {

                  if (id === methodList.list[i2].id) {
                      detailList = methodList.list[i2];
                      console.log("Test: " + detailList);
                      $state.go('main-page.detail-list');
                  }
              }
          };
          //$scope.main_list = dataInfo;
          //var scrollItems = dataInfo;

          /*for (var i = 1; i <= 100; i++) {
              scrollItems.push('Item ' + i);
          }
          */
          $scope.scrollItems = dataInfo;

      }

  })(window.angular);