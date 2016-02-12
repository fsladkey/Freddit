var UserActions = require('../actions/user_actions');

UserApiUtil = {
  fetchCurrentUser: function(){
    $.ajax({
      method: "GET",
      url: "/api/session/currentuser",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      }
    });
  },

  signOutUser: function () {
    $.ajax({
      method: "DELETE",
      url: "/api/session",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(null);
      },
    });
  },

  signUpUser: function (data) {
    $.ajax({
      method: "POST",
      data: {user: data},
      url: "/api/users",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      },
    });
  },

  signInUser: function(data){
    debugger
    $.ajax({
      method: "POST",
      url: "/api/session",
      data: {user: data},
      success: function (currentUser) {
        debugger
        UserActions.receiveCurrentUser(currentUser);
      },
      error: function () {
        debugger
      }
    });
  }

};

module.exports = UserApiUtil;
