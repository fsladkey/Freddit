var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({

  childComments: function () {
    var parentComment = this.props.comment;
    var post = PostStore.find(parentComment.post_id);
    return post.comments.filter(function(comment) {
      return comment.commentable_type == "Comment" &&
      comment.commentable_id === parentComment.id;
    });
  },

  render: function () {
    debugger
    var comment = this.props.comment;
    return (
      <li className="comment">
        <p>{comment.body}</p>
        <p>
          <a href="#">
            posted by: {comment.user.username}
          </a>
        </p>
      </li>
    );
  }

});

module.exports = Comment;
