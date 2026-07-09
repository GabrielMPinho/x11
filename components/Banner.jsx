import { Revela } from "../src/lib/Revela";

export default function Banner(){
    return(
        <section className="banner">
            <Revela as="div" id="texto_banner" distancia={32}>
                <h1>A MARCA MAIS DEMOCRÁTICA DO <br /> MOTOCILISMO BRASILEIRO</h1>
            </Revela>
        </section>
    )
}
