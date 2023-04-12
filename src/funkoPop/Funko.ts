import chalk from "chalk";
import { Generos } from "./Generos.js";
import { Tipos } from "./Tipos.js";

/**
 * Clase que permite almacenar los datos de un Funko
 */
export class Funko {
  /**
   * Constructor de la clase funko
   * @param _id ID del funko
   * @param _nombre Nombre del funko
   * @param _descripcion Pequeña descripción
   * @param _tipo Tipo de funko
   * @param _genero Género del funko
   * @param _franquicia Franquicia
   * @param _numero Número de la colección
   * @param _exclusivo Estatus de exclusividad
   * @param _caracteristicasEsp Características especiales
   * @param _valor Valor monetario
   */
  constructor(
    private _id: number,
    private _nombre: string,
    private _descripcion: string,
    private _tipo: Tipos,
    private _genero: Generos,
    private _franquicia: string,
    private _numero: number,
    private _exclusivo: boolean,
    private _caracteristicasEsp: string | undefined,
    private _valor: number
  ) {
    if (
      /\.|-/.test(_id.toString()) === true ||
      _id === undefined ||
      _id === 0
    ) {
      throw new Error("El ID del funko debe ser un número entero positivo");
    }
    if (/\.|-/.test(_numero.toString()) === true || _numero === undefined) {
      throw new Error("El número de serie debe ser un número entero positivo");
    }
    if (_valor <= 0 || _valor === undefined) {
      throw new Error("El valor del funko rdebe ser un número positivo");
    }
    if (_nombre === undefined || _nombre === "") {
      throw new Error("El funko debe de tener nombre");
    }
    if (_descripcion === undefined || _descripcion === "") {
      throw new Error("El funko debe de tener descripcion");
    }
    if (_tipo === undefined) {
      throw new Error("El funko debe de tener tipo");
    }
    if (_genero === undefined) {
      throw new Error("El funko debe de tener genero");
    }
    if (_franquicia === undefined || _franquicia === "") {
      throw new Error("El funko debe de tener franquicia");
    }
    if (_exclusivo === undefined) {
      throw new Error(
        "El funko debe de dejar clara su condición de exclusividad"
      );
    }
  }

  /**
   * Getter del ID
   */
  get id() {
    return this._id;
  }

  /**
   * Setter del ID
   */
  set id(id) {
    if (/\.|-/.test(id.toString()) === true || id === undefined || id === 0) {
      throw new Error("El ID debe ser un número entero positivo");
    }
    this._id = id;
  }

  /**
   * Getter del nombre
   */
  get nombre() {
    return this._nombre;
  }

  /**
   * Setter del nombre
   */
  set nombre(nombre) {
    if (nombre === undefined || nombre === "") {
      throw new Error("El funko debe de tener nombre");
    }
    this._nombre = nombre;
  }

  /**
   * Getter del tipo
   */
  get tipo() {
    return this._tipo;
  }

  /**
   * Setter del tipo
   */
  set tipo(tipo) {
    if (tipo === undefined) {
      throw new Error("El funko debe de tener tipo");
    }
    this._tipo = tipo;
  }

  /**
   * Getter de la descripción
   */
  get descripcion() {
    return this._descripcion;
  }

  /**
   * Setter de la descripción
   */
  set descripcion(descripcion) {
    if (descripcion === undefined || descripcion === "") {
      throw new Error("El funko debe de tener descripcion");
    }
    this._descripcion = descripcion;
  }

  /**
   * Getter del genero
   */
  get genero() {
    return this._genero;
  }

  /**
   * Setter del genero
   */
  set genero(genero) {
    if (genero === undefined) {
      throw new Error("El funko debe de tener genero");
    }
    this._genero = genero;
  }

  /**
   * Getter de la franquicia
   */
  get franquicia() {
    return this._franquicia;
  }

  /**
   * Setter de la franquicia
   */
  set franquicia(franquicia) {
    if (franquicia === undefined || franquicia === "") {
      throw new Error("El funko debe de tener franquicia");
    }
    this._franquicia = franquicia;
  }

  /**
   * Getter del numero
   */
  get numero() {
    return this._numero;
  }

  /**
   * Setter del numero
   */
  set numero(numero) {
    if (/\.|-/.test(numero.toString()) === true || numero === undefined) {
      throw new Error("El número de serie debe ser un número entero positivo");
    }
    this._numero = numero;
  }

  /**
   * Getter de la flag de exclusividad
   */
  get exclusivo() {
    return this._exclusivo;
  }

  /**
   * Setter de la flag de exclusividad
   */
  set exclusivo(exclusivo) {
    if (exclusivo === undefined) {
      throw new Error(
        "El funko debe de dejar clara su condición de exclusividad"
      );
    }
    this._exclusivo = exclusivo;
  }

  /**
   * Getter de la característica especial
   */
  get caracteristicasEsp() {
    return this._caracteristicasEsp;
  }

  /**
   * Setter de la característica especial
   */
  set caracteristicasEsp(caracteristicasEsp) {
    this._caracteristicasEsp = caracteristicasEsp;
  }

  /**
   * Getter del valor
   */
  get valor() {
    return this._valor;
  }

  /**
   * Setter del valor
   */
  set valor(valor) {
    if (valor < 0 || valor === undefined) {
      throw new Error("El valor del funko rdebe ser un número positivo");
    }
    this._valor = valor;
  }

  /**
   * Método que permite imprimir la información del funko
   * @returns String que contiene lo que se imprimirá
   */
  print(): string {
    let str = "";
    str += `ID = ${this._id}`;
    console.log(chalk.blue(`ID =`) + ` ${this._id}`);
    str += `\nNombre = ${this._nombre}`;
    console.log(chalk.blue(`Nombre =`) + ` ${this._nombre}`);
    str += `\nDescripción = ${this._descripcion}`;
    console.log(chalk.blue(`Descripción =`) + ` ${this._descripcion}`);
    str += `\nTipo = ${this._tipo}`;
    console.log(chalk.blue(`Tipo =`) + ` ${this._tipo}`);
    str += `\nGénero = ${this._genero}`;
    console.log(chalk.blue(`Género =`) + ` ${this._genero}`);
    str += `\nFranquicia = ${this._franquicia}`;
    console.log(chalk.blue(`Franquicia =`) + ` ${this._franquicia}`);
    str += `\nNúmero de colección = ${this._numero}`;
    console.log(chalk.blue(`Número de colección =`) + ` ${this._numero}`);
    str += `\n¿Exlusivo? = ${this._exclusivo}`;
    console.log(chalk.blue(`¿Exlusivo? =`) + ` ${this._exclusivo}`);
    if (
      this._caracteristicasEsp !== undefined &&
      this._caracteristicasEsp !== ""
    ) {
      str += `\nCaracterísticas Especiales = ${this._caracteristicasEsp}`;
      console.log(
        chalk.blue(`Características Especiales =`) +
          ` ${this._caracteristicasEsp}`
      );
    }
    str += `\nValor = ${this._valor}`;
    if (this._valor < 15) {
      console.log(chalk.blue(`Valor = `) + chalk.red(`${this._valor}`));
    } else if (this._valor < 30) {
      console.log(chalk.blue(`Valor = `) + chalk.magenta(`${this._valor}`));
    } else if (this._valor < 50) {
      console.log(chalk.blue(`Valor = `) + chalk.yellow(`${this._valor}`));
    } else {
      console.log(chalk.blue(`Valor = `) + chalk.green(`${this._valor}`));
    }
    return str;
  }
}
