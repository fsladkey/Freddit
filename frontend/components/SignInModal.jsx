var React = require('react');
var ReactDOM = require('react-dom');
var SignInForm = require('./SignInForm');
var SignUpForm = require('./SignUpForm');

var SignInModal = React.createClass({

  render: function () {
    return (
      <div className="modal">
        <div className="modal-content">
          <SignUpForm/>
          <SignInForm/>
        </div>
      </div>
    );
  }

});

module.exports = SignInModal;
