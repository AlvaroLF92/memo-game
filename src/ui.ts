import { DatosCarta, Tablero } from "./model";

export const referenciasHtml = {
  contenedoresCartas: document.querySelectorAll(".card-container"),
  botonIniciarPartida: document.getElementById("comenzar-partida"),
  mensajeJugador: document.getElementById("mensajeJugador"),
};

export const tomarReferenciasContenedores = (
  divCarta: Element,
  tablero: Tablero
): DatosCarta => {
  const indexDiv = divCarta.getAttribute("data-index-id");
  const imageIndex = divCarta
    .querySelector("img")
    ?.getAttribute("data-image-index");

  if (!indexDiv || !imageIndex) {
    throw new Error("No se han podido encontrar los elementos del DOM");
  }

  const index = parseInt(indexDiv);
  const divImagen = divCarta.querySelector("img")!;
  const carta = tablero.cartas[parseInt(imageIndex)];
  return { index, divImagen, carta };
};

export const mostrarMensajeJugadorCallback = (
  mensajeJugador: HTMLElement,
  mensaje: string,
  duracion?: number
): void => {
  mensajeJugador.textContent = mensaje;
  if (duracion) {
    setTimeout(() => {
      mensajeJugador.textContent = "";
    }, duracion);
  }
};

export const ponerTextoBoton = (texto: string): void => {
  referenciasHtml.botonIniciarPartida!.textContent = texto;
};

export const controlarVisualizacionBoton = (deshabilitar: boolean) => {
  if (deshabilitar) {
    referenciasHtml.botonIniciarPartida!.style.visibility = "hidden"
  } else referenciasHtml.botonIniciarPartida!.style.visibility = "visible"
  
}

export const deshabilitarCartasCallback = (
  contendoresCartas: NodeListOf<Element>,
  deshabilitar: Boolean
) => {
  contendoresCartas.forEach((div) => {
    deshabilitar
      ? div.classList.add("disable-cards")
      : div.classList.remove("disable-cards");
  });
};

export const deshabilitarClickCarta = (datosCarta : DatosCarta) => {
  const contenedorCarta = referenciasHtml.contenedoresCartas[datosCarta.index] as HTMLElement;
  contenedorCarta.style.pointerEvents = "none";
}

export const habilitarCartas = (indiceA : number , indiceB : number) => {
  const contenedorCartaA = referenciasHtml.contenedoresCartas[indiceA] as HTMLElement;
  const contenedorCartaB = referenciasHtml.contenedoresCartas[indiceB] as HTMLElement;
  contenedorCartaA.style.pointerEvents = "auto";
  contenedorCartaB.style.pointerEvents = "auto";
}

export const ponerBarajaEnDorso = (
  contendoresCartas: NodeListOf<Element>
): void => {
  contendoresCartas.forEach((div) => {
    const imagen = div.querySelector("img");
    if (imagen) imagen.src = "./src/assets/pngs/0.png";
  });
};

export const cambiarImagen = (datosCarta: DatosCarta): void => {
  datosCarta.divImagen.src = datosCarta.carta.imagen;
};

export const voltearParejaNoCoincidente = (
  indiceA: number,
  indiceB: number
): void => {
  setTimeout(() => {
    const divA = document.querySelector(
      `[data-index-id="${indiceA}"]`
    ) as HTMLElement;
    const divB = document.querySelector(
      `[data-index-id="${indiceB}"]`
    ) as HTMLElement;
    const imagenA = divA?.querySelector("img");
    const imagenB = divB?.querySelector("img");
    if (imagenA && imagenB) {
      imagenA.src = "./src/assets/pngs/0.png";
      imagenB.src = "./src/assets/pngs/0.png";
    }
  }, 750);
};
