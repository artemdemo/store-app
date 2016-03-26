define([
    'backbone',
    '../models/category'
], function(Backbone, Category){

    return (function(){

        var collection = Backbone.Collection.extend({
            url: '../menu.json',
            model: Category
        });

        return (function () {
            var menu;

            return (function(){
                if (!menu) {
                    menu = new collection;
                    menu.fetch();
                }
                return menu;
            })();
        })()

    })()

});