const itemClass = 'border-t-[3px] border-orange pt-4';
const itemH4 = 'text-[0.95rem]';
const itemP = 'text-gray-2 text-[0.85rem]';

export default function DiferenciaisIcons() {
  return (
    <div className="grid grid-cols-4 max-[980px]:grid-cols-2 gap-6 mt-10">
      <div className={itemClass}>
        <h4 className={itemH4}>Segurança Certificada</h4>
        <p className={itemP}>Proteções CE Nível 1 e 2, materiais homologados e testes que vão além da norma.</p>
      </div>
      <div className={itemClass}>
        <h4 className={itemH4}>Tecnologia Acessível</h4>
        <p className={itemP}>Inovação no produto, preço justo na etiqueta. Alta performance sem ser inalcançável.</p>
      </div>
      <div className={itemClass}>
        <h4 className={itemH4}>Para Todo Estilo</h4>
        <p className={itemP}>Sport, Adventure, Urbano e Touring. O equipamento certo para a sua pilotagem.</p>
      </div>
      <div className={itemClass}>
        <h4 className={itemH4}>Expert Riders</h4>
        <p className={itemP}>Uma comunidade nacional de motociclistas que escolheu andar com a gente.</p>
      </div>
    </div>
  );
}
