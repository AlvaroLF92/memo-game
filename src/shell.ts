import {  tablero } from "./model";
import {
  iniciaPartida,
  iteracionDeJuego,
} from "./motor";
import {
  deshabilitarCartasCallback,
  referenciasHtml,
  mostrarMensajeJugadorCallback,
  ponerTextoBoton,
  controlarVisualizacionBoton,
} from "./ui";

// Iniciacion de la aplicación

document.addEventListener("DOMContentLoaded", () => {
  deshabilitarCartasCallback(referenciasHtml.contenedoresCartas, true);
  mostrarMensajeJugadorCallback(
    referenciasHtml.mensajeJugador!,
    "Pulsa 'Iniciar partida' para comenzar a jugar"
  );
});

// Evento para el botón iniciar partida

referenciasHtml.botonIniciarPartida?.addEventListener("click", () => {
  iniciaPartida(tablero, referenciasHtml.contenedoresCartas);
  ponerTextoBoton("Nueva Partida");
  mostrarMensajeJugadorCallback(
    referenciasHtml.mensajeJugador!,
    "!Buena Suerte¡",
    1500
  );
  controlarVisualizacionBoton(true)
});

// Evento para manejar la iteración del juego

referenciasHtml.contenedoresCartas.forEach((divCarta: Element) => {
  divCarta.addEventListener("click", () => {
    iteracionDeJuego(divCarta)
  });
});