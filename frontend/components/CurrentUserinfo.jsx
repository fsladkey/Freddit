var React = require('react');
var ReactDOM = require('react-dom');
var UserStore = require('../stores/user_store');
var UserApiUtil = require('../util/user_api_util');

var UserInfo = React.createClass({

  handleClick: function () {
    ModalActions.receiveModal(<SignInModal/>);
  },

  logOut: function () {
    UserApiUtil.signOutUser();
  },

  render: function () {
    var user = UserStore.currentUser();
    return (
      <div className="user-info">
        <p>
          {user.username + " "}
          <button className="clickable" onClick={this.logOut}>Sign Out</button>
        </p>
      </div>
    );
  }

});


module.exports = UserInfo;
