var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var PostApiUtil = require('../util/post_api_util');
var PostPreview = require('./PostPreview');

var Posts = React.createClass({

  render: function () {
    var posts = (
      this.props.posts.map(function (post) {
        return <PostPreview showSub={this.props.showSub} key={post.id }post={post}/>;
      }, this)
    );

    return (
      <div>
        <ul>
          {posts}
        </ul>
      </div>
    );
  },


});

module.exports = Posts;
