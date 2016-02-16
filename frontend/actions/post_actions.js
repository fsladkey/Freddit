var AppDispatcher = require('../dispatcher/dispatcher');
var PostConstants = require('../constants/post_constants');

var PostActions = {
  receiveAll: function(posts){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POSTS,
      posts: posts
    });
  },
  receiveSubPosts: function(posts, subId){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_SUB_POSTS,
      posts: posts,
      subId: subId
    });
  },

  receivePost: function(post){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POST,
      post: post
    });
  },
};

module.exports = PostActions;
