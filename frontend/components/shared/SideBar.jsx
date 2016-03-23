var React = require('react'),
    ReactDOM = require('react-dom'),
    ModalStore = require('../../stores/modal_store'),
    ModalActions = require('../../actions/modal_actions'),
    UserStore = require('../../stores/user_store'),
    SideSignInForm = require('./SideSignInForm'),
    SignInModal = require('./sign_in_modal/SignInModal');

var SideBar = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore();
  },

  handleClick: function () {
    if (UserStore.currentUser()) {
      this.props.history.push("/r/" + this.props.sub.title + "/submit");
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
