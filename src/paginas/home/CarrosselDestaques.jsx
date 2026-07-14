import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { destaques } from "@/paginas/home/dados/destaques";

// Razão scroll↔movimento (polimento 2026-07-10): a altura fixa de 300vh
// dava ~4× o deslocamento real do trilho (medido ~446px em 1440px contra
// ~1800px de pin) — rolava muito, o card andava pouco, sensação de
// "travado/pesado". Reduzido de novo (2026-07-10, feedback do dono: "mais
// rápido") — menos rolagem por pixel de movimento.
const FATOR_ALTURA_PIN = 1.15;

// Fração do pin em que o trilho TERMINA de andar (assenta no último card) —
// o resto do pin (até 1) é folga: o usuário ainda rola um pouco com o
// último produto já visível antes de o scroll "soltar" a seção. Sem isso,
// o carrossel `acabava exatamente quando o último produto era lançado`
// (feedback do dono) — o `x` ia direto de [0,1]→[0,-deslocamento], então o
// fim do movimento SEMPRE coincidia com o fim do pin.
const FIM_MOVIMENTO = 0.82;

// Isolado do componente pai (Destaques.jsx) de propósito (fix 2026-07-10):
// `useScroll({ target })` precisa que o ref já esteja anexado no PRIMEIRO
// render do componente que o chama — se o pai renderiza primeiro com
// `ref.current === null` (fallback) e só troca pro carrossel depois do
// mount, o Framer não re-vincula esse useScroll ao alvo que passou a
// existir depois; o `scrollYProgress` fica travado em 0 pra sempre (pin
// funcionava porque `position:sticky` é só CSS, mas o `x` do trilho nunca
// saía do lugar). Como este componente só é renderizado QUANDO o modo
// carrossel já está decidido (ver Destaques.jsx), seu <section ref> já
// existe no 1º render dele — useScroll inicializa vinculado certo.
export default function CarrosselDestaques(){
    const secaoRef = useRef(null);
    const trilhoRef = useRef(null);
    // Sem offset (igual à referência do dono): progresso 0→1 cobre a
    // passagem do <section> inteira pela viewport — é isso que dá o "pin"
    // (agora proporcional ao deslocamento, não mais 300vh fixo) enquanto o
    // trilho anda.
    const { scrollYProgress } = useScroll({ target: secaoRef });

    // Suaviza o progresso (polimento 2026-07-10): `x` direto do scroll era
    // 1:1 e rígido/duro. `useSpring` faz o trilho deslizar — fluido mas
    // ainda responsivo (não "flutuante"), assenta no alvo ao parar de rolar.
    // Rigidez/massa ajustadas de novo (feedback do dono: "mais limpo/mais
    // rápido") — segue a rolagem com menos atraso perceptível, sem virar
    // brusco (damping alto o bastante pra nunca passar do alvo e voltar).
    const progressoSuave = useSpring(scrollYProgress, { stiffness: 200, damping: 26, mass: 0.3 });

    // Desloca o trilho até o ÚLTIMO card encostar quase na borda direita da
    // viewport (com uma folga de "meio card" sobrando) — medido de verdade
    // (não um "%" chutado, que só bate pra uma contagem/largura específica
    // de card). A folga é somada aqui, direto no valor medido, não no CSS.
    // Folga = metade da largura REAL do card, medida em runtime (2026-07-14,
    // "Escala proporcional do desktop 1024→1440") — antes era um px fixo
    // (170 = 340÷2), mas `.card_carrossel` agora escala com a largura da
    // janela (`calc(340 * var(--u))`); um valor fixo ficaria errado em
    // qualquer largura abaixo de 1440. `firstElementChild?.offsetWidth`
    // já reflete o tamanho renderizado (escalado) do card.
    const [deslocamento, setDeslocamento] = useState(0);
    useEffect(() => {
        function medir() {
            if (!trilhoRef.current) return;
            const larguraViewport = trilhoRef.current.parentElement?.clientWidth ?? window.innerWidth;
            const larguraTrilho = trilhoRef.current.scrollWidth;
            const larguraCard = trilhoRef.current.firstElementChild?.offsetWidth ?? 0;
            setDeslocamento(Math.max(larguraTrilho - larguraViewport, 0) + larguraCard / 2);
        }
        medir();
        window.addEventListener("resize", medir);
        return () => window.removeEventListener("resize", medir);
    }, []);

    const x = useTransform(progressoSuave, [0, FIM_MOVIMENTO], [0, -deslocamento]);

    // Altura da seção proporcional ao deslocamento medido (não mais 300vh
    // fixo) — pin ≈ 100vh (a tela pinada) + deslocamento×fator de rolagem
    // extra pra percorrer o trilho inteiro numa velocidade natural.
    const alturaSecao = `calc(100vh + ${Math.round(deslocamento * FATOR_ALTURA_PIN)}px)`;

    return (
        <section className="destaques destaques_carrossel" ref={secaoRef} style={{ height: alturaSecao }}>
            <div className="destaques_pin">
                <div className="cabecalho_carrossel_destaques">
                    <p className="p_laranja">OS MAIS PROCURADOS</p>
                    <h3>OS MAIS VENDIDOS</h3>
                </div>
                <motion.div className="trilho_carrossel" ref={trilhoRef} style={{ x }}>
                    {destaques.map((produto, index) => (
                        <div className="card_produto card_carrossel" key={index}>
                            <div className="zoom_imagem">
                                <img src={produto.imagem} alt="imagem produto destaque" className="imagem_produto_destaque" />
                            </div>
                            <p className="titulo_produto_destaque">{produto.titulo}</p>
                            <p className="preco_produto_destaque">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
