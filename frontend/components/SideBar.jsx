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
    var signInForm = UserStore.currentUser() ? <SideSignInForm sub={sub} /> : null;

    return (
      <div className="sidebar">
        <button className="new-post-button" onClick={this.handleClick}>Make A New Post</button>
        <input className="search" placeholder="search" />
        {signInForm}
      </div>
    );
  }

});

module.exports = SideBar;
