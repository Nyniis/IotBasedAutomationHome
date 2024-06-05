var livingRoom = document.getElementById('Living-room');
var kitchen = document.getElementById('Kitchen');
var Access = document.getElementById('Access');
var notifications = document.getElementById('Notifications');
var inputs = document.getElementsByName('tabs');
var notificationsCounter = document.getElementById('Notifications__counter');
var settings = document.getElementById('Settings');
var frontYard = document.getElementById('FrontYard');
var nc = 0;
var email;
var ref = firebase.database().ref('/');
ref.on('value',function(snapshot){
    email = snapshot.val().Email;
});
function showChecked() {
    if(nc==0) notificationsCounter.style.display = 'none';
    else notificationsCounter.style = '';
    if(inputs[0].checked) {
        livingRoom.style.display = 'block';
        kitchen.style.display = 'none';
        Access.style.display = 'none';
        frontYard.style.display = 'none';
        notifications.style.display = 'none';
        settings.style.display = 'none';
    }
    else if(inputs[1].checked) {
        livingRoom.style.display = 'none';
        kitchen.style.display = 'block';
        Access.style.display = 'none';
        frontYard.style.display = 'none';
        notifications.style.display = 'none';
        settings.style.display = 'none';
    }
    
    else if(inputs[2].checked) {
        livingRoom.style.display = 'none';
        kitchen.style.display = 'none';
        Access.style.display = 'block';
        frontYard.style.display = 'none';
        notifications.style.display = 'none';
        settings.style.display = 'none';
    }
    
    else if(inputs[3].checked) {
        livingRoom.style.display = 'none';
        kitchen.style.display = 'none';
        Access.style.display = 'none';
        frontYard.style.display = 'block';
        notifications.style.display = 'none';
        settings.style.display = 'none';
    }
    else if(inputs[4].checked) {
        livingRoom.style.display = 'none';
        kitchen.style.display = 'none';
        Access.style.display = 'none';
        frontYard.style.display = 'none';
        notifications.style.display = 'block';
        settings.style.display = 'none';
        notificationsCounter.style.display = 'none';
        nc = 0;
    }
    else if(inputs[5].checked) {
        livingRoom.style.display = 'none';
        kitchen.style.display = 'none';
        Access.style.display = 'none';
        frontYard.style.display = 'none';
        notifications.style.display = 'none';
        settings.style.display = 'block';
    }
}

/******************************************* FUNCTION LED STATUS FOR LIVING ROOM ********************************************
****************************************************************************************************************************/


$(document).ready(function () {
    initialise();
    var database = firebase.database();
    var LED_STATUS;
    database.ref("/Living Room").on("value", function (snap){
        LED_STATUS = snap.val().LED_STATUS;
        if(LED_STATUS == 1){
            $("#firebase-Living-room-light").text(" On");
            document.getElementById('Living-room-light-trigger').checked = true;
            
        } else { 
            $("#firebase-Living-room-light").text(" Off"); 
            document.getElementById('Living-room-light-trigger').checked = false;
        }
    });
    $("#Living-room-light-trigger").click(function() {
        var firebaseRef = firebase.database().ref("/Living Room").child("LED_STATUS");
        if(LED_STATUS == 1) {
            firebaseRef.set(0);
            LED_STATUS = 0;
        } else {
        firebaseRef.set(1);
            LED_STATUS = 1;
        }
    });
});



/*********************************************FUNCTION GETTING TEMPERATURE FOR LIVING ROOM**********************************/



var temperature = document.getElementById('firebase-Living-room-temperature');
var dbRef = firebase.database().ref("/Living Room").child('temperature');
dbRef.on('value', snap => temperature.innerText = snap.val()); 



/* **************************************FUNCTION GETTING HUMIDITY FOR LIVING ROOM*********************************************/

var humidite = document.getElementById('firebase-Living-room-humidity');
var dbRef = firebase.database().ref("/Living Room").child('humidite');
dbRef.on('value', snap => humidite.innerText = snap.val()); 


/**************************************** FUNCTION FOR FAN STATUS ************************************************************
*****************************************************************************************************************************/


