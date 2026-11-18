import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles}>
      <a href="/">
        <h1>
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </a>

      <nav>
        <a href="/">Inicio</a>
        <a href="/Search">Empleos</a>
      </nav>

      <div >
        <a href="">Publicar un empleo</a>
        <a href="">Iniciar sesión</a>
      </div>
    </header>
  )
}
