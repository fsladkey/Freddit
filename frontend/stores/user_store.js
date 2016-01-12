var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _users = [];
var _currentUser = null;
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/user_constants');

UserStore.all = function () {
  return _users.slice();
};

UserStore.currentUser = function () {
  return _currentUser;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
      _currentUser = payload.currentUser;
      UserStore.__emitChange();
      break;
  }
};

window.UserStore = UserStore;

module.exports = UserStore;
