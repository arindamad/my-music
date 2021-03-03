// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//   apiKey: "AIzaSyAbRL1Ar-9gfSgGSM42MOiZZiaAVhKpYqU",
//   authDomain: "music-gallery-8177a.firebaseapp.com",
//   databaseURL: "https://music-gallery-8177a-default-rtdb.firebaseio.com",
//   projectId: "music-gallery-8177a",
//   storageBucket: "music-gallery-8177a.appspot.com",
//   messagingSenderId: "300473346960",
//   appId: "1:300473346960:web:6c2e848f3de3c3d172a115",
//   measurementId: "G-WJC5PBQTNR"
// };
// // Initialize Firebase
// var firebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.database();
var storageRef = firebase.storage().ref();


let arindam ;
var basePath = "users/";
var concatchs
var presonId="";

var userId ;
var track_list =[];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    if(user !=null){      
        // console.log(user.uid, firebase.auth().currentUser.uid); 
        presonId = user.uid;
        arindam =  firebase.auth().currentUser.uid;
        concatchs = basePath.concat(arindam).concat("/");
        var dbRef = firebase.database().ref(concatchs);
        dbRef.on('child_added', (data) => {
            // console.log(data.val());  
            var muyObj = data.val();        
            var playedSong = muyObj.playedSong || 0;
            var favriteIcon = (muyObj.favourite)? `<i class="fas fa-heart"></i>`: `<i class="far fa-heart"></i>`;
            var favouritable =  muyObj.favourite; 
            $(".audioLists").append(`<div class="ui-state-default eachPlayerSong" data-key="${data.key}" data-url="${muyObj.fileUrl}">
                <div class="songIcon">
                  <img src="images/icon/play.svg">
                </div>
                <div class="songInfo"> 
                  <h6>${muyObj.filename}</h6>  
                  <p data-played="${playedSong}">${playedSong} played, Morning</p>
                  <div class="favouriteSong" favouritable="${favouritable}">${favriteIcon}</div>
                </div>            
              </div>`);
         
        });





        
    }
  } else {

  }
});


//favourite song click function 
$(document).on("click", ".favouriteSong", function () {
  var getCurrentAuthUid = firebase.auth().currentUser.uid;
  var getdbKey = $(this).closest(".eachPlayerSong").attr("data-key");
  var favouriteRef = firebase.database().ref("users/"+getCurrentAuthUid+"/"+getdbKey+"/");
 
  if($(this).attr("favouritable")=="true"){
    $(this).html(`<i class="far fa-heart"></i>`);
    alert("Remove form your favourite list");
    favouriteRef.update({
      favourite: false
    });
    
  }else{
    $(this).html(`<i class="fas fa-heart"></i>`);
    alert("Added to your favourite list");
    favouriteRef.update({
      favourite: true
    });

  }
  
})













var fileName ;
$(".upLBt").on("click", function(){
  fileName = $("#uploadFile").val();
  // console.log(fileName); 
});

$("#uploadFile").on("change", function(e){
  var file = e.target.files[0];
  console.log(file);
  var getUid = firebase.auth().currentUser.uid;

  $(".uploadSongsWrap").fadeOut();
  $(".uploadProgressBar").fadeIn();

  var stroageRef = firebase.storage().ref("mp3/"+getUid+"/"+file.name);

  var task = stroageRef.put(file);
  task.on('state_change', 
    function progress(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
      $(".uploadProgressBar span").css("width", progress+"%");
      
    }, 
    function error(err){
      console.log(err)
    },
    function complete(complete){
      console.log("complete");
      $(".uploadProgressBar").fadeOut();
      
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // console.log('File available at', downloadURL);


        firebase.database().ref("users/"+presonId+"/").push({
          filename: file.name,
          fileUrl:downloadURL,
          favourite:false
        });;

      });
    } 
  
  )


});



$( "#sortable" ).sortable();
$( "#sortable" ).disableSelection();

