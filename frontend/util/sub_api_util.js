var SubActions = require('../actions/sub_actions');

SubApiUtil = {
  fetchSubs: function(){
    $.ajax({
      method: "GET",
      url: "/api/subs",
      success: function (subs) {
        SubActions.receiveAll(subs);
      }
    });
  }
};

module.exports = SubApiUtil;
