import * as moment from "moment";
import {Formatos} from "./enum-formatos-pelicula";
import {Valoracion} from "./type-valoracion-pelicula";

export class Pelicula {
  public formato: Formatos;
  public valoracion: Valoracion;
  private fecha: moment.Moment;

  constructor(
    public id: number,
    public titulo: string,
    public director: string,
    fecha: string,
    public cartel: string,
    public vista: boolean,
    formato: string,
    valoracion: number,
    public oscars: number,
  ) {
    this.valoracion = valoracion as Valoracion;
    this.formato = Formatos[formato];
    this.fecha = moment(fecha, "YYYY-MM-DD");
  }

  public getYear(): string {
    return this.fecha.year().toString();
  }
}
