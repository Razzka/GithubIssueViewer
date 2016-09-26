;

App.controller('GithubController', ['$scope', 'GithubService', '$location', function($scope, githubService, $location) {
    'use strict';
    // Github User
    $scope.user = '';
    
    // Github User's Repository
    $scope.repo = '';

    // Repositories list
    $scope.repos = null;
    
    // Issues list
    $scope.issues = null;
    
    // Issues per page
    $scope.perPage = 30;
    
    // Searching Issues...
    $scope.searching = false;
    
    // Issues searched at least once
    $scope.searched = false;
    
    // Seacrching Repositories...
    $scope.searchingRepos = false;
    
    // Repository suggest list is minimized
    $scope.minimizeRepoList = false;

    // User / Repository not exists
    $scope.reposNotFound = false;
    
    // Highlighted Repository index
    $scope.hightlightedRepo = -1;
    
    // KeyPress event options for Repository input
    $scope.pressKeyRepos = {};
    // Enter
    $scope.pressKeyRepos[13] = 'getIssues(user, repo)';
    // Up arrow
    $scope.pressKeyRepos[38] = 'highlightRepo(-1)';
    // Down arrow
    $scope.pressKeyRepos[40] = 'highlightRepo(1)';
    
    // KeyPress event options for User input
    $scope.pressKeyUser = {};
    // Enter
    $scope.pressKeyUser[13] = 'focusRepoInput = true';
    
    // Page types dictionary
    $scope.pageTypes = ['first', 'prev', 'next', 'last'];
    
    $scope.page = 1;
    
    $scope.rateLimit = false;
    
    $scope.getRepos = function(user, callback) {
        $scope.repos = null;
        $scope.hightlightedRepo = -1;
        
        if (user === '') {
            return;
        }
        
        $scope.searchingRepos = true;
        
        githubService.fetchAllUserRepos(user).then(
            function(repos) {
                $scope.rateLimit = false;
                $scope.searchingRepos = false;
                $scope.repos = repos;
                
                if (callback) {
                    callback();
                }
            },
            function(errResponse) {
                $scope.searchingRepos = false;
                if (errResponse.status == '404') {
                    $scope.repos = null;
                    $scope.reposNotFound = true;
                    $scope.rateLimit = false;
                }
                
                if (errResponse.status == '403') {
                    $scope.reposNotFound = false;
                    $scope.rateLimit = true;
                    $scope.resetsIn = errResponse.headers('X-RateLimit-Reset');
                }
            }
        );
    };
    
    $scope.getIssues = function(user, repo, perPage, page) {
        if (user === '' || repo === '') {
            return;
        }
        
        if (!page) {
            $scope.page = 1;
        }
        
        if ($scope.repos[$scope.hightlightedRepo]) {
            $scope.repos[$scope.hightlightedRepo].focus = false;
        }
        
        $scope.searching = true;
        $scope.searched = true;
        $scope.minimizeRepoList = true;
        $scope.link = null;
        $scope.links = null;
        
        githubService.fetchIssues(user, repo, perPage, page).then(
            function (response) {
                $scope.rateLimit = false;
                $scope.searching = false;
                if (response.data.length > 0) {
                    
                    $scope.issues = response.data;
                    
                    $scope.link = response.headers('Link');
                    
                    $scope.links = [];
                    if ($scope.link) {
                        var links = $scope.link.split(',');
                        
                        for (var linkIdx in links) {
                            var link = links[linkIdx];
                            for (var pageTypeIdx in $scope.pageTypes) {
                                var pageType = $scope.pageTypes[pageTypeIdx];    
                                if (link.indexOf(pageType) != -1) {
                                    $scope.links[pageType] = link.split('>')[0];
                                }    
                            }
                        }    
                    }
                    
                } else {
                    $scope.issues = [];
                }
            },
            function(errResponse) {
                $scope.searching = false;
                if (errResponse.status == '404') {
                    $scope.rateLimit = false;
                    $scope.issues = null;
                }
                
                if (errResponse.status == '403') {
                    $scope.rateLimit = true;
                    $scope.resetsIn = errResponse.headers('X-RateLimit-Reset');
                }
            }
        );
    };

    $scope.getResetsIn = function() {
        var seconds = Math.round(+($scope.resetsIn) - new Date().getTime() / 1000);
        if (seconds < 0) {
            seconds = 0;
        }
        return seconds;
    };
    
    $scope.loadUserReposNow = function() {
        $scope.minimizeRepoList = false;
        
        $scope.getRepos($scope.user, function() {
            $scope.focusRepoInput = true;
        });
    };
    
    // Autoload user repos    
    $scope.$watch('user', function() {
        $scope.repos = null;
        $scope.repo = '';
        $scope.reposNotFound = false;
    });
    
    $scope.showTable = function() {
        return $scope.issues && $scope.issues.length || $scope.searching;
    };
    
    $scope.issuesNotFound = function() {
        return $scope.searched && $scope.issues && !$scope.issues.length && !$scope.searching;
    };
    
    $scope.buttonDisabled = function() {
        return !$scope.user || !$scope.repo;   
    };
    
    $scope.showRepos = function() {
        return $scope.searchingRepos || $scope.repos || $scope.reposNotFound;
    };
    
    $scope.selectRepo = function(repo) {
        $scope.repo = repo;
        $scope.minimizeRepoList = true;
        $location.path('/');
        $scope.page = 1;
        $scope.getIssues($scope.user, $scope.repo, $scope.perPage, $scope.page);
    };
    
    $scope.expandRepos = function() {
        $scope.minimizeRepoList = false;
    };
    
    $scope.minimizeRepos = function() {
        $scope.minimizeRepoList = true;
    };
    
    $scope.showMinimizeReposBtn = function() {
        return !$scope.searchingRepos && $scope.repos && $scope.repos.length && !$scope.minimizeRepoList;
    };
    
    $scope.highlightRepo = function(index) {
        if ($scope.repos && $scope.repos.length) {
            $scope.minimizeRepoList = false;
            
            var result = $scope.hightlightedRepo + index; 
            if (result < 0) {
                result = 0;
            }
            
            if (result >= $scope.repos.length) {
                result = $scope.repos.length - 1;
            }
            
            if ($scope.repos[$scope.hightlightedRepo]) {
                $scope.repos[$scope.hightlightedRepo].focus = false;
            }
            
            $scope.repos[result].focus = true;
            $scope.repo = $scope.repos[result].name;
            $scope.hightlightedRepo = result;
        }
    };
    
    $scope.viewIssueDetails = function() {
        return $location.path() != '' && $location.path() != '/';
    };
}]);