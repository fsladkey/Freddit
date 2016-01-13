var React = require('react');
var ReactDOM = require('react-dom');
var SignInModal = require('./SignInModal');
var ModalActions = require('../actions/modal_actions');

var UserInfo = React.createClass({

  handleClick: function () {
    ModalActions.receiveModal(<SignInModal/>);
  },

  render: function () {
    return (
      <div className="user-info">
        <p>
          Want to join?
          <span className="sign-up-link" onClick={this.handleClick}> Log in </span>
          or
          <span className="sign-up-link" onClick={this.handleClick}> sign up </span>
          now.
        </p>
      </div>
    );
  }

});


module.exports = UserInfo;
