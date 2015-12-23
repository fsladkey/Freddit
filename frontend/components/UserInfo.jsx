var React = require('react');
var ReactDOM = require('react-dom');

var UserInfo = React.createClass({

  render: function () {
    return (
      <div className="user-info">
        <p>Want to join? Log in or sign up now.</p>
      </div>
    );
  }

});


module.exports = UserInfo;
