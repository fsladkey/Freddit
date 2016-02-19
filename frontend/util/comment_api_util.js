var PostActions = require('../actions/post_actions');

module.exports = {

  createComment: function(comment, cb){
    $.ajax({
      method: "POST",
      url: "/api/comments/",
      data: {comment: comment},
      success: function (comment) {
        debugger
        PostActions.receiveComment(comment);
        cb && cb();
      }
    });
  }
};
