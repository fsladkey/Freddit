var React = require('react');
var ReactDOM = require('react-dom');

var PostPreview = React.createClass({

  render: function () {
    var post = this.props.post,
        sub = post.sub,
        url = "/r/" + sub.title + "/" + post.id;

    return (
      <li><a href={url}>{post.title}</a></li>
    );
  }

});

module.exports = PostPreview;
