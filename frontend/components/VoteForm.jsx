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
    return {post: PostStore.find(this.props.post.id)};
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    // do I need this fetch?
    if (!this.state.post) {
      PostApiUtil.fetchPost(this.props.post.id);
    }
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  upvote: function () {
    if (UserStore.currentUser()) {
      PostApiUtil.upvote(this.props.post.id);
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  },

  downvote: function () {
    PostApiUtil.downvote(this.props.post.id);
  },

  upvoteActive: function () {
    var result = "";
    var currentUser = UserStore.currentUser();
    if (!currentUser) {
      return result;
    }
    this.props.post.votes.forEach(function (vote) {
      if (vote.user_id == currentUser.id && vote.value == 1) {
        result = "active";
      }
    });
    return result;
  },

  downvoteActive: function () {
    var result = "";
    var currentUser = UserStore.currentUser();
    if (!currentUser) {
      return result;
    }
    this.props.post.votes.forEach(function (vote) {
      if (vote.user_id == currentUser.id && vote.value == -1) {
        result = "active";
      }
    });
    return result;
  },

  render: function () {
    var upvoteActive = this.upvoteActive();
    var downvoteActive = this.downvoteActive();
    return (
    <div className="post-vote-form">
      <button className="vote-arrow" onClick={this.upvote}><i className={"fa fa-arrow-up" + upvoteActive}></i></button>
        <div className="votes">{this.props.post.score}</div>
      <button className="vote-arrow"  onClick={this.downvote}><i className={"fa fa-arrow-down" + downvoteActive}></i></button>
    </div>
    );
  },


  _postsChanged: function () {
    this.setState(this.getStateFromStore());
  }

});

module.exports = VoteForm;
