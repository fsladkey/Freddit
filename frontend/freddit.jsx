var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    browserHistory = ReactRouter.browserHistory,
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Sub = require('./components/subs/Sub'),
    SubControversial = require('./components/subs/SubControversial'),
    SubNew = require('./components/subs/SubNew'),
    SubHot = require('./components/subs/SubHot'),
    SubTop = require('./components/subs/SubTop'),
    FrontPage = require('./components/frontpage/FrontPage'),
    FrontPageNew = require('./components/frontpage/FrontPageNew'),
    FrontPageHot = require('./components/frontpage/FrontPageHot'),
    FrontPageTop = require('./components/frontpage/FrontPageTop'),
    FrontPageControversial = require('./components/frontpage/FrontPageControversial'),
    Post = require('./components/posts/Post'),
    PostForm = require('./components/posts/PostForm'),
    SideBar = require('./components/shared/SideBar'),
    App = require('./components/App'),
    UserStore = require('./stores/user_store'),
    UserApiUtil = require('./util/user_api_util');

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
      <IndexRoute component={FrontPageHot}/>
      <Route path="new" component={FrontPageNew}/>
      <Route path="hot" component={FrontPageHot}/>
      <Route path="top" component={FrontPageTop}/>
      <Route path="controversial" component={FrontPageControversial}/>
      <Route path="r/:subName" component={Sub}>
        <Route path="submit" component={PostForm}/>
        <Route path=":id" component={Post}/>
      </Route>
      <Route path="r/:subName/new" component={SubNew}/>
      <Route path="r/:subName/hot" component={SubHot}/>
      <Route path="r/:subName/top" component={SubTop}/>
      <Route path="r/:subName/controversial" component={SubControversial}/>
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
