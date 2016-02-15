var React = require('react');
var ReactDOM = require('react-dom');
var ModalStore = require('../stores/modal_store');
var UserStore = require('../stores/user_store');

var App = React.createClass({

  getInitialState: function () {
    return {modal: null};
  },

  componentDidMount: function () {
    if (!UserStore.currentUser()) {
      UserApiUtil.fetchCurrentUser();
    }
    
    this.modalListener = ModalStore.addListener(this._modalChanged);
  },

  componentWillUnMount: function () {
    this.modalListener.remove();
  },

  render: function(){
    return (
      <div>
        {this.state.modal}
        {this.props.children}
      </div>
    );
  },

  _modalChanged: function () {
    this.setState({modal: ModalStore.modal()});
  }
});

module.exports = App;
