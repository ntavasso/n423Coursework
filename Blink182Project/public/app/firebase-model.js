

// function hideDiv(){
//   $(".albums .wrapper").hide();
//   // $(".test").hide();
//   var path = location.href;
//   var url = new URL(path);
//   id = url.searchParams.get("id");
//   // $('.albumWrap').hide();
//   $('#album' + id).show();
//   console.log(id);

// }

// function getAlbumId(idx) {
//   window.location.href = "albumDetail.html?id=" + idx;
// }
// function getMemberId(idx) {
//   window.location.href = "memberDetail.html?id=" + idx;

// }


var FIREBASE_MODEL = (function () {



  // var db = firebase.firestore();
  // you need to input code here
  var _speakerArray = [];
  var _albumArray = [];
  var _contactArray = [];
  // var _userArray = firebase.firestore()
  //   .collection('users');

  var _getData = function () {
    $.getJSON("data/data.json", function (data) {
      //success one 
      console.log(data.speakers);
      _speakerArray = data.speakers;
      _albumArray = data.albums;
      _contactArray = data.contacts;
      // _userArray = data.users;

      $.each(_speakerArray, function (idx, listName) {
        $(".content").append(

          `<div class="flexWrapper" id = "member_${idx}" onclick="javascript:getMemberId();" >
            <div class="image"><img src="${listName.photo}"></div>
            <div class="bio"><p>  ${listName.name}</p><p class="bioClass">Bio: ${listName.description}</p>
            </div>
          </div>
                        
          <div id="myModal_${idx}" class="modal">
            <div class="modal-content">
              <div class="container">
                <span onclick="document.getElementById('myModal_${idx}').style.display='none'" class="close">&times;
                </span>
                <div class="modalFlexWrapper" id = "memberModalFlex_${idx}">
                  <div class="image"><img src="${listName.photo}"></div>
                  <div class="bio"><p><textarea id="memberName_${idx}">${listName.name}</textarea></p><p class="bioClass">Bio: <textarea id="memberBio_${idx}" style="width:100%;">${listName.description}</textarea></p>
                  </div>
                </div>
              </div>
              <button>Submit</button>

            </div>
          </div>
            <button onclick="document.getElementById('myModal_${idx}').style.display='block'" class="button black">Open Modal</button>`


        )
console.log(`"myModal_${idx}"`);
      });

      $.each(_albumArray, function (idx, listName) {
        $(".content2").append(

          `<div class="flexWrapper" id = "album_${idx}" onclick="javascript:getAlbumId(${idx});"><div class="image"><img src="${listName.photo}"></div>
                        <div class="bio"><p>  ${listName.name}</p><p class="bioClass">Bio: ${listName.description}</p></div></div>
                        <div id="albumModal_${idx}" class="modal">
            <div class="modal-content">
              <div class="container">
                <span onclick="document.getElementById('albumModal_${idx}').style.display='none'" class="close">&times;
                </span>
                <div class="modalFlexWrapper" id = "albumModalFlex_${idx}" ">
                  <div class="image"><img src="${listName.photo}"></div>
                  <div class="bio"><p><textarea id="albumName_${idx}">${listName.name}</textarea></p><p class="bioClass">Bio: <textarea id = "albumBio_${idx}" style="width:100%;">${listName.description}</textarea></p>
                  </div>
                </div>
              </div>
              <button>Submit</button>

            </div>
          </div>
            <button onclick="document.getElementById('albumModal_${idx}').style.display='block'" class="button black">Open Modal</button>`
          


        )
      });



    }).fail(function (err) {
      console.log(err);
    });

  };



  // var _getFavoritesArray = function () {
  //   return _favoriteArray;
  // }

  var _getAlbumsArray = function () {
    return _albumArray;
  }

  var _getSpeakersArray = function () {
    return _speakerArray;
  }
  var _editMemberBio = function () {
    
    // _userArray.doc("frank").update({
    //   "favorites.firebase": "Help")}
    //   });
  }


  var _setContact = function (contact) {
    _contactArray.push(contact);
    console.log(_contactArray);


  }
  // var _setUser = function (user) {
  //   _userArray.push(user);
  //   console.log(_userArray);


  // }

  function authStateObserver(user) {
    console.log(user);
    if (user) {
      // console.log("signed in " + user.displayName);
      $('#signin-google').attr('hidden', true);
      $('#signout-google').removeAttr('hidden');
      $('#signout').removeAttr('hidden');
      $('.user.pic').removeAttr('hidden');
      $('.user-name').removeAttr('hidden');
      $('.user-name').text(user.displayName);
      $('.user.pic').css('background-image', 'url(' + user.photoURL + ')');

    } else {
      // console.log("No User");
      $('#signin-google').removeAttr('hidden');
      $('#signout-google').attr('hidden', true);
      $('#signout').attr('hidden', true);
      $('.user.pic').attr('hidden', true);
      $('.user-name').attr('hidden', true);
      $('.user-name').text('');


    }
  }

  function initFirebaseAuth() {

    firebase.auth().onAuthStateChanged(authStateObserver);
  }

  var _createFavorite = function (fName, lName, email, comment) {
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
      .catch(function (error) {
        console.error(
          'Error writing new message to Firebase Database',
          error
        );
      });
    // });
  };

  var _signinWithGoogle = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  var _createAccount = function (email, pw, fName, lName, role) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' ' + errorMessage);
      }).then(function (res) {

        return firebase
          .firestore()
          .collection('users')
          .add({
            displayName: fName + ' ' + lName,
            email: email,
            role: role,
            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .catch(function (error) {
            console.error(
              'Error writing new message to firestore database',
              error
            )
          })
      });
    console.log(email);
  }

  var _signInWithEP = function (email, pw) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' ' + errorMessage);
      }).then(function (res) {
        console.log(res);
      });
    // console.log(email);
  }

  var _signOut = function () {
    firebase.auth().signOut();
  };


  var _sendResetPassword = function (emailAddress) {
    let auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress)
      .then(function () {
        console.log('email sent');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  initFirebaseAuth();

  return {
    //   return functions here
    getData: _getData,
    getSpeakersArray: _getSpeakersArray,
    // getContactsArray: _getContactsArray,
    // editMemberBio: _editMemberBio,
    getAlbumsArray: _getAlbumsArray,
    setContact: _setContact,
    // createContact: _createContact, 
    signinWithGoogle: _signinWithGoogle,
    signOut: _signOut,
    createAccount: _createAccount,
    signInWithEP: _signInWithEP,
    sendResetPassword: _sendResetPassword
    // setUser: _setUser

  };
})();
