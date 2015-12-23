var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _posts = [];
var PostStore = new Store(AppDispatcher);
var PostConstants = require('../constants/post_constants');

PostStore.all = function () {
  return _posts.slice();
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PostConstants.RECEIVE_POSTS:
      _posts = payload.posts;
      PostStore.__emitChange();
      break;
  }
};

window.PostStore = PostStore;

module.exports = PostStore;
