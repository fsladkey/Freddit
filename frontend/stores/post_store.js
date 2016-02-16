var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _posts = [];
var PostStore = new Store(AppDispatcher);
var PostConstants = require('../constants/post_constants');

var replacePost = function (newPost) {
  var replaced = false;

  _posts = _posts.map(function (post) {
    if (post.id == newPost.id) {
      replaced = true;
      return newPost;
    } else {
      return post;
    }
  });

  if (!replaced) {
    _posts.push(newPost);
  }
};

PostStore.all = function () {
  return _posts.slice();
};

PostStore.find = function (id) {
  return PostStore.all().find(function (post) {
    return post.id == id;
  });
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PostConstants.RECEIVE_POSTS:
      _posts = payload.posts;
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_POST:
      replacePost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

window.PostStore = PostStore;

module.exports = PostStore;
