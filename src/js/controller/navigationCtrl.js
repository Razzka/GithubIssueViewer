App.controller('navigationCtrl', ['$scope', 'utils', function($scope, utils) {
    $scope.perPage = $scope.$parent[$scope.perPageProp];
    $scope.page = $scope.$parent[$scope.pageProp];
    
    $scope.pagesCount = [6, 12, 30, 90];
    
    function action() {
        $scope.$parent.$evalAsync($scope.action);
    }
    
    $scope.setPerPage = function(perPage) {
        $scope.$parent[$scope.perPageProp] = perPage;
        $scope.perPage = perPage;
        action();
    };
    
    $scope.btnDisabled = function(type) {
        if (!$scope.links) {
            return true;
        }
        return !$scope.links[type];
    };
    
    $scope.navigate = function(type) {
        if ($scope.btnDisabled(type)) {
            return;
        }
        
        var page = utils.getParameterByName('page', $scope.links[type]);
        $scope.$parent[$scope.pageProp] = page;
        $scope.page = page;
        action();
    };
}]);