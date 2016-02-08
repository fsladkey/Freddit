var React = require('react');
var ReactDOM = require('react-dom');
var Comments = require('./Comments');

var Comment = React.createClass({

  childComments: function () {
    var parentComment = this.props.comment;
    var post = PostStore.find(parentComment.post_id);

    return post.comments.filter(function(comment) {
      return comment.parent_comment_id === parentComment.id;
    });

  },

  render: function () {
    var comment = this.props.comment;
    return (
      <li>
      <div className="comment">
        <p>
          <a href="#" className="clickable">
          {comment.user.username}
          </a>
        </p>

        <p>{comment.body}</p>
      </div>
        <Comments comments={this.childComments()}/>
      </li>
    );
  }

});

module.exports = Comment;
