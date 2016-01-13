var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var PostApiUtil = require('../util/post_api_util');

var Post = React.createClass({

  getInitialState: function () {
    return {post: PostStore.find(this.props.params.id)};
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    PostApiUtil.fetchPost(this.props.params.id);
    // HACKY AS SHIT I KNOW, GODDAMN
    setTimeout(function () { jQuery("abbr.timeago").timeago(); }, 100);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    PostApiUtil.fetchPost(this.newProps.params.id);
  },

  render: function () {
    var post = this.state.post;

    if (post) {
      return (
        <div className="post-detail">
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
    this.setState({post: PostStore.find(this.props.params.id)});
  }


});

module.exports = Post;