$(document).ready(function () {
    var database = firebase.database();
    var Fan_STATUS;
    database.ref("/Living Room").on("value", function (snap){
        Fan_STATUS = snap.val().Fan;
        if(Fan_STATUS == 1){
            $("#firebase-Living-room-fan").text(" On");
            document.getElementById('Living-room-fan-trigger').checked = true;

        } else { 
            $("#firebase-Living-room-fan").text(" Off");
            document.getElementById('Living-room-fan-trigger').checked = false; 
        }
    });
$("#Living-room-fan-trigger").click(function() {
    var firebaseRef = firebase.database().ref("/Living Room").child("Fan");
    if(Fan_STATUS == 1) {
        firebaseRef.set(0);
        Fan_STATUS = 0;
    } else {
       firebaseRef.set(1);
        Fan_STATUS = 1;
    }
});
});



/*********************************************FUNCTION INTRUSION STATUS***********************************
**********************************************************************************************************/
/*$(document).ready(function () {
    let database = firebase.database();
    let intrusionActive;

    // Function to update the UI based on intrusion status
    function updateIntrusionStatus(Intr) {
        if (Intr == 1) {
            $("#firebase-frontYard-intrusion").text('There is movement');
        } else {
            $("#firebase-frontYard-intrusion").text('There is no movement');
        }
    }

    // Function to update the toggle button style and content
    function updateToggleButton() {
        if (intrusionActive) {
            $("#toggle-intrusion")
                .addClass('active')
                .removeClass('inactive')
                .text('Intrusion Detection Activated');
        } else {
            $("#toggle-intrusion")
                .addClass('inactive')
                .removeClass('active')
                .text('Intrusion Detection Deactivated');
        }
    }

    // Listen for changes in the intrusion status
    database.ref("/Front yard").on("value", function (snap) {
        let data = snap.val();
        intrusionActive = data.IntrusionActive;
        
        updateToggleButton();

        if (intrusionActive) {
            let Intr = data.intrusion;
            updateIntrusionStatus(Intr);
            $("#firebase-frontYard-intrusion").addClass('intrusion-active').removeClass('intrusion-inactive');
        } else {
            $("#firebase-frontYard-intrusion").text('Intrusion detection is off');
            $("#firebase-frontYard-intrusion").addClass('intrusion-inactive').removeClass('intrusion-active');
        }
    });

    // Toggle button click handler
    $("#toggle-intrusion").click(function () {
        let newStatus = !intrusionActive; // Toggle the current status
        database.ref("/Front yard").update({
            IntrusionActive: newStatus
        });
    });
});*/
$(document).ready(function () {
    let database = firebase.database();
    let intrusion = document.getElementById('firebase-frontYard-intrusion');
    let intrusionAlert = document.getElementById('Intrusion__alert');
    

    // Function to check for notifications
    function checkForNotifications() {
        let date = new Date();
      
        if (intrusion.innerHTML.trim() === 'There is movement') {
            console.log("Condition met: Displaying intrusion alert");
            if (intrusionAlert.style.display === 'none') nc++;
            intrusionAlert.style.display = 'block';  
            intrusionAlert.children[2].textContent = date.toUTCString();
          
        }
    }

    let intrusionActive;

    // Function to update the UI based on intrusion status
    function updateIntrusionStatus(Intr) {
        if (Intr == 1) {
            $("#firebase-frontYard-intrusion").text('There is movement');
            checkForNotifications();
        } else {
            $("#firebase-frontYard-intrusion").text('There is no movement');
        }
    }

    // Function to update the toggle button style and content
    function updateToggleButton() {
        if (intrusionActive) {
            $("#toggle-intrusion")
                .addClass('active')
                .removeClass('inactive')
                .text('Intrusion Detection Activated');
        } else {
            $("#toggle-intrusion")
                .addClass('inactive')
                .removeClass('active')
                .text('Intrusion Detection Deactivated');
        }
    }

    // Listen for changes in the intrusion status
    database.ref("/Front yard").on("value", function (snap) {
        let data = snap.val();
        intrusionActive = data.IntrusionActive;
        
        updateToggleButton();

        if (intrusionActive) {
            let Intr = data.intrusion;
            updateIntrusionStatus(Intr);
            $("#firebase-frontYard-intrusion").addClass('intrusion-active').removeClass('intrusion-inactive');
        } else {
            $("#firebase-frontYard-intrusion").text('Intrusion detection is off');
            $("#firebase-frontYard-intrusion").addClass('intrusion-inactive').removeClass('intrusion-active');
        }
    });

    // Toggle button click handler
    $("#toggle-intrusion").click(function () {
        let newStatus = !intrusionActive; // Toggle the current status
        database.ref("/Front yard").update({
            IntrusionActive: newStatus
        });
    });
});




