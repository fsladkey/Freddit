var React = require('react');
var ReactDOM = require('react-dom');

var ModalActions = require('../actions/modal_actions');
var UserStore = require('../stores/user_store');

var SignInModal = require('./SignInModal');
var SignInInfo = require('./SignInInfo');
var CurrentUserInfo = require('./CurrentUserInfo');

var UserInfo = React.createClass({

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


module.exports = UserInfo;
