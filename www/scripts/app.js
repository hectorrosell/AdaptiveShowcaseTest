var unitList;
var methodList;
var detailList;

var statusNextSlice = true;
var oldLocation = '';

var counterStates = 0;
var isFirstState = true;

//(function () {

/*var resolve = {
    delay: function ($q, $timeout) {
        console.log("resolve delay");
        var delay = $q.defer();
        $timeout(delay.resolve, 0, false);
        return delay.promise;
    }
};*/

var app = angular.module('ADApp', [
  'mobile-angular-ui',
  'ui.router',
  'ngRoute',
  //'mobile-angular-ui.gestures',
  'ngAnimate'
]);

app.directive('xngFocus', function () {
    return function (scope, element, attrs) {
        scope.$watch(attrs.xngFocus,
            function (newValue) {
                newValue && element.focus();
            }, true);
    };
});

$(window).resize(function () {
    //alert(window.innerWidth);

    var heightMethodContent = $('.method-content').innerHeight();
    var heightFormMethodContent = $('.form-method-content').innerHeight();
    var offSetY = 10;

    //console.log("win: " + $(window).height() + ", meth: " + heightMethodContent + ", Final height: " + (($(window).height()) - heightMethodContent));

    if ((heightFormMethodContent - heightMethodContent - offSetY) > 75)

        $('.response-content').css({
        //        'height': (($(window).height()) - heightMethodContent) + 'px'
        'height': (heightFormMethodContent - heightMethodContent ) + 'px'

    });

    //    $scope.$apply(function () {
    //       //do something to update current scope based on the new innerWidth and let angular update the view.
    //    });
});

/*$('#addFavorite').click(function () {
     $(this).next('ul').slideToggle('500');
    $(this).toggleClass('fa-plus-circle fa-minus-circle');
    console.log("toggleClass");
});*/

/*$("#openSearch").click(function () {
    $("#inputTextSearch").trigger("click");

    $(".triggerBtn").trigger("click");

    console.log("trigger");
});*/
/*
$(".triggerBtn").click(function () {

    /* $(".inputField").trigger("focus");*/
/* $("#inputTextSearch").focus()*/
//console.log();
//.triggerHandler("focus");

/* $(".inputField").focus();
 $(".inputField").click();*/
/* console.log("triggerBtn");*/

//})();

/*app.run(function ($transform) {
    //window.$transform = $transform;
});*/

//
// `$touch example`
//

/*app.directive('toucharea', ['$touch', function ($touch) {
    // Runs during compile
    return {
        restrict: 'C',
        link: function ($scope, elem) {
            $scope.touch = null;
            $touch.bind(elem, {
                start: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                cancel: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                move: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                end: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                }
            });
        }
    };
}]);*/

//
// `$drag` example: drag to dismiss
//
/*app.directive('dragToDismiss', function ($drag, $parse, $timeout) {
    return {
        restrict: 'A',
        compile: function (elem, attrs) {
            var dismissFn = $parse(attrs.dragToDismiss);
            return function (scope, elem) {
                var dismiss = false;

                $drag.bind(elem, {
                    transform: $drag.TRANSLATE_RIGHT,
                    move: function (drag) {
                        if (drag.distanceX >= drag.rect.width / 4) {
                            dismiss = true;
                            elem.addClass('dismiss');
                        } else {
                            dismiss = false;
                            elem.removeClass('dismiss');
                        }
                    },
                    cancel: function () {
                        elem.removeClass('dismiss');
                    },
                    end: function (drag) {
                        if (dismiss) {
                            elem.addClass('dismitted');
                            $timeout(function () {
                                scope.$apply(function () {
                                    dismissFn(scope);
                                });
                            }, 300);
                        } else {
                            drag.reset();
                        }
                    }
                });
            };
        }
    };
});*/

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
/*app.directive('carousel', function () {
    return {
        restrict: 'C',
        scope: {},
        controller: function () {
            this.itemCount = 0;
            this.activeItem = null;

            this.addItem = function () {
                var newId = this.itemCount++;
                this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
                return newId;
            };

            this.next = function () {
                this.activeItem = this.activeItem || 0;
                this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
            };

            this.prev = function () {
                this.activeItem = this.activeItem || 0;
                this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
            };
        }
    };
});*/


