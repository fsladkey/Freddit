var React = require('react');
var ReactDOM = require('react-dom');
var UserApiUtil = require('../util/user_api_util');
var ModalActions = require('../actions/modal_actions');

var SignInForm = React.createClass({

  getInitialState: function () {
    return {username: "", password: ""};
  },

  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.usernameInput).focus();
  },

  handleSubmit: function () {
    var data = {
      username: this.state.username,
      password: this.state.password,
    };
    UserApiUtil.signInUser(data);
    ModalActions.receiveModal(null);
  },

  usernameChange: function (e) {
    this.setState({username: e.currentTarget.value});
  },

  passwordChange: function (e) {
    this.setState({password: e.currentTarget.value});
  },

  render: function () {
    return (
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
            <input
              onChange={this.usernameChange}
              ref="usernameInput"
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

module.exports = SignInForm;
