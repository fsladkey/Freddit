var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var PostApiUtil = require('../util/post_api_util');

var Post = React.createClass({

  getInitialState: function () {
    return {post: this.findPostById(this.props.params.id)};
  },

  componentDidMount: function () {
    jQuery("abbr.timeago").timeago();
    this.postListener = PostStore.addListener(this._postsChanged);
    PostApiUtil.fetchPost(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    PostApiUtil.fetchPost(this.newProps.params.id);
  },

  findPostById: function (postId) {
    return PostStore.all().find(function (post) {
      return post.id == postId;
    });
  },

  render: function () {
    var post = this.state.post;
    if (post) {
      return (
        <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>Submitted <abbr className="timeago" title={post.created_at}>{post.created_at}</abbr> by {post.user.username}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  },

  _postsChanged: function () {
    this.setState({post: this.findPostById(this.props.params.id)});
  }


});

module.exports = Post;
