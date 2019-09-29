function initApp() {
    $.getJSON('php/get_logout.php', {},
            function(data) {
                $("#main_content").empty();
                $("#main_content").append(`
						<div id="message_body">
							<p>${data.line1}</p>
							<p>${data.line2}</p>
						</div> <!-- /message body -->
						<div id="return_link">
							<a href="${data.url}">${data.link}</a> 
						</div>  <!-- "return_link"--> 
					`); //append
                checkLogin();
                navbar();
            }, //callback function
            "json"
        )
        .fail(function(error) {
            console.log('Error Message ', error);
        })
        .done(function(data) {
            console.log('Second Success ', data);
        }); //getJSON
} //initApp

$(document).ready(function() {
    initApp();
});