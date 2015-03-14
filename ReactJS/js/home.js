/*global React, document*/
var Home = React.createClass({displayName: "Home",
  render: function() {
    return (
      React.createElement("div", {className: "home-page"}, 
        React.createElement("div", {className: "container"}, 
            React.createElement("h1", null, "Start shopping now"), 
            React.createElement("a", {href: "pages/store.html", className: "button"}, "Enter Store")
        )
    )
    );
  }
});

React
  .render(
    React.createElement(Home, null),
    document.getElementById('mainContainer')
  );