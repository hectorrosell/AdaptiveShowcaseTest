var unitList;
var methodList;
var detailList;

var statusNextSlice = true;
var oldLocation = '';

var counterStates = 0;
var isFirstState = true;
var firstTime;

var currentServiceId;
var currentUnitId;
var currentMethodId;
var isFavoriteState = false;

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
        'height': (heightFormMethodContent - heightMethodContent) + 'px'
    });
});