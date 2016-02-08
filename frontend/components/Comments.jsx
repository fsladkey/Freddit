var React = require('react');
var ReactDOM = require('react-dom');

var Comments = React.createClass({

  render: function () {
    var comments = this.props.comments.map(
      function (comment) {
        return <Comment comment={comment} key={comment.id}/>;
    });

    return (
      <ul className="comments">
        {comments}
      </ul>
    );
  }

});

module.exports = Comments;
var Comment = require('./Comment');
