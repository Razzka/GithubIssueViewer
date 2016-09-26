;

App.config(function($routeProvider) {
    $routeProvider
    .when("/:user/:repo/:id", {
        templateUrl : "/GithubIssuesViewer/resources/html/issueDetails.htm",
        controller: "detailViewCtrl"
    });
});