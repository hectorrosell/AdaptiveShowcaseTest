(function (angular) {
    'use strict';

    angular
        .module('ADApp.Controllers')
        .controller('ListController', ListController)
        .controller('ModalController', ModalController)
        .controller('ModalImport', ModalImport);

    function ListController($scope, $log, $state, $rootScope) {

        $scope.unit_list_title = unitListTitle;
        $scope.method_list_title = methodListTitle;
        $scope.detail_list_title = detailListTitle;

        console.log(methodListTitle);

        $log.debug("List Controller");

        $scope.main_list = [
            {
                id: 0,
                name: "Type 0"
            },
            {
                id: 1,
                name: "Type 1"
            }, {
                id: 2,
                name: "Type 2"
            }, {
                id: 3,
                name: "Type 3"
            }, {
                id: 4,
                name: "Type 4"
            }, {
                id: 5,
                name: "Type 5"
            }, {
                id: 6,
                name: "Type 6"
            }, {
                id: 7,
                name: "Type 7"
            }, {
                id: 8,
                name: "Type 8"
            }, {
                id: 9,
                name: "Type 9"
            }, {
                id: 10,
                name: "Type 10"
            }, {
                id: 11,
                name: "Type 11"
            }, {
                id: 12,
                name: "Type 12"
            }, {
                id: 13,
                name: "Type 13"
            }, {
                id: 14,
                name: "Type 14"
            }, {
                id: 15,
                name: "Type 15"
            }, {
                id: 16,
                name: "Type 16"
            }, {
                id: 17,
                name: "Type 17"
            }, {
                id: 18,
                name: "Type 18"
            }, {
                id: 19,
                name: "Type 19"
            }, {
                id: 20,
                name: "Type 20"
            }, {
                id: 21,
                name: "Type 21"
            }
        ];
        $scope.units_list = [
            {
                id: 0,
                name: "Type u1"
            }, {
                id: 1,
                name: "Type u2"
            }, {
                id: 2,
                name: "Type u3"
            }
        ];
        $scope.methods_list = [
            {
                id: 0,
                name: "Type m1"
            }, {
                id: 1,
                name: "Type m2"
            }, {
                id: 2,
                name: "Type m3"
            }
        ];

        $rootScope.itemMainListSelected = function (id) {
            $log.debug("itemMainListSelected");
            var lengthList = $scope.main_list.length;
            for (var i = 0; i < lengthList; i++) {
                if (id === $scope.main_list[i].id) {
                    unitListTitle = $scope.main_list[i].name;
                    console.log(unitListTitle);
                }
            }
            $state.go('main-page.units-list');
        };
        $rootScope.itemUnitListSelected = function (id) {
            $log.debug("itemUnitListSelected");
            var lengthList2 = $scope.units_list.length;
            for (var i2 = 0; i2 < lengthList2; i2++) {
                console.log("Test: " + methodListTitle);
                if (id === $scope.units_list[i2].id) {
                    methodListTitle = $scope.units_list[i2].name;
                    console.log("Test: " + methodListTitle);
                }
            }
            $state.go('main-page.methods-list');
        };
        $rootScope.itemMethodListSelected = function (id) {
            $log.debug("itemMethodListSelected");
            var lengthList = $scope.methods_list.length;
            for (var i = 0; i < lengthList; i++) {
                if (id === $scope.methods_list[i].id) {
                    detailListTitle = $scope.methods_list[i].name;
                    console.log(detailListTitle);
                }
            }
            $state.go('main-page.detail-list');
        };

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