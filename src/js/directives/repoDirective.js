;customDirectiversModule
.directive('repo', function(){
  return {
    scope: {
      repo: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: '/GithubIssuesViewer/resources/html/repo.htm'
  };
});