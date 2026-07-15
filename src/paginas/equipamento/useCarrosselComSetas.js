import { useEffect, useRef, useState } from "react";
import { useMotionValue, animate } from "motion/react";
import { EASE } from "@/padrao/lib/motion";

// Mecanismo de carrossel com SETAS FUNCIONAIS + arraste — usado por
// CarrosselDetalhes ("DESTAQUES") e CombineSetup, únicos lugares do projeto
// onde as setas realmente controlam o trilho (decisão do Opus, ver backlog
// produto.md; a Home mantém setas decorativas — ver
// docs/agentes/sonnet/contexto/componentes.md). Mede o deslocamento máximo
// de verdade (`scrollWidth - clientWidth`, mesmo princípio do
// `CarrosselArrastavel` da Home) e anima o MESMO motionValue `x` tanto no
// clique das setas quanto no drag do usuário — os dois nunca ficam
// dessincronizados porque é o mesmo valor sendo lido/escrito nos dois casos.
//
// `arrastavel` (fix 2026-07-14, 1ª conferência do dono): o drag por toque
// só faz sentido no mobile/tablet — no desktop o dono quer SÓ setas, sem
// arraste de mouse. Mesmo critério do `useModoCarrossel` de `Destaques.jsx`
// (Home) pra separar desktop de touch: `matchMedia("(pointer:fine) and
// (min-width:1281px)")` — se bate, é desktop (`arrastavel=false`); senão,
// toque/tablet (`arrastavel=true`). Reage a mudança (resize, troca de
// dispositivo) via listener no matchMedia, igual ao padrão da Home.
export function useCarrosselComSetas() {
  const containerRef = useRef(null);
  const trilhoRef = useRef(null);
  const x = useMotionValue(0);
  const [maxArrasto, setMaxArrasto] = useState(0);
  const [arrastavel, setArrastavel] = useState(true);

  useEffect(() => {
    function medir() {
      if (!trilhoRef.current || !containerRef.current) return;
      setMaxArrasto(Math.max(trilhoRef.current.scrollWidth - containerRef.current.clientWidth, 0));
    }
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
    // Fix 2026-07-15: `arrastavel` como dependência — quando o autoplay
    // mobile passa a duplicar a lista de itens (ver CarrosselDetalhes/
    // CombineSetup), o `scrollWidth` do trilho muda SEM disparar um resize
    // de janela; sem remedir aqui, `maxArrasto` ficaria com o valor antigo.
  }, [arrastavel]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consulta = window.matchMedia("(pointer: fine) and (min-width: 1281px)");
    const atualizar = () => setArrastavel(!consulta.matches);
    atualizar();
    consulta.addEventListener("change", atualizar);
    return () => consulta.removeEventListener("change", atualizar);
  }, []);

  function mover(sentido) {
    if (!containerRef.current) return;
    const passo = containerRef.current.clientWidth * 0.9;
    const alvo = Math.min(0, Math.max(-maxArrasto, x.get() + sentido * -passo));
    // Tween com a curva EASE do projeto (fix 2026-07-14, 2ª conferência do
    // dono: a mola rígida `{stiffness:300,damping:32}` ficava "seca" — fora
    // do tom do resto do site, que usa `EASE`/tweens no lugar de mola.
    animate(x, alvo, { duration: 0.6, ease: EASE });
  }

  return {
    containerRef,
    trilhoRef,
    x,
    arrastavel,
    dragConstraints: { left: -maxArrasto, right: 0 },
    avancar: () => mover(1),
    voltar: () => mover(-1),
  };
}
