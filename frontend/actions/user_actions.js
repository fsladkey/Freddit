var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var UserActions = {
  receiveCurrentUser: function(currentUser){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  }
};

module.exports = UserActions;
