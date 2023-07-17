
// El permiso de ubicación se pide apenas carga la página
document.addEventListener("DOMContentLoaded", function() {
    SendFormGoogleSheets();
});

// Ejecución del Script
function SendFormGoogleSheets() {
  
  // Const y Var para la identificación de elementos en el HTML
  const status = document.querySelector("#status"); 
  var inputlatitude = document.getElementById("latitudes");
  var inputlongitude = document.getElementById("longitudes");
  var inputpath = document.getElementById("paginas");
  
  
  var now = new Date();
  
  let navegador = navigator.userAgent;
  
  
  
  
  
  // Inicio de lectura de Coordenadas, Fecha y Hora
  function success(position) {
    
    // detección de coordenadas
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // detección de Path actual
    const currentPath = window.location.pathname;
    
    // actualización de Status de lectura dependiendo de si se dio o no permiso
    status.textContent = "";
      
    // impresión en el input de Coordenadas
    inputlatitude.value = `${latitude}`;
    inputlongitude.value = `${longitude}`;

    // impresión en el input de Path
    inputpath.value = `${currentPath}`;

    // impresión en el input de fecha y hora
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('fechashoras').value = now.toISOString().slice(0,16);

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
      console.log("Estás usando un dispositivo móvil!!");
    } else {
      console.log("No estás usando un móvil");
    }




  
    // envío de información, no se ejecuta si no se confirma el que los inputs estén llenos con la respectiva información
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbxeC_U5HMOowCtuhr5jaK8kDh1jajogQ4O0rfu43DDEbdZNl1QpKRJxyPrsKBtrX2Ay/exec',
      type: 'post',
      data: $("#my-google-sheet").serializeArray()
    });
  }
  
  // Retroalimentación si no hay conexión a internet
  function error() {
    status.textContent = "Unable to retrieve your location";
  }
  
  // Advertencia de si el usuario aún tiene abierto el permiso de localización o si no aceptó el permiso
  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
  