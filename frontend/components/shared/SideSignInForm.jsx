var React = require('react'),
    ReactDOM = require('react-dom'),
    UserApiUtil = require('../../util/user_api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({

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
          <div className="flex-container">
            <label>Email</label>
              <input
                onChange={this.usernameChange}
                type="text"
                placeholder="email"
                required="true"
                value={this.state.username}/>

            <label>Password</label>
              <input
                onChange={this.passwordChange}
                type="password"
                placeholder="password"
                required="true"
                value={this.state.password}/>
          </div>
          <input className="side-login-button" type="submit" value="Sign In"/>
        </form>
      </div>
    );
  }

});
