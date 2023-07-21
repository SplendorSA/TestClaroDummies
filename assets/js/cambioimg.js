// Obtener las miniaturas
const tinySlides = document.querySelectorAll('.tiny-slide');

// Obtener la imagen principal
const mainImage = document.getElementById('mainImage');

// Agregar eventos de clic a cada miniatura
tinySlides.forEach((tinySlide) => {
    tinySlide.addEventListener('click', () => {
        // Obtener el atributo src de la miniatura seleccionada
        const selectedImageSrc = tinySlide.querySelector('img').src;

        // Cambiar el atributo src de la imagen principal con el de la miniatura seleccionada
        mainImage.src = selectedImageSrc;
    });
});