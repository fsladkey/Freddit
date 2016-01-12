var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _modal;
var ModalStore = new Store(AppDispatcher);
var ModalConstants = require('../constants/modal_constants');

ModalStore.modal = function () {
  return _modal;
};

ModalStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ModalConstants.RECEIVE_MODAL:
      _modal = payload.modal;
      ModalStore.__emitChange();
      break;
  }
};

window.ModalStore = ModalStore;

module.exports = ModalStore;
