import { useId, useState } from "react"
import styles from './SearchFormSection.module.css'

export function SearchFormSection({ onTextFilter, textToFilter, onFilterChange, filters }) {
  const [isFocused, setIsFocused] = useState(false)

  const idText = useId()
  const idTecnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const handleTextChange = (event) => {
    const text = event.target.value
    onTextFilter(text)
  }

  const handleFilterChange = (event) => {
    const field = event.target.dataset.field
    const value = event.target.value
    onFilterChange(field, value)
  }


  return (
    <section className={styles["jobs-search"]}>
      <h1>Encuentra tu proximo trabajo </h1>
      <p>Explora miles de oportunidades en el sector tecnológico</p>

      <form id="empleos-search-from" role="search" className={styles}>
        <div className={styles["search-bar"]}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>



          <input
            name={idText}
            id="empleos-search-input"
            type="text"
            placeholder="Buscar empleos..."
            value={textToFilter}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleTextChange}
          />

        </div>

        {isFocused && <p className={styles["focus-active"]} >Escribe el nombre del empleo</p>}

        <div className={styles["search-filters"]}>
          <select name={idTecnology} data-field="technology" value={filters.technology} id="filter-technology" onChange={handleFilterChange}>
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
            <option value="css">Css</option>
          </select>

          <select name={idLocation} data-field="location" value={filters.location} id="filter-location" onChange={handleFilterChange}>
            <option value="">Ubicacion</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idExperienceLevel} data-field="experienceLevel" value={filters.experienceLevel} id="filter-experience-level" onChange={handleFilterChange}>
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      <span className={styles["filter-selected-value"]}>
        {filters.technology && (
          <span onClick={() => onFilterChange('technology', '')}>
            ⚙️{filters.technology} ❌
          </span>
        )}

        {filters.location && (
          <span onClick={() => onFilterChange('location', '')}>
            📍 {filters.location} ❌
          </span>
        )}

        {filters.experienceLevel && (
          <span onClick={() => onFilterChange('experienceLevel', '')}>
            🎯 {filters.experienceLevel} ❌
          </span>
        )}
      </span>
    </section>
  )
}