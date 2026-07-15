import { useEffect, useState } from "react";

// Breakpoint compartilhado dos ajustes "mobile-only" (reveal por elemento,
// autoplay de carrossel, sem setas) — mesmo limiar da escala desktop
// 1024→1440 (ver tokens.css/convencoes.md): ≤1023px é o design responsivo,
// ≥1024px é desktop/laptop (escalado ou não). Padrão de matchMedia+
// useEffect igual ao useModoCarrossel (Destaques.jsx).
export function useEhMobile() {
    const consultaInicial = typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)") : null;
    const [ehMobile, setEhMobile] = useState(consultaInicial ? consultaInicial.matches : false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const consulta = window.matchMedia("(max-width: 1023px)");
        const atualizar = () => setEhMobile(consulta.matches);
        atualizar();
        consulta.addEventListener("change", atualizar);
        return () => consulta.removeEventListener("change", atualizar);
    }, []);

    return ehMobile;
}
