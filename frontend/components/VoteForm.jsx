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

  render: function () {
    return (
    <div className="post-vote-form">
      <button className="vote-arrow" onClick={this.upvote}><i className="fa fa-arrow-up"></i></button>
        <div className="votes">{this.props.post.total_votes}</div>
      <button className="vote-arrow"  onClick={this.downvote}><i className="fa fa-arrow-down"></i></button>
    </div>
    );
  },


  _postsChanged: function () {
    this.setState(this.getStateFromStore());
  }

});

module.exports = VoteForm;
