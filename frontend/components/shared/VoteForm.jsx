var React = require('react'),
    ReactDOM = require('react-dom'),
    PostApiUtil = require('../../util/post_api_util'),
    ModalActions = require('../../actions/modal_actions'),
    PostStore = require('../../stores/post_store'),
    UserStore = require('../../stores/user_store'),
    SignInModal = require('./sign_in_modal/SignInModal'),
    Comments = require('../comments/Comments');

module.exports = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      post: PostStore.find(this.props.post.id),
      currentUser: UserStore.currentUser()
    };
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._change);
    this.userListener = UserStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
    this.userListener.remove();
  },

  upvote: function () {
    if (this.state.currentUser) {
      PostApiUtil.upvote(this.props.post.id);
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  },

  downvote: function () {
    PostApiUtil.downvote(this.props.post.id);
  },

  voteActive: function (direction, val) {
    var result = "";
    var currentUser = this.state.currentUser;

    if (!currentUser) {
      return result;
    }
    this.props.post.votes.forEach(function (vote) {
      if (vote.user_id == currentUser.id && vote.value == val) {
        result = " active-" + direction;
      }
    });
    return result;
  },

  render: function () {
    var upvoteActive = this.voteActive("up", 1);
    var downvoteActive = this.voteActive("down", -1);
    return (
    <div className="post-vote-form">

      <button className="vote-arrow" onClick={this.upvote}>
        <i className={"fa fa-arrow-up" + upvoteActive}></i>
      </button>

      <div className="votes">
        {this.props.post.score}
      </div>

      <button className="vote-arrow" onClick={this.downvote}>
        <i className={"fa fa-arrow-down" + downvoteActive}></i>
      </button>
    </div>
    );
  },

  _change: function () {
    this.setState(this.getStateFromStore());
  },

});
