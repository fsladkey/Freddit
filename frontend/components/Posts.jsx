var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var PostApiUtil = require('../util/post_api_util');
var PostPreview = require('./PostPreview');

var Posts = React.createClass({

  getInitialState: function () {
    return { posts: []};
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    sub = this.findSubByName(this.props.subName);
    sub ? PostApiUtil.fetchSubPosts(sub.id) : PostApiUtil.fetchAllPosts();
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    sub = this.findSubByName(newProps.subName);
    sub ? PostApiUtil.fetchSubPosts(sub.id) : PostApiUtil.fetchAllPosts();
  },

  findSubByName: function (subName) {
    return SubStore.all().find(function(sub) {
      return sub.title == subName;
    });
  },

  render: function () {
    var posts = (
      this.state.posts.map(function (post) {
        return <PostPreview key={post.id }post={post}/>;
      })
    );

    return (
      <div>
        <ul>
          {posts}
        </ul>
      </div>
    );
  },

  _postsChanged: function () {
    this.setState({posts: PostStore.all()});
  }

});

module.exports = Posts;
