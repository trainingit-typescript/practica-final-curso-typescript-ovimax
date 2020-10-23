import {Pelicula} from "./datos/pelicula";
import * as BBDD from "./peliculas.json";

export class ControladorPeliculas {
  private peliculas: Pelicula[] = [];
  private peliculasVistas: Pelicula[] = [];
  private peliculasPendientes: Pelicula[] = [];

  constructor() { }

  public almacenarPeliculas(): void {
    for (const pelicula of BBDD.peliculas) {
      const nuevaPelicula: Pelicula = new Pelicula(
        pelicula.id,
        pelicula.titulo,
        pelicula.director,
        pelicula.fecha,
        pelicula.cartel,
        pelicula.vista,
        pelicula.formato,
        pelicula.valoracion,
        pelicula.oscars,
      );
      this.peliculas.push(nuevaPelicula);
    }
    this.separarPeliculas();
    console.log(this.peliculasPendientes);
  }

  private separarPeliculas(): void {
    this.peliculasVistas = this.peliculas.filter(p => p.vista === true);
    this.peliculasPendientes = this.peliculas.filter(p => p.vista === false);
  }

  public getPeliculasPorTipo(tipo: string): Pelicula[] {
    return tipo === "pendientes" ? this.peliculasPendientes : this.peliculasVistas;
  }

  public getNumeroPeliculasPorTipo(tipo:string): number {
    return tipo === "pendientes" ? this.peliculasPendientes.length : this.peliculasVistas.length;
  }

}
