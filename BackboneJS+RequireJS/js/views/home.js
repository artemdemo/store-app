define(
    [
        'backbone',
        'underscore',
        '../common',
        'text!../../templates/home.html'
    ],
    function(Backbone, _, common, homeTemplate){

        var view = Backbone.View.extend({
            el: common.mainContainer,
            render: function () {
                var self = this;
                var template = _.template( homeTemplate );
                self.$el.html( template() );
            }
        });

        return (function(){
            var home;

            return (function(){
                home = home || new view;
                return home;
            })();
        })();

    });