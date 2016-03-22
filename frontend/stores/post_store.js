var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _posts = {};
var PostStore = new Store(AppDispatcher);
var PostConstants = require('../constants/post_constants');

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

var addComment = function (comment) {
  var post = PostStore.find(comment.post_id);
  if (post) {
    var index;

    post.comments.find(function (oldComment, idx) {
      if (comment.id == oldComment.id) {
        index = idx;
        return true;
      }
    });
    
    if (index) {
      post.comments[index] = comment;
    } else {
      post.comments.unshift(comment);
    }
  }
};

var removeComment = function (comment) {
  var post = PostStore.find(comment.post_id);

  if (post) {
    var index;

    post.comments.find(function (oldComment, idx) {
      if (comment.id == oldComment.id) {
        index = idx;
        return true;
      }
    });

    post.comments.splice(index, 1);
  }
};

PostStore.all = function (sortBy) {
  var posts = [];

  var keys = Object.keys(_posts);
  for (var idx = 0; idx < keys.length; idx++) {
    posts = posts.concat(_posts[keys[idx]]);
  }

  return posts.slice();
};

PostStore.find = function (id) {
  return PostStore.all().find(function (post) {
    return post.id == id;
  });
};

PostStore.findBySub = function (id) {
  var posts = _posts[id] || [];

  return posts.slice();
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PostConstants.RECEIVE_POSTS:
      addPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_SUB_POSTS:
      _posts[payload.subId] = payload.posts;
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_POST:
      replacePost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_COMMENT:
      addComment(payload.comment);
      PostStore.__emitChange();
      break;
    case PostConstants.DELETE_COMMENT:
      removeComment(payload.comment);
      PostStore.__emitChange();
      break;
  }
};

window.PostStore = PostStore;

module.exports = PostStore;
