/*global React, $, document, console*/

/*
 * ToDo MVC tutorial: https://www.codementor.io/reactjs/tutorial/react-js-flux-architecture-tutorial
 */

var StoreContainer = React.createClass({
  render: function() {
    return (
        <div className="store-page">
            <div className="container clearRow">
                <Shelf />
            </div>
        </div>
    );
  }
});

var Shelf = React.createClass({
  render: function() {
    return (
        <div className="shelfContainer">
            <div className="categoriesContainer">
                <ul className="list clearRow">
                    <li className="item">
                    </li>
                </ul>
            </div>
           <div className="itemsContainer">
                <ul className="list">
                    <li className="item clearRow">
                        <div className="clearRow">
                            <div className="name left"></div>
                            <div className="price right"></div>
                        </div>
                        <div className="description muted-text"></div>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
});



var StoreClass = function() {

    var self = this;
    
    this.init = function() {
        console.log('11');
        React
          .render(
            <StoreContainer />,
            document.getElementById('mainContainer')
          );
    };
};

$(document).ready(function(){
    var store = new StoreClass();
    store.init();
});

