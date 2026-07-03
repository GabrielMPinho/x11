export default function FeitaPorMotociclistas() {
  return (
    <div
      className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-[50px] items-center my-[70px] max-[980px]:[direction:ltr]"
      style={{ direction: 'rtl' }}
    >
      <img src="/images/institucional-quemsomos.jpg" alt="Feita por motociclistas" className="rounded" style={{ direction: 'ltr' }} />
      <div style={{ direction: 'ltr' }}>
        <span className="eyebrow">Quem Somos</span>
        <h2 className="text-[1.8rem]">Feita por motociclistas, para motociclistas.</h2>
        <p className="text-gray-1">A gente pilota. A gente entende. Cada decisão nasce da estrada — e volta para ela. Testamos cada
          equipamento em campo antes de colocá-lo na prateleira das lojas parceiras.</p>
      </div>
    </div>
  );
}
