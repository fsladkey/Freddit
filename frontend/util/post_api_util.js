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

  fetchPost: function(postId, cb){
    $.ajax({
      method: "GET",
      url: "/api/posts/" + postId,
      success: function (post) {
        PostActions.receivePost(post);
        cb && cb();
      }
    });
  },

  createPost: function(post, cb){
    debugger
    $.ajax({
      method: "POST",
      url: "/api/posts/",
      data: { post: post },
      success: function (post) {
        PostActions.receivePost(post);
        cb && cb();
      }
    });
  },

  upvote: function(postId){
    $.ajax({
      method: "POST",
      url: "/api/posts/" + postId + "/upvote",
      success: function (post) {
        PostActions.receivePost(post);
      }
    });
  },

  downvote: function(postId){
    $.ajax({
      method: "POST",
      url: "/api/posts/" + postId + "/downvote",
      success: function (post) {
        PostActions.receivePost(post);
      }
    });
  }
};

module.exports = PostApiUtil;
