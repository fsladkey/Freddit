var UserActions = require('../actions/user_actions');

UserApiUtil = {
  fetchCurrentUser: function(){
    $.ajax({
      method: "GET",
      url: "/api/users/currentuser",
      dataType: "json",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      }
    });
  },

  signOutUser: function () {
    $.ajax({
      method: "DELETE",
      url: "/users/sign_out",
      dataType: "json",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(null);
      }
    });
  },

  signUpUser: function (data) {
    $.ajax({
      method: "POST",
      data: {user: data},
      url: "/users",
      dataType: "json",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      },
      error: function (error) {
      }
    });
  },

  signInUser: function(data){
    $.ajax({
      method: "POST",
      url: "/users/sign_in",
      data: {user: data},
      dataType: "json",
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      }
    });
  }

};

module.exports = UserApiUtil;
