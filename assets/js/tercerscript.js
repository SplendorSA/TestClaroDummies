document.addEventListener("DOMContentLoaded", function() {
    SendFormGoogleSheets();
});

function SendFormGoogleSheets() {
    const status = document.querySelector("#status");
    const latitudetxt = document.querySelector("#latitude");
    const longitudetxt = document.querySelector("#longitude");  
  
    var inputlatitude = document.getElementById("latitudes");
    var inputlongitude = document.getElementById("longitudes");
    
    var now = new Date();
    
    
  
    latitudetxt.textContent = "";
    longitudetxt.textContent = "";
    
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
  
      status.textContent = "";
      latitudetxt.textContent = `Latitude: ${latitude} °`;
      longitudetxt.textContent = `Longitude: ${longitude} °`;
  
      inputlatitude.value = `${latitude}`;
      inputlongitude.value = `${longitude}`;

      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      document.getElementById('fechashoras').value = now.toISOString().slice(0,16);
  
      $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxeC_U5HMOowCtuhr5jaK8kDh1jajogQ4O0rfu43DDEbdZNl1QpKRJxyPrsKBtrX2Ay/exec',
        type: 'post',
        data: $("#my-google-sheet").serializeArray()
      });
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  