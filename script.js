let alarms = [];
const alarmList = document.getElementById('list');
// const addAlarmInput = document.getElementById('add');

function addAlarmsToDOM(alarm){
    const li = document.createElement('li');

    li.innerHTML = `
        <span id='${alarm.id}'>${alarm.alarmTime}</span>
        <img src="bin.svg" class="delete" id="${alarm.id}"></i>
     `;

    alarmList.append(li);
}

// Render the alarm list 
function renderAlarmList(){
    alarmList.innerHTML = '';

    for (let i = 0; i<alarms.length; i++) {
        addAlarmsToDOM(alarms[i]);   
    }
}

// Adds an alarm to the list 
function addAlarm(alarm){
   alarms.push(alarm);
   renderAlarmList();
   return; 
}

// Delete an alarm when user clicks the delete button
function deleteAlarm(alarmId){
    const newAlarms = alarms.filter(function (alarm) {
        return alarm.id !== alarmId;
    });

    alarms = newAlarms;
    renderAlarmList();
}


// Setting up the current Time

var clock = document.getElementById('clock');

var currentTime = setInterval(function(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = (date.getHours()) < 12 ? "AM" : "PM";
    if(hours > 12){
        hours = (date.getHours() - 12);
    }else if(hours == 0){
        hours = 12;
    }else{
        hours = hours;
    }

    const now = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)  + " " + ampm;

   for(i=0; i<alarms.length; i++){
    if(alarms[i].alarmTime == now){
        window.alert("Alarm ringing!");
    }
   }

    clock.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)  + " " + ampm;
}, 1000);


function addZero(time){
    return (time < 10) ? "0" + time : time;
}


// hours dropdown options
function hrsDropdown(){
    var select = document.getElementById("alarmhrs");
    var hrs = 12;
    for(i=1; i<=hrs; i++){
        select.options[select.options.length] = 
        new Option (i<10?"0" + i:i,i);
    }
}

hrsDropdown();

// Minutes dropdown options

function minDropdown(){
    var select = document.getElementById("alarmmins");
    var min = 59;
    for(i=0; i<=min; i++){
        select.options[select.options.length] = 
        new Option (i<10?"0" + i:i,i);
    }
}

minDropdown();

// seconds dropdown options

function secDropdown(){
    var select = document.getElementById("alarmsecs");
    var sec = 59;
    for(i=0; i<=sec; i++){
        select.options[select.options.length] = 
        new Option (i<10?"0" + i:i,i);
    }
}

secDropdown();

// Handles whenever a particular button is getting clicked
function handleClickListener(event){
    const target = event.target;
    if(target.className == 'add-button'){
      
        const alarmId = target.id;
        // Getting the alarm time

        // For hours
        var e = document.getElementById('alarmhrs');
        var hoursSetInAlarm = e.options[e.selectedIndex].text;
        // console.log(hoursSetInAlarm);

        // for minutes
        var f = document.getElementById('alarmmins');
        var minutesSetInAlarm = f.options[f.selectedIndex].text;
        // console.log(minutesSetInAlarm);

        // for seconds
        var g = document.getElementById('alarmsecs');
        var secondsSetInAlarm = g.options[g.selectedIndex].text;
        // console.log(secondsSetInAlarm);

        // for ampm
        var h = document.getElementById('ampm')
        var ampm_value = h.options[h.selectedIndex].text;

        // alarmTime
        var alarmTime = hoursSetInAlarm + ":" + minutesSetInAlarm + ":" + secondsSetInAlarm  + " " + ampm_value;
        console.log(alarmTime);

        const alarm = {
            alarmTime,
            id: Date.now().toString(),
        }

        addAlarm(alarm);
        return;
    }else if(target.className == 'delete'){
        console.log("Delete icon pressed");
        const alarmId = target.id;
        deleteAlarm(alarmId);
        return;
    }
}
document.addEventListener('click', handleClickListener);