var React = require('react'),
    ReactDOM = require('react-dom'),
    ModalActions = require('../../actions/modal_actions'),
    UserStore = require('../../stores/user_store'),
    SignInModal = require('../shared/sign_in_modal/SignInModal'),
    SignInInfo = require('../shared/SignInInfo'),
    CurrentUserInfo = require('../shared/CurrentUserInfo');

module.exports = React.createClass({

  getInitialState: function () {
    return {currentUser: UserStore.currentUser()};
  },

  handleClick: function () {
    ModalActions.receiveModal(<SignInModal/>);
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  render: function () {
    var content;
    if (this.state.currentUser) {
      return <CurrentUserInfo/>;
    } else {
      return <SignInInfo/>;
    }
  },

  _usersChanged: function () {
    this.setState({currentUser: UserStore.currentUser()});
  }

});
