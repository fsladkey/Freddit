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
  },

  fetchPost: function(postId){
    $.ajax({
      method: "GET",
      url: "/api/posts/" + postId,
      success: function (post) {
        PostActions.receivePost(post);
      }
    });
  }
};

module.exports = PostApiUtil;
