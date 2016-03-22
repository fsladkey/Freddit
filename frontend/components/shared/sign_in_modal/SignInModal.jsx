var React = require('react');
var ReactDOM = require('react-dom');
var SignInForm = require('./SignInForm');
var SignUpForm = require('./SignUpForm');
var ModalActions = require('../../../actions/modal_actions');

var SignInModal = React.createClass({

  removeModal: function () {
    ModalActions.receiveModal(null);
  },

  stopProp: function (e) {
    e.stopPropagation();
  },

  render: function () {
    return (
      <div onClick={this.removeModal} className="modal">
        <div onClick={this.stopProp} className="modal-content">
          <button onClick={this.removeModal} className="exit-modal">
            x
          </button>
          <SignUpForm/>
          <SignInForm/>
        </div>
      </div>
    );
  }

});

module.exports = SignInModal;
