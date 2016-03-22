var React = require('react');
var ReactDOM = require('react-dom');

var CommentBody = React.createClass({

  componentDidMount: function () {

    var setTimeAgo = function () {
      $("abbr.timeago").timeago();
    }.bind(this);

  },

  render: function () {
    var comment = this.props.comment;

    return (
      <div className="comment-body">
        <p>
          <a href="#" className="clickable">
            {comment.user.username}
          </a>
          <span>
            {" " + comment.score + " points "}
            <abbr
              className="timeago"
              title={comment.created_at}
            >
              {comment.created_at}
            </abbr>
          </span>
        </p>
        <p>{comment.body}</p>
      </div>
    );
  }

});

module.exports = CommentBody;
