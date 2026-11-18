const container = document.querySelector('.jobs-listings');
const pagination = document.querySelector('.pagination');
const resultsCount = document.querySelector('#results-count');

export const state = {
  allJobs: [],
  filteredJobs: [],
  currentPage: 1,
  RESULTS_PER_PAGE: 3,
}

fetch('./data.json')
  .then((res) => res.json())
  .then((jobs) => {
    // Guardamos todos los empleos en el estado global
    state.allJobs = jobs;
    state.filteredJobs = jobs;

    // Renderizamos la primera página
    renderPage(state.filteredJobs, state.currentPage);
    console.log('Empleos cargados:', jobs);
  });

export function renderPage(jobs, page) {
  container.innerHTML = '';
  document.querySelector('.pagination-counter')?.remove();

  const inicio = (page - 1) * state.RESULTS_PER_PAGE;
  const fin = page * state.RESULTS_PER_PAGE;
  const jobsEnEstaPagina = jobs.slice(inicio, fin);

  // Actualizar contador
  if (resultsCount) {
    resultsCount.textContent = `${jobs.length} empleo${jobs.length !== 1 ? 's' : ''}`;
  }

  // Sin resultados
  if (jobsEnEstaPagina.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
          <path d="M21 21l-6 -6"/>
        </svg>
        <p>No se encontraron empleos con los filtros seleccionados.</p>
      </div>`;
    pagination.innerHTML = '';
    return;
  }

  // Pintar cada empleo
  jobsEnEstaPagina.forEach((job, index) => {
    const tecnologias = Array.isArray(job.data.tecnologia)
      ? job.data.tecnologia
      : [job.data.tecnologia];

    const article = document.createElement('article');
    article.classList.add('job-listing-card', 'fade-in');
    article.style.animationDelay = `${index * 70}ms`;
    article.dataset.modalidad = job.data.modalidad;
    article.dataset.tecnologia = tecnologias.join(',');
    article.dataset.nivel = job.data.nivel;

    article.innerHTML = `
      <div class="job-info">
        <div class="job-tags">
          ${tecnologias.map((t) => `<span class="tag tag-tech">${t}</span>`).join('')}
          <span class="tag tag-level">${job.data.nivel}</span>
          <span class="tag tag-location">${job.data.modalidad}</span>
        </div>
        <h3>${job.titulo}</h3>
        <small>${job.empresa} · ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job" data-id="${job.id}">Aplicar</button>`;

    container.appendChild(article);
  });

  renderPagination(jobs, page);
}

// ─────────────────────────────────────────────
// Renderiza los botones de paginación
// ─────────────────────────────────────────────
export function renderPagination(jobs, page) {
  pagination.innerHTML = '';
  document.querySelector('.pagination-counter')?.remove();

  const totalPages = Math.ceil(jobs.length / state.RESULTS_PER_PAGE);
  if (totalPages <= 1) return;

  // Botón ← anterior
  const prev = document.createElement('a');
  prev.href = '#';
  prev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6l6 6"/></svg>`;
  if (page === 1) prev.classList.add('disabled');
  prev.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentPage > 1) {
      state.currentPage--;
      renderPage(state.filteredJobs, state.currentPage);
      scrollToListings();
    }
  });
  pagination.appendChild(prev);

  // Números de página
  for (let i = 1; i <= totalPages; i++) {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i;
    if (i === page) a.classList.add('is-active');
    a.addEventListener('click', (e) => {
      e.preventDefault();
      state.currentPage = i;
      renderPage(state.filteredJobs, state.currentPage);
      scrollToListings();
    });
    pagination.appendChild(a);
  }

  // Botón → siguiente
  const next = document.createElement('a');
  next.href = '#';
  next.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6l-6 6"/></svg>`;
  if (page === totalPages) next.classList.add('disabled');
  next.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderPage(state.filteredJobs, state.currentPage);
      scrollToListings();
    }
  });
  pagination.appendChild(next);

  // Contador de página
  const counter = document.createElement('p');
  counter.classList.add('pagination-counter');
  counter.textContent = `Página ${page} de ${totalPages} · ${jobs.length} resultado${jobs.length !== 1 ? 's' : ''}`;
  pagination.after(counter);
}

// ─────────────────────────────────────────────
// Scroll suave al cambiar página
// ─────────────────────────────────────────────
function scrollToListings() {
  document.querySelector('.titulo-resulatados')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
