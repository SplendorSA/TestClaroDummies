// Esperar a que el documento se haya cargado completamente
$(document).ready(function() {
      
    // Configurar Tobii Lightbox
    var lightbox = new Tobii();
    
    // Abrir el pop-up al cargar la página
    lightbox.show("#my-popup");
});