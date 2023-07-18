
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
  var inputaddress = document.getElementById("direcciones");
  var inputpath = document.getElementById("paginas");
  
  
  var now = new Date();
  
  let navegador = navigator.userAgent;
  
  
  
  
  // Inicio de lectura de Coordenadas, Fecha y Hora
  function success(position) {
    
    // detección de coordenadas
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    obtenerDireccion(latitude, longitude);

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

    function obtenerDireccion(latitud, longitud) {
      const apiKey = 'AIzaSyBOoFPikOuTbdhk6jsyWXyi0xKxyFGxqEM';
      const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${apiKey}`;
      
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK') {
            const direccion = data.results[0].formatted_address;
            inputaddress.value = `${direccion}`;
            // console.log(direccion);
            // Aquí puedes hacer lo que desees con la dirección obtenida
          } else {
            console.log('Error al obtener la dirección:', data.error_message);
          }
        })
        .catch(error => {
          console.log('Error al obtener la dirección:', error);
        });
    }
    
    

    // function obtenerDireccion(latitude, longitude) {
    //   const apiURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
    //   fetch(apiURL)
    //     .then(response => response.json())
    //     .then(data => {
    //       const direccion = {
    //         calle: data.address.road || '',
    //         carrera: data.address.pedestrian || '',
    //         otros: data.display_name || '',
    //         // Otros detalles de dirección disponibles según la respuesta de la API
    //       };
    
    //       // Aquí puedes hacer lo que desees con los detalles de la dirección obtenida
    //       // Por ejemplo, asignar la dirección a un elemento HTML con el id "inputaddress"
    //       inputaddress.value = `${direccion.calle}, ${direccion.carrera}, ${direccion.otros} `;
    
    //       // Llama a la función para enviar la información después de obtener la dirección
    //       enviarInformacion();
    //     })
    //     .catch(error => {
    //       console.log("Error al obtener la dirección:", error);
    //     });
    // }
    
    
    // function obtenerDireccion(latitude, longitude) {
    
    //   const apiURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      
    //   fetch(apiURL)
    //   .then(response => response.json())
    //   .then(data => {
    //     const direccion = data.display_name;
    //     inputaddress.value = `${direccion}`;
    //     enviarInformacion(); // Llama a la función para enviar la información después de obtener la dirección
    //   })
    //   .catch(error => {
    //     console.log("Error al obtener la dirección:", error);
    //   });
    // }
      
    
    
    function enviarInformacion() {
      if (
        inputlatitude.value &&
        inputlongitude.value &&
        inputaddress.value &&
        inputpath.value
      ) {
        $.ajax({
          url:
            "https://script.google.com/macros/s/AKfycbxeC_U5HMOowCtuhr5jaK8kDh1jajogQ4O0rfu43DDEbdZNl1QpKRJxyPrsKBtrX2Ay/exec",
          type: "post",
          data: $("#my-google-sheet").serializeArray(),
        });
      } else {
        console.log("Por favor, completa todos los campos antes de enviar la información.");
      }
    }
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
  

