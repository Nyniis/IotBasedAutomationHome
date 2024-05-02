
const firebaseConfig = {
    apiKey: "AIzaSyAfRq1L3pQckPz9yx8UFVLtM9CtUwoIWQM",
    authDomain: "smarthome-5a747.firebaseapp.com",
    databaseURL: "https://smarthome-5a747-default-rtdb.firebaseio.com",
    projectId: "smarthome-5a747",
    storageBucket: "smarthome-5a747.appspot.com",
    messagingSenderId: "437633317343",
    appId: "1:437633317343:web:52442fb9bebc441732ac6a"
  };
firebase.initializeApp(firebaseConfig);
var skip = document.getElementById('skip');
function skipEmail() {
    document.body.style = 'pointer-events:none';
    document.getElementById('loading').style.display = 'block';
    let ref = firebase.database().ref('/');
    ref.on('value',function(snapshot){
        ref.update({"Email":""});
        if(snapshot.val().Email == "") window.location.replace('Rooms.html');
    });
}
function submitEmail() {
    if(document.getElementById('email').checkValidity()) {
        event.preventDefault();
        document.body.style = 'pointer-events:none';
        document.getElementById('loading').style.display = 'block';
        console.log('ok let\'s start');
        let email = document.getElementById('email').value;
        console.log(email);
        let ref = firebase.database().ref("/");
        ref.update({"Email": email});
        ref.on('value',function(snapshot){
            if(snapshot.val().Email == email) {
                window.location.replace('confirmMail.html');
            }
        });
    }
}
