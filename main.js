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
});
function logOut()
{
    firebase.auth().signOut(); 
}
Mainapp.logOut = logOut;
})()