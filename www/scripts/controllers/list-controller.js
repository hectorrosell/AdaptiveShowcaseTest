(function (angular) {
    'use strict';

    angular
        .module('ADApp.Controllers')
        .controller('ListController', ListController)
        .controller('ModalController', ModalController)
        .controller('ModalImport', ModalImport);
    // recommended
    function ListController($scope, $log, $state) {

        $log.debug("List Controller");

        $scope.main_list = [
            {

                name: "Type 1"
            }, {
                name: "Type 2"
            }, {
                name: "Type 3"
            }, {
                name: "Type 4"
            }, {
                name: "Type 5"
            }, {
                name: "Type 6"
            }, {
                name: "Type 7"
            }, {
                name: "Type 8"
            }, {
                name: "Type 9"
            }, {
                name: "Type 10"
            }, {
                name: "Type 11"
            }, {
                name: "Type 12"
            }, {
                name: "Type 13"
            }, {
                name: "Type 14"
            }, {
                name: "Type 15"
            }, {
                name: "Type 16"
            }, {
                name: "Type 17"
            }, {
                name: "Type 18"
            }, {
                name: "Type 19"
            }, {
                name: "Type 20"
            }, {
                name: "Type 21"
            }
        ];

        $scope.units_list = [
            {

                name: "Type u1"
            }, {
                name: "Type u2"
            }, {
                name: "Type u3"
            }
        ];

        $scope.methods_list = [
            {

                name: "Type m1"
            }, {
                name: "Type m2"
            }, {
                name: "Type m3"
            }
        ];

        $scope.itemMainListSelected = function (id) {
            $log.debug("itemMainListSelected");
            var lengthList = $scope.main_list.length;
            for (var i = 0; i < lengthList; i++) {
                //if (id === $scope.list[i].id) {
                //$scope.valueListSelected = !$scope.valueListSelected;
                //console.log($scope.valueListSelected)
                //}
            }
            $state.go('main-page.units-list');
        }

        $scope.itemUnitsListSelected = function (id) {
            $log.debug("itemUnitsListSelected");
            $state.go('main-page.methods-list');
        }

        $scope.detailListSelected = function (id) {
            $log.debug("detailListSelected");
            $state.go('main-page.detail-list');
        }

    }

    function ModalController($scope, $modal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.open = open;

        function open(size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controlller: 'ModalImport',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    function ModalImport($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})(window.angular);