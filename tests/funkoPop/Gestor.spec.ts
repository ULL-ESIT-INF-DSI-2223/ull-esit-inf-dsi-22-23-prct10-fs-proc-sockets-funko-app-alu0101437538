import "mocha";
import { expect } from "chai";
import { Funko } from "../../src/funkoPop/Funko.js";
import { Gestor } from "../../src/funkoPop/Gestor.js";
import { Generos } from "../../src/funkoPop/Generos.js";
import { Tipos } from "../../src/funkoPop/Tipos.js";

describe("Test de métodos de Gestor + errores", () => {
  it("Se puede crear un usuario + UserList", () => {
    const tamañoLista = Gestor.userList().length;
    Gestor.addUser("UsiarioDePrueba12345");
    expect(Gestor.userList().length).to.be.eql(tamañoLista + 1);
  });
  it("No se puede crear un usuario ya creado", () => {
    expect(() => Gestor.addUser("UsiarioDePrueba12345")).to.be.throw();
  });
  it("Se puede comprobar si un usuario está creado", () => {
    expect(Gestor.checkUserCreated("UsiarioDePrueba12345")).to.be.eql(true);
  });
  it("Se puede crear un funko + FunkoList", () => {
    expect(Gestor.funkoList("UsiarioDePrueba12345").length).to.be.eql(0);
    const funko1 = new Funko(
      1,
      "Goku",
      "El legendario supersaiyan",
      Tipos.Pop,
      Generos.Animacion,
      "Dragon Ball",
      7,
      false,
      undefined,
      13.99
    );
    Gestor.addFunko("UsiarioDePrueba12345", funko1);
    expect(Gestor.funkoList("UsiarioDePrueba12345").length).to.be.eql(1);
  });
  it("No se puede crear un funko con el mismo ID que otro", () => {
    const funko1 = new Funko(
      1,
      "Goku",
      "El legendario supersaiyan",
      Tipos.Pop,
      Generos.Animacion,
      "Dragon Ball",
      7,
      false,
      undefined,
      13.99
    );
    expect(() => Gestor.addFunko("UsiarioDePrueba12345", funko1)).to.be.throw();
  });
  it("No se puede crear un funko a un usuario que no existe", () => {
    const funko1 = new Funko(
      1,
      "Goku",
      "El legendario supersaiyan",
      Tipos.Pop,
      Generos.Animacion,
      "Dragon Ball",
      7,
      false,
      undefined,
      13.99
    );
    expect(() =>
      Gestor.addFunko("FRGBWRNOGHAPROUGHFDSIOUBGLADFSIVBGAPOVDNAOUIB", funko1)
    ).to.be.throw();
  });
  it("Se puede comprobar si un funko está creado", () => {
    expect(Gestor.checkFunkoCreated("UsiarioDePrueba12345", 1)).to.be.eql(true);
  });
  it("Se puede editar un funko + ReadFunko", () => {
    const funkoEdited = new Funko(
      1,
      "Goku",
      "El terrestre",
      Tipos.Pop,
      Generos.Anime,
      "Dragon Ball",
      77,
      false,
      undefined,
      33.99
    );
    Gestor.modFunko("UsiarioDePrueba12345", funkoEdited);
    expect(Gestor.readFunko("UsiarioDePrueba12345", funkoEdited.id)).to.be.eql(
      funkoEdited
    );
  });
  it("No se puede editar un funko que no existe", () => {
    const funko1 = new Funko(
      5,
      "Goku",
      "El legendario supersaiyan",
      Tipos.Pop,
      Generos.Animacion,
      "Dragon Ball",
      7,
      false,
      undefined,
      13.99
    );
    expect(() => Gestor.modFunko("UsiarioDePrueba12345", funko1)).to.be.throw();
  });
  it("No se puede crear un funko a un usuario que no existe", () => {
    const funko1 = new Funko(
      1,
      "Goku",
      "El legendario supersaiyan",
      Tipos.Pop,
      Generos.Animacion,
      "Dragon Ball",
      7,
      false,
      undefined,
      13.99
    );
    expect(() =>
      Gestor.modFunko("FRGBWRNOGHAPROUGHFDSIOUBGLADFSIVBGAPOVDNAOUIB", funko1)
    ).to.be.throw();
  });
  it("No se puede leer un funko que no existe", () => {
    const funko1 = new Funko(
      1,
      "Goku",
      "El legendario supersaiyan",
      Tipos.Pop,
      Generos.Animacion,
      "Dragon Ball",
      7,
      false,
      undefined,
      13.99
    );
    expect(() =>
      Gestor.readFunko(
        "FRGBWRNOGHAPROUGHFDSIOUBGLADFSIVBGAPOVDNAOUIB",
        funko1.id
      )
    ).to.be.throw();
  });
  it("Se puede imprimir la lista de funkos", () => {
    const funkoEdited = new Funko(
      13,
      "Goku",
      "El terrestre",
      Tipos.Pop,
      Generos.Anime,
      "Dragon Ball",
      77,
      false,
      undefined,
      33.99
    );
    Gestor.addFunko("UsiarioDePrueba12345", funkoEdited);
    expect(Gestor.funkoList("UsiarioDePrueba12345")).to.be.eql([
      "1.json",
      "13.json",
    ]);
  });
  it("Se puede eliminar un funko", () => {
    Gestor.deleteFunko("UsiarioDePrueba12345", 1);
    expect(Gestor.funkoList("UsiarioDePrueba12345").length).to.be.eql(1);
    Gestor.deleteFunko("UsiarioDePrueba12345", 13);
    expect(Gestor.funkoList("UsiarioDePrueba12345").length).to.be.eql(0);
  });
  it("No se puede crear un funko que no existe", () => {
    expect(() => Gestor.deleteFunko("UsiarioDePrueba12345", 7)).to.be.throw();
  });
  it("Se puede borrar un usuario", () => {
    const tamañoLista = Gestor.userList().length;
    Gestor.deleteUser("UsiarioDePrueba12345");
    expect(Gestor.userList().length).to.be.eql(tamañoLista - 1);
  });
  it("No se puede borrado un usuario que no existe", () => {
    expect(() => Gestor.deleteUser("UsiarioDePrueba12345")).to.be.throw();
  });
});
