import styles from './JobListings.module.css'
import { JobCard } from './JobCard.jsx'
import { useEffect } from 'react'

export function JobListings({ filteredJobs, jobs }) {

  useEffect(() => {
    console.log(filteredJobs)
  }, [filteredJobs])

  return (
    <>
      <div className={styles["results-header"]}>
        <h2 className={styles["titulo-resulatados"]}>Resultados de búsqueda</h2>
        <span className={styles["results-count"]} id="results-count">Mostrando {filteredJobs.length} empleos</span>
      </div>

      {jobs.length === 0 ? (
        <div className="no-results jobs-listings">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <p>No se encontraron empleos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className={styles["jobs-listings"]}>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  )
}