var React = require('react');
var ReactDOM = require('react-dom');

var Comments = React.createClass({

  render: function () {
    var comments = this.props.comments.map(
      function (comment) {
        return (
          <Comment
            commentClass={this.props.commentClass}
            comment={comment}
            post={this.props.post}
            key={comment.id}/>
        );
    }, this);

    return (
      <div>
        <ul className="comments">
          {comments}
        </ul>
    </div>
    );
  }

});

module.exports = Comments;
var Comment = require('./Comment');
