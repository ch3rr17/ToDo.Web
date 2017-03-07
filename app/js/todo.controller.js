(function() {
    'use strict';

    angular
        .module('todoApp')
        .controller('ToDoController', ToDoController);

    ToDoController.$inject = ['ToDoFactory', '$log', '$filter'];

    /* @ngInject */
    function ToDoController(ToDoFactory, $log, $filter) {
        var vm = this;

        vm.todos = [];
        vm.showPriority = false;

        vm.grabTodo = function() {
            ToDoFactory.getToDo()
                .then(
                    function(response) {
                        vm.todos = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        $log.error('failure getting todos', error);
                    });
        }

        vm.grabTodo();

        vm.newToDo = function(newToDo) {
            ToDoFactory.addToDo(newToDo)
                .then(
                    function(response) {
                        vm.todos.push(response.data);
                        console.log('you added a new item', response.data);
                        vm.todos = '';
                    },
                    function(error) {
                        $log.error(error);
                        console.log('failure to add a new item', error);
                    }
                );
        }

        //UPDATE TO DO
        vm.editToDo = function(todo) {
            ToDoFactory.updateToDo(todo)
                .then(
                    function(response) {},
                    function(error) {
                        $log.error(error);

                    }
                );
        }

        //DELETE todo
        vm.removeToDo = function(id, index) {
            ToDoFactory.deleteToDo(id)
                .then(
                    function(response) {
                        vm.todos.splice(index, 1);
                    },
                    function(error) {
                        $log.error('failure to delete todo', error);
                    }
                );
        }

        //Sort Items
        vm.sortOrder = function(order) {
            vm.todos = $filter('orderBy')(vm.todos, order);
        }


    }
})();
