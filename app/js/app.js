(function() {
    'use strict';

    angular
        .module('todoApp', [
            'ui.router',
            'xeditable',
            'toastr'
        ])

        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('todoitems');

            $stateProvider.state('todoitems', {
                url: '/todoitems',
                templateUrl: 'app/templates/todoes.html',
                controller: 'ToDoController as vm'
            })
        })

        .run(function(editableOptions) {
            editableOptions.theme = 'bs3';
        })

        .value('apiUrl', 'http://localhost:60026/api/todoitems/');

})();
