var React = require('react');
var ReactDOM = require('react-dom');
var UserApiUtil = require('../util/user_api_util');
var ModalActions = require('../actions/modal_actions');

var SideSignInForm = React.createClass({

  getInitialState: function () {
    return {username: "", password: ""};
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var data = {
      username: this.state.username,
      password: this.state.password,
    };
    UserApiUtil.signInUser(data);
  },

  usernameChange: function (e) {
    this.setState({username: e.currentTarget.value});
  },

  passwordChange: function (e) {
    this.setState({password: e.currentTarget.value});
  },

  render: function () {
    return (
      <div className="side-sign-in-form">
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
            <input
              onChange={this.usernameChange}
              type="text"
              placeholder="email"
              value={this.state.username}/>

          <label>Password</label>
            <input
              onChange={this.passwordChange}
              type="password"
              placeholder="password"
              value={this.state.password}/>
          <input  type="submit" value="Sign In"/>
        </form>
      </div>
    );
  }

});

module.exports = SideSignInForm;
