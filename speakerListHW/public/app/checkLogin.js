function checkLogin() {
    $.getJSON('php/get_login.php',
            function(data) {
                let user_id = Number(data.user_id);
                let role = Number(data.role);
                if (user_id > 0) {
                    $("#login").attr("href", "logout.html");
                    $("#login").text("Log Out");
                    $("#registration").css("display", "none");
                }
                if (role == 2) {
                    $("#messages").css("display", "block");
                } else {
                    $("#messages").css("display", "none");
                }
                //get the page where we are
                let path = window.location.pathname;
                let url_array = path.split("/");
                let page = url_array[url_array.length - 1];
                //remove unauthorized users
                switch (page) {
                    case "messages.php":
                    case "messages_json.html":
                        if (user_id < 2) { location.window.href = "index.html"; }
                        break;
                } //switch
            } //function(data)
        ) //getJSON
        .fail(function(error) {
            console.log('Error Message ', error);
        })
        .done(function(data) {
            console.log('Second Success ', data);
        });
} //checkLogIn

$(document).ready(function() {
    checkLogin();
});