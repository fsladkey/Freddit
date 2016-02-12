var AppDispatcher = require('../dispatcher/dispatcher');
var SubConstants = require('../constants/sub_constants');

var SubActions = {
  receiveAll: function(subs){
    AppDispatcher.dispatch({
      actionType: SubConstants.RECEIVE_SUBS,
      subs: subs
    });
  },
  receiveSub: function (sub) {
    AppDispatcher.dispatch({
      actionType: SubConstants.RECEIVE_SUB,
      sub: sub
    });
  }
};

module.exports = SubActions;
