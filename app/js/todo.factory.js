(function() {
    'use strict';

    angular
        .module('todoApp')
        .factory('ToDoFactory', ToDoFactory);

    ToDoFactory.$inject = ['$http', '$q', '$log', 'toastr', 'apiUrl'];

    /* @ngInject */
    function ToDoFactory($http, $q, $log, toastr, apiUrl) {
        var service = {
            getToDo: getToDo,
            addToDo: addToDo,
            updateToDo: updateToDo,
            deleteToDo: deleteToDo
        };

        return service;

        function getToDo() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                        toastr.success('WE HAVE TODOS');
                    },
                    function(error) {
                        $log.error(error);
                    }
                );

            return defer.promise;
        }

        //ADD TO DO ITEM

        function addToDo(todo) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl,
                    data: todo
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                        toastr.success('ADDED A NEW ITEM!');
                    },
                    function(error) {
                        defer.reject(error);
                        console.log(error);
                        toastr.error('FAILURE TO ADD A NEW ITEM');
                    }
                );

            return defer.promise;
        }

        //UPDATE TO DO ITEM
        function updateToDo(todo) {
            var defer = $q.defer();
            $http({
                    method: 'PUT',
                    url: apiUrl + todo.toDoId,
                    data: todo
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                        toastr.success('UPDATED ITEM!');
                    },
                    function(error) {
                        defer.reject(error);
                        console.log(error);
                        toastr.error('FAILURE TO UPDATE ITEM!');
                    }
                );

            return defer.promise;
        }

        //DELETE todo
        function deleteToDo(id) {
            var defer = $q.defer();
            $http({
                    method: 'DELETE',
                    url: apiUrl + id
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log('you deleted a todo', response);
                        toastr.success('DELETED TO DO');
                    },
                    function(error) {
                        $log.error(error);
                        toastr.error('FAILURE TO DELETE ITEM!');
                    }
                );

            return defer.promise;
        }

    }
})();
