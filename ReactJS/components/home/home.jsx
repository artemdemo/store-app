/*global React, document*/
var Home = React.createClass({
  openStore: function() {
    React.unmountComponentAtNode( document.getElementById('mainContainer') );
    StoreService.init();
  },
  render: function() {
    return (
      <div className="home-page">
        <div className="container">
            <h1>Start shopping now</h1>
            <button onClick={this.openStore} className="button">Enter Store</button>
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