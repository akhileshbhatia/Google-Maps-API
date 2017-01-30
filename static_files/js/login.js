var login = {
    Init : function(){
      var me = login;
      sessionStorage.clear();
      me.BindEvents();
    },

    BindEvents: function(){
      var me = login;
      $("#loginBtn").off("click");
      $("#loginBtn").on("click",function(event){
        event.preventDefault();
        me.AuthenticateUser();
      });
    },

    AuthenticateUser: function(){
      var request = JSON.stringify({"username" : $("#username").val().trim(), "password" : $("#password").val().trim()});
      $.ajax({
        url: "/api/authenticate",
        type: "POST",
        contentType: "application/json",
        data: request,
        success: function(response){
          if(response.length == 0){ //meaning no such user found
            $("#lblInvalidUser").show();
          }
          else{
            $("#lblInvalidUser").hide();
            sessionStorage.user = response[0].username;
            window.location.replace("/map");
          }
        },
        error: function(err){
          console.log(err);
        }
      });
    },
}

$(document).ready(function(){
  login.Init();
})
