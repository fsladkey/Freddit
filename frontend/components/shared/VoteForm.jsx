var React = require('react'),
    ReactDOM = require('react-dom'),
    PostApiUtil = require('../../util/post_api_util'),
    CommentApiUtil = require('../../util/comment_api_util'),
    ModalActions = require('../../actions/modal_actions'),
    PostStore = require('../../stores/post_store'),
    UserStore = require('../../stores/user_store'),
    SignInModal = require('./sign_in_modal/SignInModal');

var VoteForm = React.createClass({

  getInitialState: function () {
    return { currentUser: UserStore.currentUser() };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._change);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  upvote: function () {
    this.tryVote(1);
  },

  downvote: function () {
    this.tryVote(-1);
  },

  tryVote: function (dir) {
    if (this.state.currentUser) {
      this.vote(dir);
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  },

  vote: function (dir) {
    var apiUtil = this.props.itemType == "Post" ? PostApiUtil : CommentApiUtil;
    if (dir === 1) {
      apiUtil.upvote(this.props.item.id);
    } else {
      apiUtil.downvote(this.props.item.id);
    }
  },

  voteActive: function (direction, val) {
    var result = "";
    var currentUser = this.state.currentUser;

    if (!currentUser) { return result; }

    this.props.item.votes.forEach(function (vote) {
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

      <div className={"votes" + upvoteActive + downvoteActive}>
        { this.props.hideScore ? "" : this.props.item.score }
      </div>

      <button className="vote-arrow" onClick={this.downvote}>
        <i className={"fa fa-arrow-down" + downvoteActive}></i>
      </button>
    </div>
    );
  },

  _change: function () {
    this.setState({ currentUser: UserStore.currentUser() });
  },

});

module.exports = VoteForm;
