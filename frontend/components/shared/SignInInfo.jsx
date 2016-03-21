var React = require('react'),
    ReactDOM = require('react-dom'),
    ModalActions = require('../../actions/modal_actions'),
    SignInModal = require('./sign_in_modal/SignInModal');

module.exports = React.createClass({

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
