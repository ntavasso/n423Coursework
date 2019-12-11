$(document).ready(function () {
    var path = location.href;
    var url = new URL(path);
    id = url.searchParams.get("id");
  $(".member").css("display", "none");
  $("#member_" + id).css("display", "block");
  });