/************************************** FUNCTION LED STATUS FOR BATHROOM ******************************************
****************************************************************************************************************/


/*$(document).ready(function () {
    var database = firebase.database();
    var LED_STATUS;
    database.ref("/Bathroom").on("value", function (snap){
        LED_STATUS = snap.val().LED_STATUS1;
        if(LED_STATUS == 1){
            $("#firebase-Bathroom-light").text(" On");
            document.getElementById('Bathroom-light-trigger').checked = true;
        } else { 
            $("#firebase-Bathroom-light").text(" Off"); 
            document.getElementById('Bathroom-light-trigger').checked = false;
        }
    });
$("#Bathroom-light-trigger").click(function() {
    var firebaseRef = firebase.database().ref("/Bathroom").child("LED_STATUS1");
    if(LED_STATUS == 1) {
        firebaseRef.set(0);
        LED_STATUS = 0;
    } else {
       firebaseRef.set(1);
        LED_STATUS = 1;
    }
});
});
*/



/****************************************** FUNCTION GETTING LED STATUS FOR KITCHEN *********************************
***************************************************************************************************************** */


$(document).ready(function () {
    var database = firebase.database();
    var LED_STATUS;
    database.ref("/Kitchen").on("value", function (snap){
        LED_STATUS = snap.val().LED_STATUS2;
        if(LED_STATUS == 1){
            $("#firebase-Kitchen-light").text(" On");
            document.getElementById('Kitchen-light-trigger').checked = true;
        } else { 
            $("#firebase-Kitchen-light").text(" Off"); 
            document.getElementById('Kitchen-light-trigger').checked = false;
        }
    });
$("#Kitchen-light-trigger").click(function() {
    var firebaseRef = firebase.database().ref("/Kitchen").child("LED_STATUS2");
    if(LED_STATUS == 1) {
        firebaseRef.set(0);
        LED_STATUS = 0;
    } else {
       firebaseRef.set(1);
        LED_STATUS = 1;
    }
});
});
/***********************************************************************light front yard******************************************************** */
let fyref = firebase.database().ref('/Front yard');
fyref.on('value',function(snapshot){
    if(snapshot.val().Light == 1) {
        document.getElementById('frontYard-light-trigger').checked = true;
        document.getElementById('firebase-frontYard-light').innerHTML = ' On';
    }
    else {
        document.getElementById('frontYard-light-trigger').checked = false;
        document.getElementById('firebase-frontYard-light').innerHTML = ' Off';
    }
});
document.getElementById('frontYard-light-trigger').onclick = function() {
    (this.checked) ? fyref.update({Light:1}) : fyref.update({Light:0});
}
/* *************************************** FUNCTION GETTING GAZ VALUE ***************************************************
*****************************************************************************************************************/


var gaz = document.getElementById('firebase-Kitchen-gas');
var dbRef = firebase.database().ref("/Kitchen").child('gaz');
dbRef.on('value', snap => gaz.innerText = snap.val()); 





/****************************************************NOTIFICATION******************************************************
***********************************************************************************************************/
function closeNotification(ximg) {
    ximg.parentElement.style.display = 'none';
}

