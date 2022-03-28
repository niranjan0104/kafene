$(document).ready(function () {
  var loginStatus = window.localStorage.getItem("login-status");
  loginStatus =
    loginStatus === null || loginStatus === "" ? false : loginStatus;

  if (JSON.parse(loginStatus) == true) {
    location.assign("/order.html");
  }
});

