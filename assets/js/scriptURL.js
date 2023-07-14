
const scriptURL = '<https://script.google.com/macros/s/AKfycbxeC_U5HMOowCtuhr5jaK8kDh1jajogQ4O0rfu43DDEbdZNl1QpKRJxyPrsKBtrX2Ay/exec>' //URL script generada por Google Sheets
const form = document.forms['my-google-sheet'] //Nombre del formulario

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})