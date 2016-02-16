var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var Posts = require('./Posts');
var SideBar = require('./SideBar');

var FrontPage = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all()};
  },

  componentDidMount: function () {
    this.postListener = PostStore.addListener(this._postsChanged);
    PostApiUtil.fetchAllPosts();
  },

  componentWillUnmount: function () {
    this.postListener.remove();
  },

  _postsChanged: function () {
    this.setState({posts: PostStore.all()});
  },

  render: function () {
    var body;
    if (this.props.children) {
      body = this.props.children;
    } else {
      body = <Posts posts={this.state.posts}/>;
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
