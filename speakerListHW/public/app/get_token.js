function get_token() {
    let url = new URL(window.location.href);
    var token = url.searchParams.get("token");
    $.post("php/get_token.php", { token: token },
        function(data) {
            switch (data.status) {
                case "success":
                    $("#main_content").empty();
                    $("#main_content").append(`
                        <p>Please enter a new password to use with your account.  It must have at least 8 characters.<br/><br/></p>
                        <form id="password_reset_form" class="form-horizontal" method="post" action="">

                        <div class="form-group">
                            <label for="email" class="label-container">E-mail:</label>
                            <input type="email" class="form-control" name="email" id="email" placeholder="E-mail Address" value="${data.email}" style="cursor:not-allowed;" disabled/>
                        </div><!--  /.form-group  -->

                        <div class="form-group">
                            <div id="password_error" style="display:none;color:#990000;"></div>
                            <label for="password" class="label-container">New Password:</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Password" required/>
                        </div><!--  /.form-group  -->

                        <input type="hidden" name="token" id="token" value="${data.token}"/>

                        <div class="form-group">
                            <input type="submit" />
                        </div><!-- /.form group  -->
                        </form>`); //append
                    //attach the submit handler for the reset password form    
                    $("#password_reset_form").submit(function(e) {
                        //prevent Default functionality
                        e.preventDefault();
                        $.post("php/update_password.php",
                            $("#password_reset_form").serialize(),
                            function(update) { //use a diiferent argument name for data to avoid ambiguity
                                switch (update.status) {
                                    case "password_error":
                                        $("#password_error").text(update.line1);
                                        $("#password_error").css("display", "block");
                                        break;
                                    default:
                                        draw_user_message(update);
                                } //switch
                            }, //callback function
                            "json"); //post
                    }); //submit
                    break;
                    //case "expired_link":
                default: //failed
                    draw_user_message(data);
                    break;
            } //switch
        },
        "json");
} //get_token

function draw_user_message(message) {
    $("#main_content").empty();
    $("#main_content").append(`
	    <div id="message_body">
	        <p>${message.line1}</p>
		    <p>${message.line2}</p>
	    </div> <!-- /message body -->
		<div id="return_link">
		    <a href="${message.url}">${message.link}</a> 
		</div>  <!-- "return_link"--> `); //append
} //draw_user_message

$(document).ready(function() {
    get_token();
});