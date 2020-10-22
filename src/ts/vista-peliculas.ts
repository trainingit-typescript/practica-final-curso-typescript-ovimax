import { ControladorPeliculas } from "./controlador-peliculas";
import { Formatos } from "./datos/enum-formatos-pelicula";

export class VistaPeliculas {
  private HTML: any = {};

  constructor(private CPeliculas: ControladorPeliculas) {
    this.alamcenarHtml();
    this.pintarLista("pendientes");
    this.pintarLista("vistas");
  }

  private alamcenarHtml(): void {
    this.HTML.listaPendientes = document.querySelector(".js-lista-pendientes");
    this.HTML.listaVistas = document.querySelector(".js-lista-vistas");
    this.HTML.peliculasVistas = this.HTML.listaVistas.querySelectorAll("li.js-pelicula");
    this.HTML.peliculasPendientes = this.HTML.listaPendientes.querySelectorAll("li.js-pelicula");
    this.HTML.basePelicula = document.querySelector(".js-pelicula-base");
    console.log(this.HTML);
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
      if(pelicula.oscars === 0){
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
      lista.appendChild(nuevoElemento);
    }
  }
}
