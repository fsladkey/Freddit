var React = require('react');
var ReactDOM = require('react-dom');
var UserApiUtil = require('../util/user_api_util');
var ModalActions = require('../actions/modal_actions');

var SignUpForm = React.createClass({

  getInitialState: function () {
    return {username: "", email: "", password: "", passwordConfirmation: ""};
  },

  handleSubmit: function () {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    };
    UserApiUtil.signUpUser(data);
    ModalActions.receiveModal(null);
  },

  usernameChange: function (e) {
    this.setState({username: e.currentTarget.value});
  },

  emailChange: function (e) {
    this.setState({email: e.currentTarget.value});
  },

  passwordChange: function (e) {
    this.setState({password: e.currentTarget.value});
  },

  passwordConfirmationChange: function (e) {
    this.setState({passwordConfirmation: e.currentTarget.value});
  },

  render: function () {
    return (
      <div className="sign-in-form">
        <h2>Create an Account</h2>
        
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            onChange={this.usernameChange}
            type="text"
            placeholder="username"
            value={this.state.username}/>

          <label>Email</label>
            <input
              onChange={this.emailChange}
                type="text"
                placeholder="email"
                value={this.state.email}/>

          <label>Password</label>
            <input
              onChange={this.passwordChange}
              type="password"
              placeholder="password"
              value={this.state.password}/>

          <label>Password Confirmation</label>
            <input
              onChange={this.passwordConfirmationChange}
              type="password"
              placeholder="confirm password"
              value={this.state.passwordConfirmation}/>
          <input  type="submit" value="Sign Up"/>
        </form>
      </div>
    );
  }

});

module.exports = SignUpForm;
