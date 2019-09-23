let currentView = "home";


function listContacts(){
  let listOfContacts = FIREBASE_MODEL.getContactsArray();
  $.each(listOfContacts, function(idx, contact){
    $("#contactWrapper").append(
                
      `<div class="message">
      <div class="name"><p>${contact.date}</p><p>${contact.firstName}" "  ${contact.lastName}</p><p>Email: ${contact.email}</p><p class="comment">Comment: ${contact.comment}</p></div></div>`
      // `<p>${listName.suffix}</p>`,
      // `<p>${listName.age}</p>`,
      // `<p>${listName.description}</p></div>`


)
// firebase
//           .firestore()
//           .collection('contacts')
//           .add({
//             displayName: fName + ' ' + lName,
//             email: email,
//             comment: comment,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//           })  
        })
}


function init() {


    $("nav a").click(function (e) {
        let pageName = e.currentTarget.id;

        if (pageName == 'MySQL') {
          let currentView = "MySQL";        }
        

        if (pageName != currentView) {
            $("." + currentView).css("display", "none");
            $("." + pageName).css("display", "block");
            currentView = pageName;
        }


        //   if the nav is clicked on for the first time we want to shut the success message off
      if (pageName == 'contactJSON') {
        $('.contact .form').css('display', 'block');
        $('.contact .message_body').css('display', 'none');
        $('#n413_contact_form').trigger('reset');
      }

      if (pageName == 'contactView') {
        listContacts();
      }


      if (pageName == "signin") {
        // This is for when you sign in with email password
        //   You would probably display the form here We are not doing anything with it now
        console.log("email");
      }
  
      if (pageName == "signin-google") {
        //   this is for google signin
        console.log("google");
        FIREBASE_MODEL.signinWithGoogle();
      }
  
      if (pageName == "signout-google") {
        //   this is for google signin
        FIREBASE_MODEL.signOut();
      }
    });

    $('form').submit(function(e) {
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


    // $(document).on('click', '#display', function (e) {
    //     let pageName = e.currentTarget.id;
    //     // console.log("display");
    //     if (pageName != currentView) {
    //         $("." + currentView).css("display", "none");
    //         $("." + pageName).css("display", "block");
    //         currentView = pageName;
    //     }
    // });

}

function initFire() {
  FIREBASE_MODEL.getData();

}




$(document).ready(function () {
    $("." + currentView).css("display", "block");
    init();
    initFire();

})