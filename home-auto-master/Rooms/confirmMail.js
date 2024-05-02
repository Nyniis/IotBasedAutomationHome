// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfRq1L3pQckPz9yx8UFVLtM9CtUwoIWQM",
  authDomain: "smarthome-5a747.firebaseapp.com",
  databaseURL: "https://smarthome-5a747-default-rtdb.firebaseio.com",
  projectId: "smarthome-5a747",
  storageBucket: "smarthome-5a747.appspot.com",
  messagingSenderId: "437633317343",
  appId: "1:437633317343:web:52442fb9bebc441732ac6a"
};
/*
// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
var ref = firebase.database().ref('/');
var code = Math.trunc(Math.random() * 10000);
ref.on('value',(snapshot) => {
    let email = snapshot.val().Email;
    document.getElementById('email').innerHTML = email;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "yacinejnano@gmail.com",
        Password : "891FD0F0971FB18992B8857A8779E6E694CF",
        To : email,
        From : "yacinejnano@gmail.com",
        Subject : "Confirm email",
        Body : "your confirmation code is: " + code
    }).then(function(){
          alert('confirmation code sent successfully!');
          document.getElementById('info').innerHTML = 'Please type in the confirmation code we sent to your email';
          document.getElementById('info').style.animation = 'none';
          document.getElementById('info').style.color = 'black';
          document.getElementById('info').style.fontStyle = 'normal';
        }
    );
});
function verifyCode() {
    event.preventDefault();
    console.log('the outside code value: ' + code)
    let c = document.getElementById('code');
    if(Number(c.value) == code) {
        window.location.replace('Rooms.html');
    }
    else {
        alert('Wrong code, please try again');
    }
}
*/