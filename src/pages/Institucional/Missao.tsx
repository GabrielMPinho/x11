export default function Missao() {
  return (
    <section
      className="quote-banner section-alt"
      style={{ backgroundImage: "url('/images/institucional-quote.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
      <div className="container" style={{ position: 'relative' }}>
        <span className="eyebrow">Missão</span>
        <h2>"Ir além em segurança. Cada um em seu estilo."</h2>
        <p style={{ color: 'var(--gray-1)' }}>X11 — Expert Riders</p>
      </div>
    </section>
  );
}
