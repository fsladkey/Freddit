var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Sub = require('./components/Sub');

var App = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Sub}/>
    <Route path="r/:subName" component={Sub}/>
  </Route>
);

$(function () {
  var root = document.getElementById('content');
  ReactDOM.render(<Router>{routes}</Router>, root);
});
