/*global React, $, document, console, EventEmitter*/

// tutorial: https://www.codementor.io/reactjs/tutorial/react-js-flux-architecture-tutorial

/**
 * Initializing new emitter
 */
function Job(){
    EventEmitter.call(this);
}
Job.prototype = new EventEmitter();
var emitter = new Job();


var StoreContainer = React.createClass({
  render: function() {
    return (
        <div className="store-page">
            <div className="container clearRow">
                <Shelf />
                <Cart />
            </div>
        </div>
    );
  }
});


