function navbar() {

    $("nav").empty();
    $('nav').append(`<div class="flexWrapper">
    <div class="logo">
        <h3><i class="fas fa-microphone-alt"></i></h3>
    </div>
    <div class="title">
        <h4>ACFF</h4>
    </div>
</div>
<div class="links">
    <a id="home" href="index.html">Home <a class="slash">|</a></a>
    <a id="JSON" href="index.html#JSON">JSON Speakers <a class="slash">|</a></a>
    <a id="MySQL" href="speakers.php">MySQL Speakers <a class="slash">|</a></a>
    <!-- <a id="about" href="index.html">About <a class="slash">|</a></a> -->
    <a id="contactJSON" href="index.html">Contact JSON <a class="slash">|</a></a>
    <a id="contactMySQL" href="index.html">Contact MySQL <a class="slash">|</a></a>
    <a id="contactView" href="index.html">Contact View <a class="slash">|</a></a>
    <a id="contactViewMySQL" href="messages.php">Contact View MySQL <a class="slash">|</a></a>
    <!-- <a id="login" href="index.html"> -->
        <!-- <div class="loginDiv"> -->
            <a id="login" href="index.html">Login(Firebase)<a class="slash">|</a></a>
            <a hidden href="#" id="signout">Sign Out</a>
       <!-- </div> -->
    <!-- </a> -->
    <a href="registration_json.html">Register(PHP) <a class="slash">|</a></a>
    <a id="login" href="login_json.html">Log-In(PHP)</a>
</div>`)
    // $('nav').append(`
    //     <div class="site-nav">
    //         <div class="logo-nav">
    //             <div class="logo">
    //                 <a href="index.html">
    //                     <span class="big-name">Conference</span>
    //                     <span class="small-name">Conference</span>
    //                 </a>
    //             </div>
    //             <div class="conf-nav"></div>
    //         </div>
    //     </div>
    //     <div class="speaker-nav"></div>
    //     <div class="login-nav">
    //         <a id="registration" href="registration_json.html">Register</a>
    //         <a id="login" href="login_json.html">Log-In</a>
    //     </div>`);

    //get the page where we are
    let path = window.location.pathname;
    let url_array = path.split("/");
    let this_page = url_array[url_array.length - 1];
    let nav_class = {
        home: '',
        speakerlist: '',
        contact: '',
        messages: '',
        registration: '',
        login: ''
    };
    switch (this_page) {
        case "index.html":
            nav_class.home = 'class="active-nav"';
            $(".speaker-nav").append(`
                <a href="../public/index.php">Classic PHP</a>
                <a href="#">JSON PHP</a>`);
            break;
        case "speakers_json.html":
            nav_class.speakerlist = 'class="active-nav"';
            $(".speaker-nav").append(`
                 <a href="../classic/speakers_classic.php">Speakers Classic</a>
                 <a href="#">Speakers JSON</a>`);
            break;
        case "contact_json.html":
            nav_class.contact = 'class="active-nav"';
            $(".speaker-nav").append(`
                <a href="../classic/contact.php">Contact Classic</a>
                <a href="#">Contact JSON</a>`);
            break;
        case "messages_json.html":
            nav_class.messages = 'class="active-nav"';
            $(".speaker-nav").append(`
                <a href="../classic/messages.php">Messages Classic</a>
                <a href="#">Messages JSON</a>`);
            break;
        case "registration_json.html":
            nav_class.registration = 'class="active-nav"';
            $(".speaker-nav").append(`
                <a href="../classic/registration.php">Registration Classic</a>
                <a href="#">Registration JSON</a>`);
            break;
        case "login_json.html":
            nav_class.login = 'class="active-nav"';
            $(".speaker-nav").append(`
                <a href="../classic/login.php">Login Classic</a>
                <a href="#">Login JSON</a>`);
            break;
        case "logout_json.html":
            nav_class.login = 'class="active-nav"';
            $(".speaker-nav").append(`
                <a href="../classic/logout.php">Logout Classic</a>
                <a href="#">Logout JSON</a>`);
            break;
    } //switch

    $(".conf-nav").empty();
    $(".conf-nav").append(`
         <a href="index.html" id="home" ${nav_class.home}>Home</a>
         <a href="speakers_json.html" id="speaker-list" ${nav_class.speakerlist}>Speaker List</a>
         <a href="contact_json.html" id="contact" ${nav_class.contact}>Contact</a>
         <a href="messages_json.html" id="messages" ${nav_class.messages}>Messages</a>`);
} //navbar

$(document).ready(function () {
    navbar();
});