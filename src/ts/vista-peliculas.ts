import { ControladorPeliculas } from "./controlador-peliculas";
import { Formatos } from "./datos/enum-formatos-pelicula";
import { Pelicula } from "./datos/pelicula";

export class VistaPeliculas {
  private HTML: any = {};

  constructor(private CPeliculas: ControladorPeliculas) {
    this.alamcenarHtml();
    this.pintarLista("pendientes");
    this.pintarLista("vistas");
    this.pintarNumeroPeliculas("pendientes");
    this.pintarNumeroPeliculas("vistas");
    this.pintarEstadisticas();
    this.pintarDirectores();
  }

  private alamcenarHtml(): void {
    this.HTML.listaPendientes = document.querySelector(".js-lista-pendientes");
    this.HTML.listaVistas = document.querySelector(".js-lista-vistas");
    this.HTML.peliculasVistas = this.HTML.listaVistas.querySelectorAll("li.js-pelicula");
    this.HTML.peliculasPendientes = this.HTML.listaPendientes.querySelectorAll("li.js-pelicula");
    this.HTML.basePelicula = document.querySelector(".js-pelicula-base");
    this.HTML.peliculaMejorValorada = document.querySelector(".js-mejor-valorada");
    this.HTML.peliculaMasOscars = document.querySelector(".js-mas-oscars");
    this.HTML.peliculaMasReciente = document.querySelector(".js-mas-reciente");
    this.HTML.listaDirectores = document.querySelector(".js-lista-directores");
    this.HTML.baseDirector = document.querySelector(".js-director-base");
    this.HTML.basePeliculasDirector = document.querySelector(".js-pelicula-director-base");
  }

  private limpiarListado(pendientes: boolean): void {
    const listado = pendientes === true ? this.HTML.peliculasPendientes : this.HTML.peliculasVistas;
    for (const elemento of listado) {
      elemento.remove();
    }
  }

  private pintarLista(tipoLista: string): void {
    const borrarLista = tipoLista === "pendientes" ? true : false;
    const lista = (tipoLista === "pendientes" ? this.HTML.listaPendientes : this.HTML.listaVistas) as HTMLElement;
    this.limpiarListado(borrarLista);
    for (const pelicula of this.CPeliculas.getPeliculasPorTipo(tipoLista)) {
      const nuevoElemento = this.HTML.basePelicula.cloneNode(true);
      nuevoElemento.querySelector(".js-titulo").textContent = pelicula.titulo;
      nuevoElemento.querySelector(".js-director").textContent = pelicula.director;
      nuevoElemento.querySelector(".js-cartel").setAttribute("src", pelicula.cartel);
      nuevoElemento.querySelector(".js-cartel").setAttribute("alt", pelicula.titulo);
      nuevoElemento.querySelector(".js-cartel").setAttribute("title", pelicula.titulo);
      nuevoElemento.querySelector(".js-anyo").textContent = pelicula.getYear();
      nuevoElemento.querySelector(".js-valoracion").dataset.puntos = pelicula.vista ? pelicula.valoracion : "";
      if (pelicula.oscars === 0) {
        nuevoElemento.querySelector(".js-oscars").remove();
      }
      switch (pelicula.formato) {
        case Formatos.DVD:
          nuevoElemento.querySelector(".js-formato-dvd").classList.remove("hide");
          break;
        case Formatos.VHS:
          nuevoElemento.querySelector(".js-formato-vhs").classList.remove("hide");
          break;
        case Formatos.archivo:
          nuevoElemento.querySelector(".js-formato-archivo").classList.remove("hide");
          break;
      }
      for (let i = 1; i <= 5; i++) {
        nuevoElemento.querySelector(`.js-valoracion-${i}`).classList.remove("glyphicon-star", "glyphicon-star-empty");
        if (pelicula.vista){
            if (i <= pelicula.valoracion){
              nuevoElemento.querySelector(`.js-valoracion-${i}`).classList.add("glyphicon-star");
            } else {
              nuevoElemento.querySelector(`.js-valoracion-${i}`).classList.add("glyphicon-star-empty");
            }
        } else {
          nuevoElemento.querySelector(`.js-valoracion-${i}`).classList.add("glyphicon-star-empty");
        }

      }
      lista.appendChild(nuevoElemento);
    }
  }

  private pintarNumeroPeliculas(tipo: string ): void {
    const numeroPeliculas = this.CPeliculas.getNumeroPeliculasPorTipo(tipo);
    document.querySelector(`.js-n-peliculas-${tipo}`).textContent = `${numeroPeliculas}`;
  }

  private pintarEstadisticas(): void {
    const mainHTML = this.HTML;
    const peliculas = this.CPeliculas;
    this.pintarBaseEstadisticas(mainHTML.peliculaMejorValorada, peliculas.getPeliculaMasValorada());
    this.pintarBaseEstadisticas(mainHTML.peliculaMasOscars, peliculas.getPeliculaMasOrcars());
    this.pintarBaseEstadisticas(mainHTML.peliculaMasReciente, peliculas.getPeliculaMasActual());
  }

  private pintarBaseEstadisticas(elemento: HTMLElement, pelicula: Pelicula): void {
    elemento.querySelector(".js-cartel").setAttribute("src", pelicula.cartel);
    elemento.querySelector(".js-cartel").setAttribute("alt", pelicula.titulo);
    elemento.querySelector(".js-cartel").setAttribute("title", pelicula.titulo);
    elemento.querySelector(".js-titulo").textContent = pelicula.titulo;
  }

  private limpiarDirectores(): void {
    for (const element of this.HTML.listaDirectores.querySelectorAll("li")) {
      element.remove();
    }
  }
  private pintarDirectores(): void {
    this.limpiarDirectores();
    const listaDirectores = this.HTML.listaDirectores as HTMLElement;

    for (const director of this.CPeliculas.getListadoDirectores()) {
      const nuevoBaseDirector = this.HTML.baseDirector.cloneNode(true);
      listaDirectores.appendChild(nuevoBaseDirector);
      nuevoBaseDirector.querySelector(".js-director").textContent = director;
      for (const pelicula of this.CPeliculas.getPeliculasDirector(director)) {
        const nuevoBasePeliculasDirector = this.HTML.basePeliculasDirector.cloneNode(true);
        nuevoBasePeliculasDirector.querySelector(".js-titulo").textContent = pelicula.titulo;
        nuevoBasePeliculasDirector.querySelector(".js-anyo").textContent = pelicula.getYear();
        nuevoBaseDirector.querySelector(".js-lista-peliculas-directores").appendChild(nuevoBasePeliculasDirector);
      }
    }
  }
}
