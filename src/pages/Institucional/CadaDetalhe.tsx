export default function CadaDetalhe() {
  return (
    <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-[50px] items-center my-[70px]">
      <div>
        <span className="eyebrow">Quem Somos</span>
        <h2 className="text-[1.8rem]">Cada detalhe pensado para a sua proteção.</h2>
        <p className="text-gray-1">Costuras reforçadas, ferragens metálicas, tecidos abrasion-tough e proteções CE posicionadas com
          precisão nos pontos de impacto. O resultado é equipamento que cumpre o que promete — na estrada
          e no laudo técnico.</p>
      </div>
      <img src="/images/institucional-detalhe.jpg" alt="Cada detalhe pensado" className="rounded" />
    </div>
  );
}
