// var ADMIN_MODEL = (function () {
//     var database = firebase.firestore()
//         .collection('users');
//     database.once('value', function (snapshot) {
//         if (snapshot.exists()) {
//             var content = '';

//             snapshot.forEach(function (data) {
//                 var TaskTitle = data.val().email;
//                 var JobId = data.val().role;
//                 content += '<tr>';
//                 content += '<td>' + TaskTitle + '</td>'; //column1
//                 content += '<td>' + JobId + '</td>';//column2
//                 content += '</tr>';
//             });

//             $('#tableWrapper').append(content);
//             console.log(content);
//         }
//     });

//     $("nav a").click(function () {

//         console.log("content");
//     })
// })();

