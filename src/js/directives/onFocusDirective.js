App.directive('onFocus', function () {
    return function ($scope, element, attrs) {
        element.bind("focus", function (event) {
            $scope.$evalAsync(attrs.onFocus);
        });
    };
});