var SubActions = require('../actions/sub_actions');
var PostActions = require('../actions/post_actions');

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
      success: function (sub) {
        SubActions.receiveSub(sub);
        PostActions.receiveSubPosts(sub.posts, sub.id);
      }
    });
  }
};

module.exports = SubApiUtil;
