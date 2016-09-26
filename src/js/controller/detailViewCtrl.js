;

App.controller('detailViewCtrl', ['$scope', 'GithubService', '$route', '$routeParams', '$location', function($scope, githubService, $route, $routeParams, $location) {
    $scope.searching = true; 
    $scope.issue = null;
    
    githubService.fetchIssue($routeParams.user, $routeParams.repo, $routeParams.id).then(
            function(response) {
                $scope.searching = false;
                $scope.issue = response.data;
            },
            function(errResponse) {
                $scope.searching = false;
                
                if (errResponse.status == '403') {
                    $scope.$parent.rateLimit = true;
                    $scope.$parent.resetsIn = errResponse.headers('X-RateLimit-Reset');
                    $location.path('/');
                }
            });
    
    $scope.closeIssue = function() {
        $location.path('/');
    }
}]);