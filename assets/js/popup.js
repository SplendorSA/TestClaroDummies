document.addEventListener("DOMContentLoaded", function() {
    // Obtén una referencia al elemento del pop-up
    var popup = document.getElementById("popup");
  
    // Muestra el pop-up
    popup.style.display = "block";
  
    // Agrega un controlador de eventos para cerrar el pop-up al hacer clic en el botón de cerrar
    var closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener("click", function() {
      popup.style.display = "none";
    });
  });
  