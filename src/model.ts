import img1 from "./assets/pngs/1.png";
import img2 from "./assets/pngs/2.png";
import img3 from "./assets/pngs/3.png";
import img4 from "./assets/pngs/4.png";
import img5 from "./assets/pngs/5.png";
import img6 from "./assets/pngs/6.png";

export type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

export interface DatosCarta {
  index: number;
  carta: Carta;
  divImagen: HTMLImageElement;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const infoCartas: InfoCarta[] = [
  { idFoto: 1, imagen: img1 },
  { idFoto: 2, imagen: img2 },
  { idFoto: 3, imagen: img3 },
  { idFoto: 4, imagen: img4 },
  { idFoto: 5, imagen: img5 },
  { idFoto: 6, imagen: img6 },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  let arrayDuplicado = [...infoCartas, ...infoCartas];

  const nuevoArrayDeCartas = arrayDuplicado.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  );

  return nuevoArrayDeCartas;
};
const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

export let tablero: Tablero = crearTableroInicial();
