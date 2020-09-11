var Mainapp = {};

(function(){
  var uid = null;
  var firebase = app_firebase;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    uid = user.uid;

  }
  else {
    uid = null;
    window.location.replace("login.html")
  }

  var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
});
// function logOut()
// {
//     firebase.auth().signOut(); 
// }
// Mainapp.logOut = logOut;
})()