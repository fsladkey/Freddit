var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Sub = require('./components/Sub');
var FrontPage = require('./components/FrontPage');
var Post = require('./components/Post');
var App = require('./components/App');
var UserStore = require('./stores/user_store');
var UserApiUtil = require('./util/user_api_util');

var _scrollToTop = function () {
  window.scrollTo(0, 0);
};

var _checkForSignedIn = function (state, replace, callback) {
  if (UserStore.currentUser()) {
    callback();
  } else {
    UserApiUtil.fetchCurrentUser(function () {
      callback();
    });
  }

};

var routes = (
  <Router history={browserHistory} onUpdate={_scrollToTop}>
    <Route path="/" component={App} >
      <IndexRoute component={FrontPage}/>
      <Route path="r/:subName" component={Sub}>
        <Route path=":id" component={Post}/>
      </Route>
    </Route>
  </Router>
);


$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});


$(function () {
  var root = document.getElementById('content');
  ReactDOM.render(routes, root);
});
