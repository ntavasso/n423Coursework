let currentView = "home";



function listUsers() {
  let listOfUsers = FIREBASE_MODEL.getUsersArray();
  $.each(listOfUsers, function (idx, user) {
    $("#tableItems").append(

      `
      <div class="item"><p>${user.fName}  ${user.lName}</p></div>
      <div class="item">
      <p>Role: ${user.role}</p>
      </div>
      <div class="item">
      <p>Email: ${user.email}</p>      
      </div>`


    )

  })
  console.log(firebase.firestore()
    .collection('users'));
}


function init() {

  $("nav a").click(function (e) {
    let pageName = e.currentTarget.id;

    if (pageName == 'home') {
      let currentView = "home";
      // $(".JSON").css("display", "none");
      // $(".albums").css("display", "none");

    }


    if (pageName != currentView) {
      $("." + currentView).css("display", "none");
      $("." + pageName).css("display", "block");
      currentView = pageName;
    }

    // if (pageName == "album_0") {
    //   $('.albums .album_0').css('display', 'block');
    //   $('.albums .wrapper').css('display', 'none');
    //   console.log("hello")
    // }


    //   if the nav is clicked on for the first time we want to shut the success message off
    if (pageName == 'contactJSON') {
      $('.contact .form').css('display', 'block');
      $('.contact .message_body').css('display', 'none');
      $('#n413_contact_form').trigger('reset');
    }



    if (pageName == "login") {
      $('.message_body').css('display', 'none');
      $('.retrievePassword').css('display', 'none');
      $('.passwordConfirm').css('display', 'none');
      console.log("hello");
    }

    if (pageName == "signin-google") {
      //   this is for google signin
      console.log("google");
      FIREBASE_MODEL.signinWithGoogle();
    }


  });

  $("#table").one('click', function (e) {

    listUsers();

  })

  $(".googleDiv a").click(function (e) {
    let googleBtnId = e.currentTarget.id;

    if (googleBtnId == 'signin-google') {
      //   this is for google signin
      FIREBASE_MODEL.signinWithGoogle();
    }

    if (googleBtnId == 'signout-google') {
      //   this is for google signin
      FIREBASE_MODEL.signOut();
    }
  });

  $(".loginBlock a").click(function (e) {
    let btnID = e.currentTarget.id;
    if (btnID == 'fpw') {
      $('.forms').css('display', 'none');
      $('.retrievePassword').css('display', 'block');
    }
  })

  $(".passwordConfirm a").click(function (e) {
    let btnID = e.currentTarget.id;
    if (btnID == 'passwordRefresh') {
      window.location.reload()

    }
  })

  $('#suSubmit').click(function (e) {
    $('.forms').css('display', 'none');
    $('.message_body').css('display', 'block'); e.preventDefault();
    $('nav #favorites').css('display', 'block');
    let fName = $('#sufName').val();
    let lName = $('#sulName').val();
    let email = $('#suEmail').val();
    let pw = $('#suPassword').val();
    let role = $("input[name='role']:checked").val();


    FIREBASE_MODEL.createAccount(email, pw, fName, lName, role);
  });

  $('#siSubmit').click(function (e) {
    e.preventDefault();
    $('nav #login').css('display', 'none');
    $('nav #signout').css('display', 'block');
    $('nav #favorites').css('display', 'block');
    $('.forms').css('display', 'none');
    $('.message_body').css('display', 'block');
    let email = $('#siEmail').val();
    let pw = $('#siPassword').val();

    FIREBASE_MODEL.signInWithEP(email, pw);
  });

  $('#rpSubmit').click(function (e) {
    e.preventDefault();

    $('.forms').css('display', 'none');
    $('.retrievePassword').css('display', 'none');
    $('.passwordConfirm').css('display', 'block');
    let email = $('#rpEmail').val();
    FIREBASE_MODEL.sendResetPassword(email);
  });

  $('#signout').click(function (e) {
    window.location.reload()
    // e.preventDefault();
    // $('nav #login').css('display', 'block');
    // $('.forms').css('display', 'flex');
    // $('.message_body').css('display', 'none'); 

    // console.log(pageName);


    FIREBASE_MODEL.signOut();
  });

  $('form').submit(function (e) {
    e.preventDefault();

    let fName = $('#firstName').val();
    let lName = $('#lastName').val();
    let email = $('#email').val();
    let comment = $('#comment').val();
    let date = new Date();

    let contact = {
      firstName: fName,
      lastName: lName,
      email: email,
      comment: comment,
      date: date
    };


    FIREBASE_MODEL.setContact(contact);
    FIREBASE_MODEL.createContact(fName, lName, email, comment);
    // console.log(contact);

    $('.contact .form').css('display', 'none');
    $('.contact .message_body').css('display', 'block');
  });

  $("footer a").click(function (e) {
    let pageName = e.currentTarget.class;

    if (pageName != currentView) {
      $("." + currentView).css("display", "none");
      $("." + pageName).css("display", "block");
      currentView = pageName;
    }
  });

}

function initFire() {
  FIREBASE_MODEL.getData();

}

function chartStart() {
  var chart = bb.generate({
    size: {
      height: 300,
      width: 700
    },
    data: {
      columns: [
        ["Buddha", 0],
        ["Cheshire Cat", 310, 000],
        ["Dude Ranch", 1, 470, 000],
        ["Enema of the State", 15, 000, 000],
        ["Take off your Pants and Jacket", 14, 000, 000],
        ["Blink-182", 7, 000, 000],
        ["Neighborhoods", 488, 000],
        ["California", 635, 000],
        ["Nine", 202, 000]

      ],
      colors: {
        "Buddha": "red",
        "Cheshire Cat": "green",
        "Dude Ranch": "green",
        "Enema of the State": "green",
        "Take off your Pants and Jacket": "green",
        "Blink-182": "green",
        "Neighborhoods": "green",
        "California": "green",
        "Nine": "green"
      },
      type: "bar"
    },
    bar: {
      width: {
        ratio: 0.8
      },
      padding: 10

    },
    legend: {
      contents: {
        bindto: "#legend",
        template: "<span style='color:#fff;padding:10px;background-color:{=COLOR}'>{=TITLE}</span>"
      }
    },
    bindto: "#chart"
  });
  // setTimeout(function() {
  //   chart.resize({height: 300, width: 800})
  // }, 1000);

  // setTimeout(function() {
  //   chart.load({
  //     columns: [
  //       ["3PT", 60],
  //       ["3PTA", 200],
  //       // ["teal", 100],
  //     ]
  //   });
  // }, 2000);

  // setTimeout(function() {
  //   chart.unload({ ids: "FG" });
  //   chart.unload({ ids: "FT" });
  // }, 3000);
}





$(document).ready(function () {
  $("." + currentView).css("display", "block");
  init();
  initFire();
  chartStart();

})