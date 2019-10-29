function initApp() {
    $("form").submit(function(e) {
            //prevent Default functionality
            e.preventDefault();
            $.post("php/forgot_json.php",
                    $("form").serialize(),
                    function(data) {
                        draw_user_message(data);
                        checkLogin();
                    }, //callback function
                    "json"
                )
                .fail(function(error) {
                    console.log('Error Message ', error);
                })
                .done(function(data) {
                    console.log('Second Success ', data);
                }); //post
        } //submit function
    ); //submit
} //initApp

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
    initApp();
});