var React = require('react'),
    ReactDOM = require('react-dom'),
    UserStore = require('../../stores/user_store'),
    UserApiUtil = require('../../util/user_api_util');

module.exports = React.createClass({

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
