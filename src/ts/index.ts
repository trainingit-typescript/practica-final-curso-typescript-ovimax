import {ControladorPeliculas} from "./controlador-peliculas";
import {VistaPeliculas} from "./vista-peliculas";

const CntrPeliculas = new ControladorPeliculas();
CntrPeliculas.almacenarPeliculas();

const viewer = new VistaPeliculas(CntrPeliculas);
