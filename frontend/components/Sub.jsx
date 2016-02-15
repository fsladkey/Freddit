var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var Posts = require('./Posts');

var Sub = React.createClass({

  getInitialState: function () {
    return { sub: SubStore.findByName(this.props.params.subName) };
  },

  componentDidMount: function () {
    this.subListener = SubStore.addListener(this._subsChanged);
    SubApiUtil.fetchSub(this.props.params.subName);
  },

  componentWillUnmount: function () {
    this.subListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({sub: SubStore.findByName(newProps.params.subName)});
    SubApiUtil.fetchSub(newProps.params.subName);
  },

  _subsChanged: function () {
    this.setState({ sub: SubStore.findByName(this.props.params.subName) });
  },

  render: function () {
    var body,
        sub,
        posts;
    if (this.props.children) {
      body = this.props.children;
    } else {
      sub = this.state.sub;
      posts = sub && sub.posts ? sub.posts : [];
      body = <Posts posts={posts}/>;
    }
    return (
      <div>
        <NavBar subName={this.props.params.subName}/>
        <div className="main-content">
          {body}
        </div>
        <SideBar sub={this.state.sub}/> 
      </div>
    );
  }

});

module.exports = Sub;
