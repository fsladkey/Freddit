var PostActions = require('../actions/post_actions');

PostApiUtil = {
  fetchSubPosts: function(subId){
    $.ajax({
      method: "GET",
      url: "/api/subs/" + subId + "/posts",
      success: function (posts) {
        PostActions.receiveAll(posts);
      }
    });
  },

  fetchAllPosts: function(){
    $.ajax({
      method: "GET",
      url: "/api/posts",
      success: function (posts) {
        PostActions.receiveAll(posts);
      }
    });
  }
};

window.ApiUtil = PostApiUtil;

module.exports = PostApiUtil;
