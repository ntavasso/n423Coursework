

var FIREBASE_MODEL = (function () {

  //  // Initialize Cloud Firestore through Firebase
// var config = {
//   apiKey: 'AIzaSyDNGPfSuUJ7CBREfV7POCBpnosgfRhQrXg',
//   authDomain: 'speakerlisthw.firebaseapp.com',
//   projectId: 'speakerlisthw'
// };

// firebase.initializeApp(config);



// var db = firebase.firestore();
  // you need to input code here
  var _speakerArray = [];
  var _contactArray = [];

  var _getData = function () {
    $.getJSON("data/data.json", function (data) {
        //success one 
        // console.log(result.speakers);
        _speakerArray = data.speakers;
        _contactArray = data.contacts;

        $.each(_speakerArray, function (idx, listName) {
            $(".content").append(
                
                        `<div class="flexWrapper"><div class="image"><img src="${listName.photo}"></div>
                        <div class="bio"><p>${listName.suffix}  ${listName.name}</p><p>Age: ${listName.age}</p><p class="bioClass">Bio: ${listName.description}</p></div></div>`
                        // `<p>${listName.suffix}</p>`,
                        // `<p>${listName.age}</p>`,
                        // `<p>${listName.description}</p></div>`
                

            )
        });

    }).fail(function (err) {
        console.log(err);
    });
  };

  var _getContactsArray = function () {
    return _contactArray;
  }

  var _getSpeakersArray = function(){
    return _speakerArray;
}


  var _setContact = function(contact){
    _contactArray.push(contact);
    console.log(_contactArray);
    

}

  // function authStateObserver(user) {
  //   console.log(user);
  //   if (user) {
  //     // console.log("signed in " + user.displayName);
  //     $('#signin-google').attr('hidden', true);
  //     $('#signout-google').removeAttr('hidden');
  //     $('.user.pic').removeAttr('hidden');
  //     $('.user-name').removeAttr('hidden');
  //     $('.user-name').text(user.displayName);
  //     $('.user.pic').css('background-image', 'url(' + user.photoURL + ')');

  //   } else {
  //     // console.log("No User");
  //     $('#signin-google').removeAttr('hidden');
  //     $('#signout-google').attr('hidden', true);
  //     $('.user.pic').attr('hidden', true);
  //     $('.user-name').attr('hidden', true);
  //     $('.user-name').text('');


  //   }
  // }

  // function initFirebaseAuth() {

  //   firebase.auth().onAuthStateChanged(authStateObserver);
  // }

  var _createContact = function(fName, lName, email, comment) {
    //  firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, pw)
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode + ' ' + errorMessage);
    //   })
      // .then(function(res) {
      //   return 
        firebase
          .firestore()
          .collection('contacts')
          .add({
            displayName: fName + ' ' + lName,
            email: email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            comment: comment
          })
          .catch(function(error) {
            console.error(
              'Error writing new message to Firebase Database',
              error
            );
          });
      // });
  };

  // var _signinWithGoogle = function () {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // };

  // var _createAccount = function (email, pw, fName, lName) {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, pw)
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log(errorCode + ' ' + errorMessage);
  //     }).then(function (res) {

  //       return firebase
  //         .firestore()
  //         .collection('users')
  //         .add({
  //           displayName: fName + ' ' + lName,
  //           email: email,
  //           Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         })
  //         .catch(function (error) {
  //           console.error(
  //             'Error writing new message to firestore database',
  //             error
  //           )
  //         })
  //     });
  //   // console.log(email);
  // }

  // var _signInWithEP = function (email, pw) {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, pw)
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log(errorCode + ' ' + errorMessage);
  //     }).then(function (res) {
  //       console.log(res);
  //     });
  //   // console.log(email);
  // }

  // var _signOut = function () {
  //   firebase.auth().signOut();
  // };

  // initFirebaseAuth();

  return {
    //   return functions here
    getData: _getData,
    getSpeakersArray: _getSpeakersArray,
    getContactsArray: _getContactsArray,
    setContact: _setContact,
    createContact: _createContact

  };
})();
