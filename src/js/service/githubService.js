;

App.factory('GithubService', ['$http', '$q', function($http, $q){
    'use strict';
    return {
            fetchAllUserRepos: function(user) {
                var url = 'https://api.github.com/users/' + user + '/repos';
                return $http.get(url)
                        .then(
                                function(response) {
                                    return response.data;
                                }, 
                                function(errResponse) {
                                    return $q.reject(errResponse);
                                }
                        );
            },
            fetchIssues: function(user, repo, perPage, page) {
                var postfix = '';
                if (page) {
                    postfix += '?page=' + page;
                }
                
                if (perPage) {
                    postfix += (postfix.length == 0 ? '?' : '&') + 'per_page=' + perPage; 
                }
                
                var url = 'https://api.github.com/repos/' + user + '/' + repo + '/issues' + postfix;

                return $http.get(url)
                    .then(
                            function(response, status, headers) {
                                return response;
                            }, 
                            function(errResponse) {
                                return $q.reject(errResponse);
                            }
                    );
            },
            fetchIssue: function(user, repo, id) {
                var url = 'https://api.github.com/repos/' + user + '/' + repo + '/issues' + '/' + id;
                return $http.get(url)
                .then(
                        function(response, status, headers) {
                            return response;
                        }, 
                        function(errResponse) {
                            return $q.reject(errResponse);
                        }
                );
            }
    };
}]);