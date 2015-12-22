var SubActions = require('../actions/sub_api_actions');

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

window.ApiUtil = SubApiUtil;

module.exports = SubApiUtil;
