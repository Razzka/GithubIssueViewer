App.controller('issueCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.openIssue = function(number) {
        var $parentScope = $scope.$parent;
        
        var user = $parentScope.user;
        var repo = $parentScope.repo;
        
        var url = '/' + user + '/' + repo + '/' + number;
        $location.path(url);
    };
}]);