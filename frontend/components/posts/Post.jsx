var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../../stores/post_store');
var PostApiUtil = require('../../util/post_api_util');
var Comments = require('../comments/Comments');
var VoteForm = require('../shared/VoteForm');
var CommentForm = require('../comments/CommentForm');

var Post = React.createClass({

  getInitialState: function () {
    return {
      post: PostStore.find(this.props.params.id)
    };
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);

    var setTimeAgo = function () {
      jQuery("abbr.timeago").timeago();
    }.bind(this);

    if (!this.state.post) {
      PostApiUtil.fetchPost(this.props.params.id, setTimeAgo);
    } else {
      setTimeAgo();
    }
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    PostApiUtil.fetchPost(newProps.params.id);
  },

  postComments: function () {
    return this.state.post.comments.filter(function (comment) {
      return !comment.parent_comment_id;
    });
  },

  comments: function () {
    var children = this.props.children;

    if (children) {
      return children;
    } else {
      return (
        <div className="post-comments">
          <CommentForm post={this.state.post} hideCancel={true} />
          <Comments post={this.state.post} comments={this.postComments()} />
        </div>
      );
    }
  },

  submitterInfo: function () {
    var post = this.state.post;
    return (
      <p className="submitter-info">
        Submitted <abbr
          className="timeago"
          title={post.created_at}>{post.created_at}
        </abbr> by <a className="clickable" href="#">{post.user.username}</a>
      </p>
    );
  },

  render: function () {
    var post = this.state.post;
    if (!post) { return <div></div>; }

    return (
      <div>

        <div className="post-detail">
          <div className="post-detail-left">
            <VoteForm item={post}/>
          </div>

          <div className="post-detail-right">
            <h3>{post.title}</h3>

            {this.submitterInfo()}

            <div className="post-body">
              <p>{post.body}</p>
            </div>
          </div>

        </div>

        {this.comments()}

      </div>
    );

  },

  _postsChanged: function () {
    this.setState({
      post: PostStore.find(this.props.params.id)
    });
  }


});

module.exports = Post;