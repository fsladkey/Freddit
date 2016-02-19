var React = require('react');
var ReactDOM = require('react-dom');
var PostStore = require('../stores/post_store');
var SubStore = require('../stores/sub_store');
var PostApiUtil = require('../util/post_api_util');

var PostForm = React.createClass({
  getInitialState: function () {
    return {title: "", body: "", sub: SubStore.findByName(this.props.params.subName)};
  },

  componentDidMount: function () {
    this.subListener = SubStore.addListener(this._subsChanged);
    if (!this.state.sub) {
      SubApiUtil.fetchSub(this.props.params.subName);
    }
  },

  componentWillUnmount: function () {
    this.subListener.remove();
  },

  handleTitleChange: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleBodyChange: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  handleSubChange: function (e) {

  },

  handleSubmit: function (e) {
    e.preventDefault();
    PostApiUtil.createPost({
      title: this.state.title,
      body: this.state.body,
      sub_id: this.state.sub.id
    }, function () {
      this.props.history.push("/r/" + this.state.sub.title);
    }.bind(this));
  },

  render: function () {
    var sub = this.state.sub,
        subName = sub ? sub.title : "";

    return (
      <div className="new-post-form">

        <h4>Submit to {subName}</h4>

        <label>Title</label>
        <form onSubmit={this.handleSubmit}>
          <section>
            <h4>Title</h4>
            <input onChange={this.handleTitleChange} placeholder="the title!" value={this.state.title}/>
          </section>

          <label>Title</label>
          <section>
            <h4>Body</h4>
            <textarea onChange={this.handleBodyChange} placeholder="the body!" value={this.state.body}></textarea>
          </section>

          <section>
            <h4>Choose a Subfreddit</h4>
            <input value={subName} />
          </section>

          <button>Submit</button>

        </form>
      </div>
    );
  },

  _subsChanged: function () {
    this.setState({sub: SubStore.findByName(this.props.params.subName)});
  }

});

module.exports = PostForm;
