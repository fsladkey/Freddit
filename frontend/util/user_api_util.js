var UserActions = require('../actions/user_actions');

UserApiUtil = {
  fetchCurrentUser: function(){
    $.ajax({
      method: "GET",
      url: "/api/users/currentuser",
      success: function (currentUser) {
        debugger
        UserActions.receiveCurrentUser(currentUser);
      }
    });
  },

  signOutUser: function () {
    $.ajax({
      method: "GET",
      url: "/api/subs/" + subId + "/posts",
      success: function (posts) {
        PostActions.receiveAll(posts);
      }
    });
  },

  signUpUser: function (data) {
    $.ajax({
      method: "POST",
      data: data,
      url: "/users",
      success: function (posts) {
        PostActions.receiveAll(posts);
      },
      error: function (error) {
        debugger
      }
    });
  },

  signInUser: function(data){
    $.ajax({
      method: "POST",
      url: "/users/sign_in",
      data: {user: data},
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      },
      error: function (error) {
        debugger
      }
    });
  }

};

module.exports = UserApiUtil;
