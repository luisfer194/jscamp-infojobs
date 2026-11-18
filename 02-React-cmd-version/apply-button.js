const jobsListenerSection = document.querySelector('.jobs-listings');

jobsListenerSection.addEventListener('click', (event) => {
  const element = event.target;

  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicando!';
    element.classList.add('is-applied');
    element.disabled = true;
  }
});

//Comentarios con otros eventos interesantes
/* const botones = document.querySelectorAll('.button-apply-job');


botones.forEach(boton => {
  boton.addEventListener('click', () => {
    boton.textContent = '¡Gracias por hacer clic en mí!';
    boton.classList.add("is-applied")
    boton.disabled = true;
  })
}); */

/* const searchInput = document.querySelector('#empleos-search-input');

searchInput.addEventListener('input', () => {
  console.log(searchInput.value);
});

searchInput.addEventListener('blur', () => {
  console.log('Se dispara cuando el campo pierde el foco');
});

const searchForm = document.querySelector('#empleos-search-from');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('El formulario se ha enviado');
});
 */

