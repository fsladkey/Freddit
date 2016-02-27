var React = require('react');
var ReactDOM = require('react-dom');
var SignInModal = require('./SignInModal');
var Comments = require('./Comments');
var PostApiUtil = require('../util/post_api_util');
var ModalActions = require('../actions/modal_actions');
var PostStore = require('../stores/post_store');
var UserStore = require('../stores/user_store');

var VoteForm = React.createClass({

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
        {this.props.post.total_votes}
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

module.exports = VoteForm;
