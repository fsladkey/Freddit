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

  subInfo: function () {
    var subUrl = this.subUrl();
    return this.props.showSub ? <span> to: <a className="clickable" href={subUrl}>{subUrl.slice(1)}</a></span> : null;
  },

  subUrl: function () {
    var subName = this.props.post.sub.title;
    return"#/r/" + subName;
  },

  render: function () {
    var post = this.props.post,
        sub = post.sub;

    return (
      <li className="post-preview">

        <div className="post-preview-left">
          <VoteForm post={post}/>
        </div>

        <div className="post-preview-right">
          <h4>
            <a className="clickable" href={this.subUrl() + "/" + post.id}>{post.title}</a>
          </h4>
          <p>
            Submitted <abbr
              className="timeago"
              title={post.created_at}>{post.created_at}
            </abbr> by <a className="clickable" href="#">{post.user.username}</a>
            {this.subInfo()}
          </p>
        </div>

      </li>
    );
  }

});

module.exports = PostPreview;
