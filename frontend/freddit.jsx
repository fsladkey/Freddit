var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Sub = require('./components/Sub');
var Post = require('./components/Post');
var App = require('./components/App');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Sub}/>
    <Route path="r/:subName" component={Sub}>
      <Route path=":id" component={Post}/>
    </Route>
  </Route>
);

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var scrollToTop = function () {
  window.scrollTo(0, 0);
};

$(function () {
  var root = document.getElementById('content');
  ReactDOM.render(<Router onUpdate={scrollToTop}>{routes}</Router>, root);
});
