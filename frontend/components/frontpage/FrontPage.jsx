var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('../navbar/NavBar');
var Posts = require('../posts/Posts');
var SideBar = require('../shared/SideBar');

module.exports = React.createClass({
  getInitialState: function () {
    return { posts: []};
  },

  getStateFromStore: function () {
    return { posts: PostStore.all() };
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    PostApiUtil.fetchAllPosts(this.state.params);
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  _postsChanged: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    var body;
    if (this.props.children) {
      body = this.props.children;
    } else {
      body = <Posts posts={this.state.posts} showSub={true}/>;
    }

    return (
      <div>
        <NavBar subName={"all"}/>
        <div className="main-content">
          {body}
        </div>
        <SideBar history={this.props.history} sub={this.state.sub}/>
      </div>
    );
  }

});
