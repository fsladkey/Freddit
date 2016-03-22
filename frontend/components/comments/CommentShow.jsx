var React = require('react');
var ReactDOM = require('react-dom');
var Comment = require('./Comment');

var CommentShow = React.createClass({

  getInitialState: function () {
    return this.getStateFromProps(this.props);
  },

  getStateFromProps: function (props) {
    var post = PostStore.find(props.params.id);
    var comment = post.comments.find(function (comment) {
      return comment.id == props.params.commentId;
    }, this);

    return { post: post, comment: comment };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromProps(newProps));
  },

  render: function () {
    if (!this.state.comment) { return <div></div>; }

    return (
      <Comment
        comment={this.state.comment}
        post={this.state.post}
      />
    );
  }

});

module.exports = CommentShow;
