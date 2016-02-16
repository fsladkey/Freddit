var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var PostApiUtil = require('../util/post_api_util');
var Comments = require('./Comments');

var VoteForm = React.createClass({

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    PostApiUtil.fetchPost(this.props.post.id);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  upvote: function () {
    PostApiUtil.upvote(this.props.post.id);
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
    this.setState({post: PostStore.find(this.props.post.id)});
  }

});

module.exports = VoteForm;