/*app.directive('carouselItem', function ($drag) {
    return {
        restrict: 'C',
        require: '^carousel',
        scope: {},
        transclude: true,
        template: '<div class="item"><div ng-transclude></div></div>',
        link: function (scope, elem, attrs, carousel) {
            scope.carousel = carousel;
            var id = carousel.addItem();

            var zIndex = function () {
                var res = 0;
                if (id === carousel.activeItem) {
                    res = 2000;
                } else if (carousel.activeItem < id) {
                    res = 2000 - (id - carousel.activeItem);
                } else {
                    res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
                }
                return res;
            };

            scope.$watch(function () {
                return carousel.activeItem;
            }, function () {
                elem[0].style.zIndex = zIndex();
            });

            $drag.bind(elem, {

                transform: function (element, transform, touch) {

                    var t = $drag.TRANSLATE_BOTH(element, transform, touch);


                    var Dx = touch.distanceX,
                        t0 = touch.startTransform,
                        sign = Dx < 0 ? -1 : 1,
                        angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

                    t.rotateZ = angle + (Math.round(t0.rotateZ));

                    return t;
                },
                move: function (drag) {
                    if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
                        elem.addClass('dismiss');
                    } else {
                        elem.removeClass('dismiss');
                    }
                },
                cancel: function () {
                    elem.removeClass('dismiss');
                },
                end: function (drag) {
                    elem.removeClass('dismiss');
                    if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
                        scope.$apply(function () {
                            carousel.next();
                        });
                    }
                    drag.reset();
                }
            });
        }
    };
});*/


/*app.directive('dragMe', ['$drag', function ($drag) {
    return {
        controller: function ($scope, $element) {
            $drag.bind($element, {
                //
                // Here you can see how to limit movement
                // to an element
                //
                transform: $drag.TRANSLATE_INSIDE($element.parent()),
                end: function (drag) {
                    // go back to initial position
                    drag.reset();
                }
            }, { // release touch when movement is outside bounduaries
                sensitiveArea: $element.parent()
            });
        }
    };
}]);*/

/*'use strict';

var unitList;
var methodList;
var detailList;

angular.module('ADApp.Controllers', []);
angular.module('ADApp.States', []);

angular.module('ADApp', ['COMMONAPI', 'config', 'AppDetection', 'ADApp.Controllers', 'ADApp.States', 'ngSanitize', 'ngCookies'])

.run(['$rootScope', '$location', '$log', 'AuthenticationService', 'RoleService', 'AUTHORIZATION_DATA', 'SECURITY_GENERAL',
    function ($rootScope, $location, $log, AuthenticationService, RoleService, AUTHORIZATION_DATA, SECURITY_GENERAL) {

        function routeClean(destinationRoute) {
                if (AUTHORIZATION_DATA.routesThatDontRequireAuth.indexOf(destinationRoute) === -1) {
                    return false;
                } else {
                    return true;
                }
            }

        function routeAdmin(destinationRoute) {
            if (AUTHORIZATION_DATA.routesThatRequireAdmin.indexOf(destinationRoute) === -1) {
                return false;
            } else {
                return true;
            }
        }

        $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
            if (SECURITY_GENERAL.securityEnabled) {
                $log.debug('to: ' + to);
                 if (routeClean(to.url) == false) {
                    if (AuthenticationService.isLoggedIn() == true) {
                        if (RoleService.validateRoleAdmin() == false) {
                            alert("YOU DO NOT HAVE THE NEEDED ROLE.");
                            ev.preventDefault();
                         }
                    } else {
                        $log.debug('ROUTE NOT CLEAN AND USER NOT LOGGED');
                        $log.debug('User is not logged and is rediercted to main page (REDIRECTION!!!!!!!!)');
                         ev.preventDefault();
                         $location.path('/home');
                    }
                }
            }
        });
    }
])

.config(['$httpProvider',
    function ($httpProvider) {
        var logsOutUserOn401 = ['$q', '$location',
            function ($q, $location) {
                var success = function (response) {
                    return response;
                };

                var error = function (response) {
                    if (response.status === 401) {
                        //Redirects them back to main/login page
                        $location.path('/home');

                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                };

                return function (promise) {
                    return promise.then(success, error);
                };
            }
        ];
        $httpProvider.responseInterceptors.push(logsOutUserOn401);
    }
]);*/