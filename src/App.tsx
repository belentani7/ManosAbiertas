import './App.css'

const pathways = [
  {
    href: '/campus/index.html',
    title: 'Campus de aprendizaje',
    description: 'Lecciones, lecturas y práctica de alfabetización digital e IA.',
    label: 'Aprender',
  },
  {
    href: '/programas.html',
    title: 'Programas',
    description: 'Explora los itinerarios y elige un punto de partida útil.',
    label: 'Explorar',
  },
  {
    href: '/recursos.html',
    title: 'Recursos públicos',
    description: 'Guías para orientarte en gestiones y servicios del día a día.',
    label: 'Consultar',
  },
] as const

export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Manos Abiertas, inicio">MANOS <span>ABIERTAS</span></a>
        <nav aria-label="Navegación principal">
          <a href="/campus/index.html">Campus</a>
          <a href="/programas.html">Programas</a>
          <a href="/recursos.html">Recursos</a>
        </nav>
      </header>
      <main id="contenido">
        <section className="hero" aria-labelledby="inicio-titulo">
          <p className="eyebrow">Educación práctica · Acceso abierto</p>
          <h1 id="inicio-titulo">Aprender abre caminos.</h1>
          <p className="introduction">
            Manos Abiertas reúne formación digital, herramientas de empleo y recursos
            útiles para personas que necesitan empezar con claridad, sin barreras.
          </p>
          <a className="primary-link" href="/campus/index.html">Entrar al campus <span aria-hidden="true">↗</span></a>
        </section>
        <section className="pathways" aria-labelledby="rutas-titulo">
          <div className="section-heading">
            <p className="eyebrow">Elige tu próximo paso</p>
            <h2 id="rutas-titulo">Tres puertas. Un punto de partida.</h2>
          </div>
          <div className="pathway-grid">
            {pathways.map((item, index) => (
              <article className="pathway" key={item.href}>
                <span className="pathway-number" aria-hidden="true">0{index + 1}</span>
                <p className="pathway-label">{item.label}</p>
                <h3><a href={item.href}>{item.title}</a></h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p>Manos Abiertas · Educación gratuita y accesible.</p>
        <p>La formación no supone una certificación oficial.</p>
      </footer>
    </div>
  )
}
