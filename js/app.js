// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAbRL1Ar-9gfSgGSM42MOiZZiaAVhKpYqU",
    authDomain: "music-gallery-8177a.firebaseapp.com",
    databaseURL: "https://music-gallery-8177a-default-rtdb.firebaseio.com",
    projectId: "music-gallery-8177a",
    storageBucket: "music-gallery-8177a.appspot.com",
    messagingSenderId: "300473346960",
    appId: "1:300473346960:web:6c2e848f3de3c3d172a115",
    measurementId: "G-WJC5PBQTNR"
};
// Initialize Firebase
var firebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.database();
var storageRef = firebase.storage().ref();


var presonId = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    if(user !=null){
        console.log(user.uid); 
        presonId = user.uid; 
    }
  } else {

  }
});












var fileName ;
$(".upLBt").on("click", function(){
  fileName = $("#uploadFile").val();
  // console.log(fileName); 
});

$("#uploadFile").on("change", function(e){
  var file = e.target.files[0];
  console.log(file);
  var stroageRef = firebase.storage().ref("mp3/"+file.name);

  var task = stroageRef.put(file);
  task.on('state_change', 
    function progress(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, 
    function error(err){
      console.log(err)
    },
    function complete(complete){
      console.log("complete");
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);


        firebase.database().ref("users/"+presonId).push({
          filename: file.name,
          fileUrl:downloadURL,
          favourite:false
        });;

      });
    } 
  
  )


});

var personalId =  firebase.database().ref("users/"+presonId)

personalId.on('child_added', (data) => {
    console.log(data.val());
    // makeAudioTag(data.val(), data.key)
    // console.log(data.val());
 var muyObj = Object.entries(data.val());
 console.log(muyObj)
    for(var i =0; i<muyObj.length; i++){
      // console.log(muyObj[0])
     
      $(".audioLists").append(`<div>
        <h6><a>${muyObj[i][1].filename}</a></h6>
        <audio controls src="${muyObj[i][1].fileUrl}"></audio>
      </div>`)
    }


});


function makeAudioTag(val, key){
    console.log(val.filename);
} 