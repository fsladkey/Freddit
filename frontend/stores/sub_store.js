var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SubConstants = require('../constants/sub_constants');

var SubStore = new Store(AppDispatcher);
var _subs = [];

var addSub = function (newSub) {
  var replaced = false;
  _subs.forEach(function (sub, idx) {
    if (sub.id == newSub.id) {
      _subs[idx] = newSub;
      replaced = true;
    }
  });

  if (!replaced) {
    debugger
    _subs.push(newSub);
  }
};

SubStore.all = function () {
  return _subs.slice();
};

SubStore.findByName = function (subName) {
  return _subs.find(function(sub) {
    return sub.title == subName;
  });
};

SubStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SubConstants.RECEIVE_SUBS:
      _subs = payload.subs;
      SubStore.__emitChange();
      break;
    case SubConstants.RECEIVE_SUB:
      addSub(payload.sub);
      SubStore.__emitChange();
      break;
  }
};

window.SubStore = SubStore;

module.exports = SubStore;
