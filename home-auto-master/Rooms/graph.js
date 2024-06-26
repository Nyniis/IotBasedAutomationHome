var livingRoomGraphs = document.getElementById("livingRoomGraphs");
var kitchenGraphs = document.getElementById("kitchenGraphs");


var s = 0;
var xAxis = ["0s"];
var lrtData = [];
var lrhData = [];
var kgData = [];
var bwData = [];

var lrgtData = {
  label: "Living room temperature (°C)",
  data: lrtData,
  fill: false,
  borderColor: 'red'
};

var lrghData = {
  label: "Living room humidity (%)",
  data: lrhData,
  fill: false,
  borderColor: 'cyan'
};

var kData = {
  labels: xAxis,
  datasets: [{
    label: "Kitchen gas (ppm)",
    data: kgData,
    borderColor: "orange",
  }]
};

var bData = {
  labels: xAxis,
  datasets: [{
    label: "Bathroom water level (mm)",
    data: bwData,
    borderColor: 'blue'
  }]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0
  }
};

var lrData = {
  labels: xAxis,
  datasets: [lrgtData, lrghData]
};

var lrCharts = new Chart(livingRoomGraphs, {
  type: 'line',
  data: lrData,
  options: chartOptions
});

var kCharts = new Chart(kitchenGraphs, {
  type: 'line',
  data: kData,
  options: chartOptions
});



function updateCharts() {
  let lrRef = firebase.database().ref('Living Room');
  let kRef = firebase.database().ref('Kitchen');
 // let bRef = firebase.database().ref('Bathroom');
  
  s += 5;
  xAxis.push(s.toString() + "s");
  
  lrRef.once('value', function(snapshot) {
    let temp = snapshot.val().temperature;
    let humid = snapshot.val().humidite;
    console.log('get data from data base');
    console.log(temp);
    lrtData.push(temp);
    lrhData.push(humid);
    lrCharts.update();
  });
  
  kRef.once('value', function(snapshot) {
    let gas = snapshot.val().gaz;
    kgData.push(gas);
    kCharts.update();
  });
  
 
}

let i = setInterval(updateCharts, 10000);
