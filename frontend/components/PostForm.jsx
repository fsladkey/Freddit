var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var SubStore = require('../stores/sub_store');
var PostApiUtil = require('../util/post_api_util');

var Post = React.createClass({
  getInitialState: function () {
    return {title: "", body: "", sub: SubStore.findByName(this.props.params.subName)};
  },

  componentDidMount: function () {
    this.subListener = SubStore.addListener(this._subsChanged);
    if (!this.state.sub) {
      SubApiUtil.fetchSub(this.props.params.subName);
    }
  },

  render: function () {
    var sub = this.state.sub,
        subName = sub ? sub.title : "";

    return (
      <div className="new-post-form">
        <h4>Submit to {subName}</h4>
        <label>Title
          <input placeholder="the title!"/>
        </label>

        <label>Title
          <textarea placeholder="the body!"></textarea>
        </label>
      </div>
    );

  },

  _subsChanged: function () {
    this.setState({sub: SubStore.findByName(this.props.params.subName)});
  }

});

module.exports = Post;
