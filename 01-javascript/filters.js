import { state } from './fech-data.js';
import { renderPage } from './fech-data.js';

const filterLocation = document.querySelector('#filter-location');
const filterTechnology = document.querySelector('#filter-technology');
const filterLevel = document.querySelector('#filter-experience-level');
const filterInput = document.querySelector('#empleos-search-input');

const mensaje = document.querySelector('#filter-selected-value');

function applyFilters() {
  const searchTerm = filterInput.value.toLowerCase().trim();
  const selectedLocation = filterLocation.value;
  const selectedTech = filterTechnology.value;
  const selectedLevel = filterLevel.value;

  // Filtramos sobre allJobs (nunca sobre filteredJobs)
  state.filteredJobs = state.allJobs.filter((job) => {
    const tecnologias = Array.isArray(job.data.tecnologia)
      ? job.data.tecnologia
      : [job.data.tecnologia];

    const matchSearch =
      searchTerm === '' ||
      job.titulo.toLowerCase().includes(searchTerm) ||
      job.empresa.toLowerCase().includes(searchTerm) ||
      job.descripcion.toLowerCase().includes(searchTerm);

    const matchLocation =
      selectedLocation === '' || selectedLocation === job.data.modalidad;

    const matchTech = selectedTech === '' || tecnologias.includes(selectedTech);

    const matchLevel = selectedLevel === '' || selectedLevel === job.data.nivel;

    return matchSearch && matchLocation && matchTech && matchLevel;
  });

  // Mostrar filtros activos
  const activos = [
    selectedLocation && `📍 ${selectedLocation}`,
    selectedTech && `⚙️ ${selectedTech}`,
    selectedLevel && `🎯 ${selectedLevel}`,
    searchTerm && `🔍 "${searchTerm}"`,
  ].filter(Boolean);

  mensaje.textContent = activos.length
    ? `Filtros activos: ${activos.join('  ·  ')}`
    : '';

  // ⚠️ Siempre resetear a página 1 al filtrar
  state.currentPage = 1;
  renderPage(state.filteredJobs, state.currentPage);
}

// ─────────────────────────────────────────────
// Event listeners
// ─────────────────────────────────────────────
filterLocation.addEventListener('change', applyFilters);
filterTechnology.addEventListener('change', applyFilters);
filterLevel.addEventListener('change', applyFilters);
filterInput.addEventListener('input', applyFilters);
