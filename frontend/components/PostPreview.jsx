var React = require('react');
var ReactDOM = require('react-dom');
var VoteForm = require('./VoteForm');

var PostPreview = React.createClass({

  componentDidMount: function () {
    jQuery("abbr.timeago").timeago();

    // setTimeout(function () {
    //   jQuery("abbr.timeago").timeago();
    //   this.setState({showTime: true});
    // }.bind(this), 300);
  },

  render: function () {
    var post = this.props.post,
        sub = post.sub,
        url = "/#/r/" + sub.title + "/" + post.id;

    return (
      <li className="post-preview">

        <div className="post-preview-left">
          <VoteForm post={post}/>
        </div>

        <div className="post-preview-right">
          <h4>
            <a className="clickable" href={url}>{post.title}</a>
          </h4>
          <p>
            Submitted <abbr
              className="timeago"
              title={post.created_at}>{post.created_at}
            </abbr> by <a className="clickable" href="#">{post.user.username}</a>
          </p>
        </div>

      </li>
    );
  }

});

module.exports = PostPreview;
