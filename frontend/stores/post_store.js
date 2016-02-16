var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _posts = {};
var PostStore = new Store(AppDispatcher);
var PostConstants = require('../constants/post_constants');

var recentCompare = function compare(a, b) {
  if (a.created_at > b.created_at) {
    return -1;
  }
  else {
    return 1;
  }
};

var addPosts = function (posts) {
  _posts = {};
  posts.forEach(function (post) {
    _posts[post.sub_id] = _posts[post.sub_id] || [];
    _posts[post.sub_id].push(post);
  });
};

var replacePost = function (newPost) {
  var posts = _posts[newPost.sub_id] || [];
  var replaced = false;

  newPosts = posts.map(function (post) {
    if (post.id == newPost.id) {
      replaced = true;
      return newPost;
    } else {
      return post;
    }
  });

  if (!replaced) {
    newPosts.push(newPost);
  }
  _posts[newPost.sub_id] = newPosts;
};

PostStore.all = function (sortBy) {
  var compare = sortBy == "recent" ? recentCompare : null
  var posts = [];

  var keys = Object.keys(_posts);
  for (var idx = 0; idx < keys.length; idx++) {
    posts = posts.concat(_posts[keys[idx]])
  }

  return posts.sort(compare);
};

PostStore.find = function (id) {
  return PostStore.all().find(function (post) {
    return post.id == id;
  });
};

PostStore.findBySub = function (id, sortBy) {
  // var compare = sortBy == "recent" ? recentCompare : null
  var compare = recentCompare;
  var posts = _posts[id] || [];
  // debugger
  return posts.sort(compare).slice();
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PostConstants.RECEIVE_POSTS:
      addPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_SUB_POSTS:
      _posts[payload.subId] = payload.posts
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
