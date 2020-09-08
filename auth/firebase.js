var app_firebase = {};
 (function(){
  var firebaseConfig = {
    apiKey: "AIzaSyDJ3-HmZ-PH4Sl1Bk_6ISlltIIjscs5wOY",
    authDomain: "major1-80e11.firebaseapp.com",
    databaseURL: "https://major1-80e11.firebaseio.com",
    projectId: "major1-80e11",
    storageBucket: "major1-80e11.appspot.com",
    messagingSenderId: "161067320742",
    appId: "1:161067320742:web:cd35877864b3627275fb67",
    measurementId: "G-GL2JD8Q67N"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  app_firebase = firebase;
  })()