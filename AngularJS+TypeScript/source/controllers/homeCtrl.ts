module storeApp {

    class HomeCtrl {

        public static $inject = [
            '$state'
        ];

        constructor ( public $state ) {

        }

        enterStore () {
            this.$state.go('store');
        }

    }

    angular.module('storeApp')
        .controller('homeCtrl', HomeCtrl)
}