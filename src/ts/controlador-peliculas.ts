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
  }

  private separarPeliculas(): void {
    this.peliculasVistas = this.peliculas.filter(p => p.vista === true);
    this.peliculasPendientes = this.peliculas.filter(p => p.vista === false);
  }

  public getPeliculasPorTipo(tipo: string): Pelicula[] {
    return tipo === "pendientes" ? this.peliculasPendientes : this.peliculasVistas;
  }

  public getNumeroPeliculasPorTipo(tipo: string): number {
    return tipo === "pendientes" ? this.peliculasPendientes.length : this.peliculasVistas.length;
  }

  public getPeliculaMasValorada(): Pelicula {
    return this.peliculas.sort(( peliculaA, peliculaB ) => peliculaB.valoracion - peliculaA.valoracion)[0];
  }

  public getPeliculaMasOrcars(): Pelicula {
    return this.peliculas.sort(( peliculaA, peliculaB ) => peliculaB.oscars - peliculaA.oscars)[0];
  }

  public getPeliculaMasActual(): Pelicula {
    let pelicula: Pelicula = this.peliculas[0];
    for (let i = 0; i < this.peliculas.length; i++) {
      if (pelicula.getCurrent(this.peliculas[i])) {
        pelicula = this.peliculas[i];
      }
    }
    return pelicula;
  }

  public getListadoDirectores(): string[] {
    return this.peliculas.map((pelicula) => pelicula.director).filter((elemento, indice, lista) => lista.indexOf(elemento) === indice);
  }

  public getPeliculasDirector(director: string): Pelicula[] {
    return this.peliculas.filter(pelicula => pelicula.director === director);
  }

}
