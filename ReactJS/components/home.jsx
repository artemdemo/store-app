/*global React, document*/
var Home = React.createClass({
  render: function() {
    return (
      <div className="home-page">
        <div className="container">
            <h1>Start shopping now</h1>
            <a href="pages/store.html" className="button">Enter Store</a>
        </div>
    </div>
    );
  }
});

React
  .render(
    <Home />,
    document.getElementById('mainContainer')
  );