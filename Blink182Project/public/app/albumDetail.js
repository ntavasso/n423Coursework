$(document).ready(function () {
    var path = location.href;
    var url = new URL(path);
    id = url.searchParams.get("id");
  $(".album").css("display", "none");
  $("#album_" + id).css("display", "block");
  });