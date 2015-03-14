/*global React, $, document, console*/

/*
 * ToDo MVC tutorial: https://www.codementor.io/reactjs/tutorial/react-js-flux-architecture-tutorial
 */

var StoreContainer = React.createClass({displayName: "StoreContainer",
  render: function() {
    return (
        React.createElement("div", {className: "store-page"}, 
            React.createElement("div", {className: "container clearRow"}, 
                React.createElement(Shelf, null)
            )
        )
    );
  }
});

var Shelf = React.createClass({displayName: "Shelf",
  render: function() {
    return (
        React.createElement("div", {className: "shelfContainer"}, 
            React.createElement("div", {className: "categoriesContainer"}, 
                React.createElement("ul", {className: "list clearRow"}, 
                    React.createElement("li", {className: "item"}
                    )
                )
            ), 
           React.createElement("div", {className: "itemsContainer"}, 
                React.createElement("ul", {className: "list"}, 
                    React.createElement("li", {className: "item clearRow"}, 
                        React.createElement("div", {className: "clearRow"}, 
                            React.createElement("div", {className: "name left"}), 
                            React.createElement("div", {className: "price right"})
                        ), 
                        React.createElement("div", {className: "description muted-text"})
                    )
                )
            )
        )
    );
  }
});



var StoreClass = function() {

    var self = this;
    
    this.init = function() {
        console.log('11');
        React
          .render(
            React.createElement(StoreContainer, null),
            document.getElementById('mainContainer')
          );
    };
};

$(document).ready(function(){
    var store = new StoreClass();
    store.init();
});

