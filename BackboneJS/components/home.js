/*global storeApp, _, $, Backbone*/
(function(app) {

    app.views.home = Backbone.View.extend({
        template: _.template($("#tpl-home").html()),
          
        tagName: "div",

        className: "home-page",
        
        initialize: function() {
            this.render();
        },
        render: function(){
            /* 
             * "this.$el" is an object created by the framework and every view has it by default.
             * By default, it is an empty <div></div>.
             * It can be changed in "tagName"
             */
            this.$el.html(this.template({}));
        }
    });
    
})(storeApp);