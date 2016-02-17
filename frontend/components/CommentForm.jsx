var React = require('react');
var ReactDOM = require('react-dom');
var CommentApiUtil = require('../util/comment_api_util');
var UserStore = require('../stores/user_store');

var CommentForm = React.createClass({

  getInitialState: function () {
    return { body: "", currentUser: UserStore.currentUser() };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
  },

  handleBodyChange: function (e) {
    this.setState({ body: e.currentTarget.value });
  },

  handleSubmit: function (e) {
    debugger
    e.preventDefault();
    var comment = {
      body: this.state.body,
      post_id: this.props.post.id,
      parent_comment_id: this.props.parentComment && this.props.parentComment.id
    };

    CommentApiUtil.createComment(comment, function () {
      this.setState({ body: "" });
      this.props.toggleForm && this.props.toggleForm();
    }.bind(this));
  },

  cancelButton: function () {
    if (!this.props.hideCancel) {
      return <button onClick={this.props.toggleForm}>Cancel</button>;
    }
  },

  render: function () {
    if (this.state.currentUser) {
      return (
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleBodyChange} value={this.state.body}/>
          <div className="comment-buttons">
            <button>Submit</button>
            {this.cancelButton()}
          </div>
        </form>
      );
    } else {
      return <div></div>;
    }
  },

  _usersChanged: function () {
    this.setState({ currentUser: UserStore.currentUser() });
  }

});

module.exports = CommentForm;
