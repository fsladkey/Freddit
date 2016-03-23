var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('../navbar/NavBar');
var Posts = require('../posts/Posts');
var SideBar = require('../shared/SideBar');
var SortingTabs = require('../navbar/SortingTabs');
var PostStore = require('../../stores/post_store');
var SubApiUtil = require('../../util/sub_api_util');

var Sub = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore(this.props);
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    SubApiUtil.fetchSub(this.props.params.subName);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore(newProps));
    SubApiUtil.fetchSub(newProps.params.subName);
  },

  getStateFromStore: function (props) {
    var sub = SubStore.findByName(props.params.subName),
        posts;

    if (sub) {
      posts = PostStore.findBySub(sub.id);
    }

    return { sub: sub, posts: posts };
  },

  _postsChanged: function () {
    this.setState(this.getStateFromStore(this.props));
  },

  render: function () {
    var body,
        posts,
        url = "#r/" + this.props.subName;
    if (this.state.posts && this.state.posts.length > 1) {
      posts = <Posts posts={this.state.posts} showSub={false}/>;
    } else {
      posts = <img className="spinner" src={window.fredditAssests.spinner}/>;
    }
    if (this.props.children) {
      body = this.props.children;
    } else {
      body = (
        <div>
          {posts}
          <SideBar history={this.props.history} sub={this.state.sub}/>
        </div>
      );
    }
    return (
      <div>
        <NavBar
          subName={this.props.params.subName}
          tabs={<SortingTabs url={url}
          sort={this.props.sort} />}
        />
        <div className="main-content">
          {body}
        </div>
      </div>
    );
  }

});

module.exports = Sub;
