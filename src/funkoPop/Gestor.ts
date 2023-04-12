import fs from "fs";
import { Funko } from "./Funko.js";

/**
 * Clase que permite la gestión de ficheros
 */
export class Gestor {
  /**
   * Método que indica si el usuario existe o no
   * @param nombre Nombre del usuario
   * @returns Booleano que indica si existe
   */
  public static checkUserCreated(nombre: string): boolean {
    return fs.existsSync("./dataBase/" + nombre);
  }

  /**
   * Método que permite añadir un usuario
   * @param nombre Nombre del nuevo usuario
   */
  public static addUser(nombre: string): void {
    if (this.checkUserCreated(nombre)) {
      throw new Error("Existe un usuario con el mismo nombre");
    } else {
      fs.mkdirSync("./dataBase/" + nombre);
    }
  }

  /**
   * Método que permite eliminar usuarios
   * @param nombre NOmbre dek usuario a eliminar
   */
  public static deleteUser(nombre: string): void {
    if (this.checkUserCreated(nombre)) {
      fs.rmdirSync("./dataBase/" + nombre);
    } else {
      throw new Error("No existe usuario con ese nombre");
    }
  }

  /**
   * Método que devuelve la lista de usuarios
   * @returns Lista de usuarios
   */
  public static userList(): string[] {
    return fs.readdirSync("./dataBase");
  }

  /**
   * Método que permite saber si un funko está creado
   * @param nombre Nombre del usuario
   * @param id ID del funko del usuario
   * @returns Booleano que indica si está creado
   */
  public static checkFunkoCreated(nombre: string, id: number): boolean {
    return fs.existsSync("./dataBase/" + nombre + "/" + id + ".json");
  }

  /**
   * Método que permite añadir un funko a un usuario
   * @param nombre Nombre de usuario
   * @param funko Funko a añadir
   */
  public static addFunko(nombre: string, funko: Funko): void {
    if (!this.checkUserCreated(nombre)) {
      throw new Error(
        "No existe un usuario con ese nombre. Por favor, creerlo con --addUser."
      );
    }
    if (this.checkFunkoCreated(nombre, funko.id)) {
      throw new Error("Ya existe un funko con ese ID.");
    }
    const json = JSON.stringify(funko, null, 2);
    fs.writeFileSync("./dataBase/" + nombre + "/" + funko.id + ".json", json);
  }

  /**
   * Método que permite modificar un funko de un usuario
   * @param nombre Nombre de usuario
   * @param funko Funko a modificar
   */
  public static modFunko(nombre: string, funko: Funko): void {
    if (!this.checkUserCreated(nombre)) {
      throw new Error(
        "No existe un usuario con ese nombre. Por favor, creerlo con --addUser."
      );
    }
    if (!this.checkFunkoCreated(nombre, funko.id)) {
      throw new Error("No existe un funko con ese ID.");
    }
    const json = JSON.stringify(funko, null, 2);
    fs.writeFileSync("./dataBase/" + nombre + "/" + funko.id + ".json", json);
  }

  /**
   * Método que permite eliminar un funko de un usuario
   * @param nombre Nombre de usuario
   * @param id ID del Funko a eliminar
   */
  public static deleteFunko(nombre: string, id: number): void {
    if (this.checkFunkoCreated(nombre, id)) {
      fs.unlinkSync("./dataBase/" + nombre + "/" + id + ".json");
    } else {
      throw new Error("No existe funko con ese id.");
    }
  }

  /**
   * Método que permite leer un funko de un usuario
   * @param nombre Nombre de usuario
   * @param id ID del Funko a leer
   */
  public static readFunko(nombre: string, id: number): Funko {
    if (this.checkFunkoCreated(nombre, id)) {
      const json = JSON.parse(
        fs.readFileSync("./dataBase/" + nombre + "/" + id + ".json").toString()
      );
      const funko = new Funko(
        json._id,
        json._nombre,
        json._descripcion,
        json._tipo,
        json._genero,
        json._franquicia,
        json._numero,
        json._exclusivo,
        json._caracteristicasEsp,
        json._valor
      );
      funko.print();
      return funko;
    } else {
      throw new Error("No existe funko con ese id.");
    }
  }

  /**
   * Método que devuelve la lista de funkos de un usuario
   * @param nombre Nombre del usuario
   * @returns Lista de ficheros (ID's) que contienen funkos
   */
  public static funkoList(nombre: string): string[] {
    return fs.readdirSync("./dataBase/" + nombre);
  }
}
