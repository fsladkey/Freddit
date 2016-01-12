var AppDispatcher = require('../dispatcher/dispatcher');
var ModalConstants = require('../constants/modal_constants');

var ModalActions = {
  receiveModal: function(modal){
    AppDispatcher.dispatch({
      actionType: ModalConstants.RECEIVE_MODAL,
      modal: modal
    });
  }
};

module.exports = ModalActions;
