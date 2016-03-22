var React = require('react');
var ReactDOM = require('react-dom');
var Comments = require('./Comments');
var CommentForm = require('./CommentForm');
var CommentBody = require('./CommentBody');
var SignInModal = require('../shared/sign_in_modal/SignInModal');
var VoteForm = require('../shared/VoteForm');
var ModalActions = require('../../actions/modal_actions');
var CommentApiUtil = require('../../util/comment_api_util');
var UserStore = require('../../stores/user_store');

var Comment = React.createClass({

  getInitialState: function () {
    return {
      showForm: false,
      currentUser: UserStore.currentUser()
    };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
  },

  componentWillUnmount: function () {
  this.userListener.remove();
  },

  _usersChanged: function () {
    this.setState({ currentUser: UserStore.currentUser() });
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

  deleteButton: function () {
    var currentUser = this.state.currentUser;
    if (currentUser && currentUser.id == this.props.comment.user_id) {
      return <button onClick={this.deleteComment}>delete</button>;
    }
  },

  deleteComment: function () {
    CommentApiUtil.destroyComment(this.props.comment.id);
  },

  commentForm: function () {
    if (this.state.showForm) {
      return (
        <CommentForm
          toggleForm={this.toggleForm}
          parentComment={this.props.comment}
          post={this.props.post} />
      );
    }
  },

  render: function () {
    var comment = this.props.comment,
        commentClass = this.props.commentClass == "even" ? "odd" : "even";

    return (
      <div className={"comment " + commentClass}>
        <li>

          <div className="comment-row">
            <VoteForm item={comment} itemType="Comment" hideScore={true}/>
            <CommentBody comment={comment} />
          </div>

          <button onClick={this.toggleForm}>reply</button>
          {this.deleteButton()}
          {this.commentForm()}
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
