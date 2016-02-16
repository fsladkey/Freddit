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
  },

  fetchSub: function(subName){
    $.ajax({
      method: "GET",
      url: "/api/subs/" + subName,
      data: {subName: subName},
      success: function (sub) {
        SubActions.receiveSub(sub);
        PostActions.receivePosts(sub.posts);
      }
    });
  }
};

module.exports = SubApiUtil;
