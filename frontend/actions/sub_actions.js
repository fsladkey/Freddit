var AppDispatcher = require('../dispatcher/dispatcher');
var SubConstants = require('../constants/sub_constants');

var SubActions = {
  receiveAll: function(subs){
    AppDispatcher.dispatch({
      actionType: SubConstants.RECEIVE_SUBS,
      subs: subs
    });
  }
};

module.exports = SubActions;
