function initApp() {
  $("form").submit(function(e) {
		   //prevent Default functionality
			e.preventDefault();
			$.post("php/login_json.php",
				$("form").serialize(),
				function(data){
					$("#main_content").empty();
					$("#main_content").append(`
						<div id="message_body">
							<p>${data.line1} ${data.line2}</p>
						</div> <!-- /message body -->
						<div id="return_link">
							<a href="${data.url}">${data.link}</a> 
						</div>  <!-- "return_link"--> 
					`);//append
					checkLogin();
				}, //callback function
				"json"
			)
				.fail(function(error) {
				  console.log('Error Message ', error);
				})
				.done(function(data) {
				  console.log('Second Success ', data);
			});//post
		}//submit function
	);//submit
} //initApp

$(document).ready(function() {
  initApp();
});
