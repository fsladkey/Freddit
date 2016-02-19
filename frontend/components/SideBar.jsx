var React = require('react');
var ReactDOM = require('react-dom');
var SideSignInForm = require('./SideSignInForm');
var ModalStore = require('../stores/modal_store');
var ModalActions = require('../actions/modal_actions');
var UserStore = require('../stores/user_store');
var SignInModal = require('./SignInModal');

var SideBar = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore();
  },

  handleClick: function () {
    if (UserStore.currentUser()) {
      this.props.history.push("/r/" + this.props.sub.title + "/new");
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._userChanged);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  getStateFromStore: function () {
    return { loggedIn: !!UserStore.currentUser() };
  },

  render: function () {
    var sub = this.props.sub;
    var signInForm = this.state.loggedIn ? null : <SideSignInForm sub={sub} />;
    return (
      <div className="sidebar">
        <button className="new-post-button" onClick={this.handleClick}>Make A New Post</button>
        <input className="search" placeholder="search" />
        {signInForm}
      </div>
    );
  },

  _userChanged: function () {
    this.setState(this.getStateFromStore());
  }

});

module.exports = SideBar;
