var React = require('react');
var ReactDOM = require('react-dom');
var Comments = require('./Comments');
var CommentForm = require('./CommentForm');
var SignInModal = require('./SignInModal');
var ModalActions = require('../actions/modal_actions');

var Comment = React.createClass({

  getInitialState: function () {
    return { showForm: false };
  },

  childComments: function () {
    var parentComment = this.props.comment;
    var post = PostStore.find(parentComment.post_id);

    return post.comments.filter(function(comment) {
      return comment.parent_comment_id === parentComment.id;
    });

  },

  toggleForm: function () {
    if (UserStore.currentUser()) {
      this.setState({ showForm: !this.state.showForm });
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  },

  render: function () {
    var comment = this.props.comment,
        commentClass = this.props.commentClass == "even" ? "odd" : "even",
        commentForm;
    if (this.state.showForm) {
      commentForm = (
        <CommentForm
          toggleForm={this.toggleForm}
          parentComment={comment}
          post={this.props.post} />
      );
    }

    return (
      <div className={"comment " + commentClass}>
      <li>
        <p>
          <a href="#" className="clickable">
          {comment.user.username}
          </a>
        </p>

        <p>{comment.body}</p>
        <button onClick={this.toggleForm}>reply</button>
        {commentForm}
        <Comments
          commentClass={commentClass}
          comments={this.childComments()}
          post={this.props.post}
          />
      </li>
      </div>
    );
  }

});

module.exports = Comment;
