var React = require('react');
var ReactDOM = require('react-dom');

var PostPreview = React.createClass({

  render: function () {
    var post = this.props.post,
        sub = post.sub,
        url = "/#/r/" + sub.title + "/" + post.id;

    return (
      <li className="post-preview">
        <h4><a className="clickable" href={url}>{post.title}</a></h4>
        <p>Submitted by {post.user.username}</p>
      </li>
    );
  }

});

module.exports = PostPreview;
