App.directive('onBlur', function ($timeout) {
    return function ($scope, element, attrs) {
        element.bind("blur", function (event) {
            $timeout(function() {
                $scope.$apply(function() {
                    $scope.$eval(attrs.onBlur);
                });
            }, 200);
        });
    };
});