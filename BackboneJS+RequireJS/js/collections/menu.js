define(
    [
        'backbone',
        '../models/category'
    ],
    function(Backbone, Category){

        return (function(){

            var menu;

            function createInstance() {
                var Collection = Backbone.Collection.extend({
                    url: '../menu.json',
                    model: Category
                });
                return new Collection;
            }

            return (function () {
                if (!menu) {
                    menu = createInstance();
                    menu.fetch();
                }
                return menu;
            })()

        })()

    });