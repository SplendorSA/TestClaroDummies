document.addEventListener("DOMContentLoaded", function() {
  var popup = document.getElementById("popup");
  var popupContent = document.querySelector(".popup-content");
  var closeBtn = document.getElementById("close-btn");

  // Muestra el pop-up
  popup.style.display = "block";

  // Agrega un controlador de eventos para cerrar el pop-up al hacer clic en el botón de cerrar
  closeBtn.addEventListener("click", function() {
    popup.style.display = "none";
  });

  // Agrega un controlador de eventos para cerrar el pop-up al hacer clic fuera de la imagen
  window.addEventListener("click", function(event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  // Evita que los clics dentro del contenido del popup cierren el popup
  popupContent.addEventListener("click", function(event) {
    event.stopPropagation();
  });
});
