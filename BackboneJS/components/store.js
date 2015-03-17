/*global storeApp, _, $, Backbone*/
(function(app) {

    app.views.store = Backbone.View.extend({
        template: _.template($("#tpl-store").html()),
          
        tagName: "div",
        
        initialize: function() {
            this.viewB = new ViewsFactory.store_shelf();
            this.viewB.parentView = this;
            $(this.el).append(this.viewB.el);
            this.render();
        },
        render: function(){
            this.$el.html(this.template({}));
        }
    });
    
    app.views.store_shelf = Backbone.View.extend({
        template: _.template($("#tpl-store-shelf").html()),
          
        tagName: "div",
        
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.html(this.template({}));
        }
    });
    
})(storeApp);