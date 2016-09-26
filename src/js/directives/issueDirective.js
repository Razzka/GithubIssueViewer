;var customDirectiversModule = angular.module('customdirectives', [])
.directive('issue', function() {
  return {
    controller: 'issueCtrl',
    scope: {
      issue: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: '/GithubIssuesViewer/resources/html/issue.htm'
  };
});