function checkForNotifications() {
   
    let intrusion = document.getElementById('firebase-frontYard-intrusion');
    let temperature = document.getElementById('firebase-Living-room-temperature');
    let humidity = document.getElementById('firebase-Living-room-humidity');
    let gas = document.getElementById('firebase-Kitchen-gas');
    //let water = document.getElementById('firebase-Bathroom-water');
    let intrusionAlert = document.getElementById('Intrusion__alert');
    let temperatureAlert = document.getElementById('Temperature__alert');
    let humidityAlert =  document.getElementById('Humidity__alert');
    let gasAlert = document.getElementById('Gas__alert');
    //let waterAlert = document.getElementById('Water__alert');
   // console.log("Intrusion innerHTML:", intrusion.innerHTML.trim());
    //console.log("Intrusion alert display:", intrusionAlert.style.display);
    let date = new Date();
   /* if(intrusion.innerHTML == ' There is movement') {
        if(intrusionAlert.style.display == 'none') nc++;
        intrusionAlert.style = 'block';
        intrusionAlert.children[2].textContent = date.toUTCString();
      //  firebase.database().ref('/Living Room').update({Buzzer:1});
    }*/
    if(Number(temperature.innerText)>document.getElementById('tempTreshholdInput').value) {
        if(temperatureAlert.style.display == 'none') nc++;
        temperatureAlert.style = 'block';
        document.getElementById('Living-room-fan-trigger').checked = true;
        temperatureAlert.children[2].textContent = date.toUTCString();
        $(document).ready(function () {
            var database = firebase.database();
            var Fan_Status;
            database.ref("/Living Room").on("value", function (snap){
                Fan_Status = snap.val().Fan;
            });
            var firebaseRef = firebase.database().ref("/Living Room").child("Fan");
            if(Fan_Status == 0) {
                firebaseRef.set(1);
                Fan_Status = 1;
            }
        });   
    }
    if(Number(humidity.innerText)>30) {
        if(humidityAlert.style.display == 'none') nc++;
        humidityAlert.style = 'block';
        humidityAlert.children[2].textContent = date.toUTCString();
    }
    if(Number(gas.innerText)>500) {
        if(gasAlert.style.display == 'none') nc++;
        gasAlert.style = 'block';
        gasAlert.children[2].textContent = date.toUTCString();
        firebase.database().ref('/Living Room').update({Buzzer:1});
    }
    /*
    if(Number(water.innerText)>30) {
        if(waterAlert.style.display == 'none') nc++;
        waterAlert.style = '';
        waterAlert.children[2].textContent = date.toUTCString();
    }*/
    notificationsCounter.innerHTML = nc;
    showChecked();
}
function turnBuzzerOff(button) {
    firebase.database().ref('/Living Room').update({Buzzer:0});
    firebase.database().ref('/Front yard').update({Intrusion:0});
    document.getElementById('firebase-frontYard-intrusion').innerHTML = ' There is no movement';
    button.parentElement.parentElement.style.display = 'none';
}
function initialise() {
    showChecked();
    for(let i=0;i<document.getElementsByClassName('alert__container')[0].childElementCount;i++) {
        document.getElementsByClassName('alert__container')[0].children[i].style.display = 'none';
    }
    document.getElementById('confirmChangeTreshhold').style.display = 'none';
    let ref = firebase.database().ref('/');
    ref.on('value',function(snapshot){

        document.getElementById('tempTreshholdInput').value = snapshot.val().tempTreshhold;
        document.getElementById('sms__notifications__trigger').checked = snapshot.val().smsNotifications;
        document.getElementById('email__notifications__trigger').checked = snapshot.val().emailNotifications;
        if(snapshot.val().Email == "") {
            document.getElementById('email__notifications__trigger').disabled = true;
            document.getElementById('email__notifications__trigger').checked = false;
            document.getElementById('notificationsEmail').innerHTML = 'No email added! Add one <a href="email.html">here!</a>'
        }
        else {
            document.getElementById('email__notifications__trigger').disabled = false;
            document.getElementById('email__notifications__trigger').checked = snapshot.val().emailNotifications;
            document.getElementById('notificationsEmail').innerHTML = snapshot.val().Email + '.&nbsp;<a href="email.html">Change it!</a>';
        }
    });
    
}
function clearNotifications(button){
    let alerts = button.nextElementSibling.children;
    for(let i=0;i<alerts.length;i++) {
        alerts[i].style.display = 'none';
    }
}
function emailTrigger() {
    let emailTriggerButton = document.getElementById('Email-trigger');
    let ref = firebase.database().ref('/');
    if(emailTriggerButton.checked) {
        ref.update({EmailEnabled:true});
    }
    else {
        ref.update({EmailEnabled:false});
    }
}
function changeTemperatureTreshhold(button) {
    document.getElementById('tempTreshholdInput').disabled = false;
    document.getElementById('confirmChangeTreshhold').style = '';
    button.style.display = 'none';
    document.getElementById('tempTreshholdInput').focus();
}
function confirmChangeTreshhold(button) {
    button.style.display = 'none';
    document.getElementById('changeTemperatureTreshhold').style = '';
    let n = document.getElementById('tempTreshholdInput').value;
    document.getElementById('tempTreshholdInput').disabled = true;
    if(n>50) {
        document.getElementById('tempTreshholdInput').value = 50;
        ref.update({tempTreshhold:50});
    }
    else if(n<20) {
        document.getElementById('tempTreshholdInput').value = 20;
        ref.update({tempTreshhold:20});
    }
    else ref.update({tempTreshhold:n});
}
function emailNotifications(input) {
    ref.on('value',function(snapshot){
        if(snapshot.val().Email == "") {
            input.disabled = true;
        }
        else {
            input.disabled = false;
            (input.checked) ? ref.update({emailNotifications:true}) : ref.update({emailNotifications:false})
        }
    })
}
function smsNotifications(input) {
    input.checked ? ref.update({smsNotifications:true}) : ref.update({smsNotifications:false});
}
function smallScreenMenu(checkbox) {
    if(checkbox.checked) {
        document.getElementsByClassName('header__list')[0].style.display = 'block';
        document.getElementById('dropdown').setAttribute('src','image/whiteQuit.png');
        document.getElementsByClassName('small__screen__dropdown')[0].style.top = '10px';
    }
    else {
        document.getElementsByClassName('header__list')[0].style.display = 'none';
        document.getElementById('dropdown').setAttribute('src','image/dropdown.png');
        document.getElementsByClassName('small__screen__dropdown')[0].style.top = '15px';
    }
}
let id = setInterval(checkForNotifications,5000);

