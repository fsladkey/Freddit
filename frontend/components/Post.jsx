var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var PostApiUtil = require('../util/post_api_util');
var Comments = require('./Comments');

var Post = React.createClass({

  getInitialState: function () {
    return {post: PostStore.find(this.props.params.id), showTime: false};
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    PostApiUtil.fetchPost(this.props.params.id);
    jQuery("abbr.timeago").timeago();

    setTimeout(function () {
      jQuery("abbr.timeago").timeago();
      this.setState({showTime: true});
    }.bind(this), 300);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    jQuery("abbr.timeago").timeago();
    PostApiUtil.fetchPost(this.newProps.params.id);
  },

  postComments: function () {
    return this.state.post.comments.filter(function (comment) {
      return !comment.parent_comment_id;
    });
  },

  render: function () {
    var post = this.state.post;
    var className = this.state.showTime ? "timeago" : "timeago hidden";
    if (post) {
      return (
        <div>
          <div className="post-detail">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>
              Submitted <abbr
                  className={className}
                  title={post.created_at}>{post.created_at}
                </abbr> by <a className="clickable" href="#">{post.user.username}</a>
            </p>
          </div>
          <div className="post-comments">
            <Comments comments={this.postComments()}/>
          </div>
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
