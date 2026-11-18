import styles from './JobCard.module.css'
import { useState } from "react"

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false)

  const handelApplyClick = () => {
    setIsApplied(true)
  }

  const buttonClases = isApplied ? 'button-apply-job is-applied' : 'button-apply-job';
  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'


  return (
    <article
      className={styles["job-listing-card"]}
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-tecnologia={job.data.tecnologia}
    >
      <div >
        <h3>{job.titulo}</h3>
        <small>{job.empresa} | {job.data.modalidad} | {job.data.nivel}</small>
        <p>{job.descripcion}</p>
      </div>
      <button className={buttonClases} onClick={handelApplyClick}>{buttonText}</button>

    </article>
  )
}