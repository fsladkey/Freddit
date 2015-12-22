var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _subs = [];
var SubStore = new Store(AppDispatcher);
var SubConstants = require('../constants/sub_constants');

SubStore.all = function () {
  return _subs.slice();
};

SubStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SubConstants.RECEIVE_SUBS:
      _subs = payload.subs;
      SubStore.__emitChange();
      break;
  }
};

window.SubStore = SubStore;

module.exports = SubStore;
