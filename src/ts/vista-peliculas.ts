import { ControladorPeliculas } from "./controlador-peliculas";
export class VistaPeliculas {
  private HTML: any = {};

  constructor(private CFacturas: ControladorPeliculas) {
    this.alamcenarHtml();
  }

  public alamcenarHtml(): void {
    this.HTML.listaPendientes = document.querySelector(".js-lista-pendientes");
    this.HTML.listaVistas = document.querySelector(".js-lista-vistas");
    this.HTML.peliculasVistas = this.HTML.listaVistas.querySelectorAll("li.js-pelicula");
    this.HTML.peliculasPendiente = this.HTML.listaPendientes.querySelectorAll("li.js-pelicula");
    console.log(this.HTML);
  }

  public limpiarListado(pendiente: boolean): void {
    const listado = pendiente === true ? this.HTML.peliculasPendiente : this.HTML.peliculasVistas;
    for (const elemento of listado) {
      elemento.remove();
    }
  }
}
