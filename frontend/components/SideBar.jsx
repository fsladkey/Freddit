var React = require('react');
var ReactDOM = require('react-dom');
var SideSignInForm = require('./SideSignInForm');
var ModalStore = require('../stores/modal_store');
var UserStore = require('../stores/user_store');
var SignInModal = require('./SignInModal');

var SideBar = React.createClass({
  handleClick: function () {
    if (UserStore.currentUser()) {
      this.props.history.push("/r/" + this.props.sub.title + "/new");
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  },

  render: function () {
    var sub = this.props.sub;

    return (
      <div className="sidebar">
        <button onClick={this.handleClick}>Make A New Post</button>
        <input className="search" placeholder="search" />
        <SideSignInForm sub={sub} />
      </div>
    );
  }

});

module.exports = SideBar;
