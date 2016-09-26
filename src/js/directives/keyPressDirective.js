App.directive('pressKey', function () {
    return function ($scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            var opts = $scope[attrs.pressKey];
            
            if (!!opts[event.which]) {
                $scope.$evalAsync(opts[event.which]);

                event.preventDefault();
            }
        });
    };
});