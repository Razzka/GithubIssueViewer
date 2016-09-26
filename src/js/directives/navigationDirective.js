;

App.directive('navigation', function() {
  return {
    controller: 'navigationCtrl',
    scope: {
      perPageProp: '=',
      pageProp: '=',
      links: '=',
      action: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: '/GithubIssuesViewer/resources/html/navigation.htm'
  };
});