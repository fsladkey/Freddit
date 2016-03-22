var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('../navbar/NavBar');
var Posts = require('../posts/Posts');
var SideBar = require('../shared/SideBar');

var FrontPage = React.createClass({
  getInitialState: function () {
    return { posts: null};
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
      if (this.state.posts) {
        body = <Posts posts={this.state.posts} showSub={true}/>;
      } else {
        body = <img className="spinner" src={window.fredditAssests.spinner}/>;
      }
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

module.exports = FrontPage;
