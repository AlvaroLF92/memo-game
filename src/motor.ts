import { Carta, DatosCarta, EstadoPartida, tablero, Tablero } from "./model";
import {
  deshabilitarCartasCallback,
  mostrarMensajeJugadorCallback,
  ponerBarajaEnDorso,
  voltearParejaNoCoincidente,
  cambiarImagen,
  tomarReferenciasContenedores,
  referenciasHtml,
  deshabilitarClickCarta,
  habilitarCartas,
  controlarVisualizacionBoton,
} from "./ui";

// Funcion principal que controla el flujo del juego

export const iteracionDeJuego = (divCarta: Element) => {
  const datosCarta: DatosCarta = tomarReferenciasContenedores(
    divCarta,
    tablero
  );

  const sePuedeVoltearCarta = sePuedeVoltearLaCarta(
    datosCarta?.index,
    referenciasHtml.mensajeJugador!
  );

  if (sePuedeVoltearCarta) voltearLaCarta(datosCarta);

  const sePuedeAlmacenarCarta = sePuedeAlmacenarLaCarta(datosCarta.index);
  if (sePuedeAlmacenarCarta) almacenarCarta(datosCarta.index);

  const estanDosCartasLevantadas = hayDosCartasLevantadas();
  if (estanDosCartasLevantadas) {
    const cartaA = tablero.indiceCartaVolteadaA!;
    const cartaB = tablero.indiceCartaVolteadaB!;

    const hayPareja = sonPareja(cartaA, cartaB);

    if (hayPareja) {
      parejaEncontrada(cartaA, cartaB, referenciasHtml.mensajeJugador!);

      const estaLaPartidaCompleta = esPartidaCompleta();
      if (estaLaPartidaCompleta) {
        terminarPartida(
          referenciasHtml.contenedoresCartas,
          referenciasHtml.mensajeJugador!
        );
      }
    } else {
      parejaNoEncontrada(cartaA, cartaB, referenciasHtml.mensajeJugador!);
    }
  }
};

// Funciones que marcan las reglas del juego

const cambiarEstadoPartida = (nuevoEstado: EstadoPartida) => {
  tablero.estadoPartida = nuevoEstado;
};

export const iniciaPartida = (
  tablero: Tablero,
  contendoresCartas: NodeListOf<Element>
): void => {
  cambiarEstadoPartida("CeroCartasLevantadas");
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.cartas.forEach((carta) => {
    carta.encontrada = false;
    carta.estaVuelta = false;
  });
  ponerBarajaEnDorso(contendoresCartas);
  tablero.cartas = barajarCartas(tablero.cartas);
  deshabilitarCartasCallback(contendoresCartas, false);
};

const barajarCartas = (array: Carta[]): Carta[] => {
  return array.sort(() => Math.random() - 0.5);
};

const sePuedeVoltearLaCarta = (
  indice: number,
  mensajeJugador: HTMLElement
): boolean => {
  if (tablero.cartas[indice].encontrada) {
    mostrarMensajeJugadorCallback(
      mensajeJugador,
      "Esta carta ya forma parte de una pareja",
      2000
    );
    return false;
  } else if (
    !tablero.cartas[indice].estaVuelta &&
    !tablero.cartas[indice].encontrada &&
    tablero.estadoPartida != "DosCartasLevantadas"
  )
    return true;
  else return false;
};

const voltearLaCarta = (datosCarta: DatosCarta): void => {
  const carta = tablero.cartas[datosCarta.index];
  carta.estaVuelta = !carta.estaVuelta;

  cambiarImagen(datosCarta);

  deshabilitarClickCarta(datosCarta);
};

const sePuedeAlmacenarLaCarta = (indiceCarta: number): boolean => {
  return (
    !tablero.cartas[indiceCarta].encontrada &&
    tablero.cartas[indiceCarta].estaVuelta
  );
};

const almacenarCarta = (indice: number): void => {
  switch (tablero.estadoPartida) {
    case "CeroCartasLevantadas":
      tablero.indiceCartaVolteadaA = indice;
      cambiarEstadoPartida("UnaCartaLevantada");

      break;
    case "UnaCartaLevantada":
      tablero.indiceCartaVolteadaB = indice;
      cambiarEstadoPartida("DosCartasLevantadas");

      break;
    default:
      break;
  }
};

const hayDosCartasLevantadas = (): boolean => {
  return tablero.estadoPartida === "DosCartasLevantadas";
};

const sonPareja = (indiceA: number, indiceB: number): boolean => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  return cartaA.idFoto === cartaB.idFoto ? true : false;
};

const parejaEncontrada = (
  indiceA: number,
  indiceB: number,
  mensajeJugador: HTMLElement
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.encontrada = true;
  cartaB.encontrada = true;

  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;

  cambiarEstadoPartida("CeroCartasLevantadas");
  mostrarMensajeJugadorCallback(mensajeJugador, "Las cartas son pareja", 2000);
  habilitarCartas(indiceA,indiceB)
};

const parejaNoEncontrada = (
  indiceA: number,
  indiceB: number,
  mensajeJugador: HTMLElement
): void => {

  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.estaVuelta = false;
  cartaB.estaVuelta = false;

  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;

  cambiarEstadoPartida("CeroCartasLevantadas");
  voltearParejaNoCoincidente(indiceA, indiceB);
  mostrarMensajeJugadorCallback(
    mensajeJugador,
    "Las cartas no son pareja",
    2000
  );
  habilitarCartas(indiceA,indiceB)
};

const esPartidaCompleta = (): boolean => {
  const estaLaPartidaCompleta = tablero.cartas.every(
    (carta) => carta.encontrada
  );
  return estaLaPartidaCompleta;
};

const terminarPartida = (
  contendoresCartas: NodeListOf<Element>,
  mensajeJugador: HTMLElement
): void => {
  cambiarEstadoPartida("PartidaCompleta");
  deshabilitarCartasCallback(contendoresCartas, true);
  mostrarMensajeJugadorCallback(
    mensajeJugador,
    "Enhorabuena , has completado la partida"
  );
  controlarVisualizacionBoton(false)
};
