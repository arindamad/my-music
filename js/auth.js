



var removeClass = (elem,className)=>{
    elem.forEach(function(i){
        i.classList.remove(className);
     });
}

var showLogin = (elem)=>{
    document.getElementsByClassName('email-login')[0].style.display="block";
    document.getElementsByClassName('email-signup')[0].style.display="none";
    var allElem = document.querySelectorAll('.lb-header a');
    removeClass(allElem,'active');
    elem.classList.add("active");

}


var showSignUp = (elem)=>{
    document.getElementsByClassName('email-login')[0].style.display="none";
    document.getElementsByClassName('email-signup')[0].style.display="block";
    var allElem = document.querySelectorAll('.lb-header a');
    removeClass(allElem,'active');
    elem.classList.add("active");
}



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementsByClassName('totalWrap')[0].style.display="block";
      document.getElementsByClassName('authSection')[0].style.display="none";
      if(user !=null){
        //   console.log(user);
        //   document.getElementById('welcomNote').innerHTML= "Welcome "+user.email;
      }
    } else {
      // No user is signed in.
      document.getElementsByClassName('totalWrap')[0].style.display="none";
      document.getElementsByClassName('authSection')[0].style.display="block";
    }
});

/*
function for Normal login 
*/
var logIn = ()=>{
   var email =  document.getElementById('logInEmail').value;
   var pass  =  document.getElementById('logInPass').value;
   console.log(email, pass);
   firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });   
}
var signUp = ()=>{
    var email =  document.getElementById('regEmail').value;
    var pass  =  document.getElementById('regPass').value;
    console.log(email, pass);
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    }); 
 }


var logOut = ()=>{
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
        alert("Sign Out successfully")
    }).catch(function(error) {
    // An error happened.
        alert(error);
    });
}



//function for google login 
var googleLogin = ()=>{
    alert("abcd");
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().useDeviceLanguage();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    
    console.log(user);
    // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });
}