////////////////////////


document.addEventListener("DOMContentLoaded", function() {
    const addAccessBtn = document.getElementById('add-access-btn');
    const modal = document.getElementById('add-access-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const submitAccessBtn = document.getElementById('submit-access-btn');
    const userNameInput = document.getElementById('user-name');
    const userTagInput = document.getElementById('user-tag');
    const accessTableBody = document.getElementById('access-table-body');

    // Open modal
    addAccessBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Add access
    submitAccessBtn.onclick = function() {
        const name = userNameInput.value.trim();
        const tag = userTagInput.value.trim();

        if (name && tag) {
            const newUserRef = firebase.database().ref('Access').push();
            newUserRef.set({
                name: name,
                tag: tag
            });

            userNameInput.value = '';
            userTagInput.value = '';
            modal.style.display = "none";
        } else {
            alert('Please enter both name and tag.');
        }
    }

    // Fetch and display users
    const accessRef = firebase.database().ref('Access');
    accessRef.on('value', function(snapshot) {
        accessTableBody.innerHTML = '';
        snapshot.forEach(function(childSnapshot) {
            const user = childSnapshot.val();
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const tagCell = document.createElement('td');
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');

            nameCell.textContent = user.name;
            tagCell.textContent = user.tag;
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.setAttribute('data-id', childSnapshot.key);

            deleteButton.onclick = function() {
                const userId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this user?')) {
                    firebase.database().ref('Access/' + userId).remove()
                        .then(() => {
                            console.log('User deleted successfully');
                        })
                        .catch((error) => {
                            console.error('Error deleting user:', error);
                        });
                }
            };

            deleteCell.appendChild(deleteButton);
            row.appendChild(nameCell);
            row.appendChild(tagCell);
            row.appendChild(deleteCell);
            accessTableBody.appendChild(row);
        });
    });
});




