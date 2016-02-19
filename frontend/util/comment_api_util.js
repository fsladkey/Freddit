var PostActions = require('../actions/post_actions');

module.exports = {

  createComment: function(comment, cb){
    $.ajax({
      method: "POST",
      url: "/api/comments/",
      data: {comment: comment},
      success: function (comment) {
        PostActions.receiveComment(comment);
        cb && cb();
      }
    });
  },

  destroyComment: function(id){
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id,
      success: function (comment) {
        PostActions.deleteComment(comment);
      }
    });
  }


};
