var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var Posts = require('./Posts');
var SideBar = require('./SideBar');
var PostStore = require('../stores/post_store');
var SubApiUtil = require('../util/sub_api_util');

var Sub = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    SubApiUtil.fetchSub(this.props.params.subName);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore());
    SubApiUtil.fetchSub(newProps.params.subName);
  },

  getStateFromStore: function () {
    var sub = SubStore.findByName(this.props.params.subName);
    var posts = [];
    if (sub) {
      posts = PostStore.findBySub(sub.id, "upvoted");
    }

    return { sub: sub, posts: posts };
  },

  _postsChanged: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    var body;

    if (this.props.children) {
      body = this.props.children;
    } else {
      body = (
        <div>
          <Posts posts={this.state.posts} showSub={false}/>
          <SideBar history={this.props.history} sub={this.state.sub}/>
        </div>
      );
    }
    return (
      <div>
        <NavBar subName={this.props.params.subName}/>
        <div className="main-content">
          {body}

        </div>
      </div>
    );
  }

});

module.exports = Sub;
