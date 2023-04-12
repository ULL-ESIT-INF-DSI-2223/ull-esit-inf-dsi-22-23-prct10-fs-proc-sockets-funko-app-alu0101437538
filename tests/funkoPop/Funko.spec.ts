import "mocha";
import { expect } from "chai";
import { Funko } from "../../src/funkoPop/Funko.js";
import { Generos } from "../../src/funkoPop/Generos.js";
import { Tipos } from "../../src/funkoPop/Tipos.js";

describe("Test de instanciación y métodos", () => {
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
  const funko2 = new Funko(
    2,
    "Androide 16",
    "Androide del Doctor Gero",
    Tipos.Pop,
    Generos.Animacion,
    "Dragon Ball",
    12,
    false,
    "Mueve la cabeza",
    17.99
  );
  it("Se instancia la clase correctamente", () => {
    expect(funko1).to.be.instanceOf(Funko);
  });
  it("Existen getters y setters para el atributo del ID", () => {
    funko2.id = 1;
    expect(funko2.id).to.be.eql(1);
  });
  it("Existen getters y setters para el atributo del nombre", () => {
    funko2.nombre = "Gohan";
    expect(funko2.nombre).to.be.eql("Gohan");
  });
  it("Existen getters y setters para el atributo de la descripcion", () => {
    funko2.descripcion = "El hijo de Goku";
    expect(funko2.descripcion).to.be.eql("El hijo de Goku");
  });
  it("Existen getters y setters para el atributo del tipo", () => {
    funko2.tipo = Tipos.VinylSoda;
    expect(funko2.tipo).to.be.eql(Tipos.VinylSoda);
  });
  it("Existen getters y setters para el atributo del genero", () => {
    funko2.genero = Generos.Videojuegos;
    expect(funko2.genero).to.be.eql(Generos.Videojuegos);
  });
  it("Existen getters y setters para el atributo de la franquicia", () => {
    funko2.franquicia = "Dragon Ball Xenoverse";
    expect(funko2.franquicia).to.be.eql("Dragon Ball Xenoverse");
  });
  it("Existen getters y setters para el atributo del número del funko", () => {
    funko2.numero = 2;
    expect(funko2.numero).to.be.eql(2);
  });
  it("Existen getters y setters para el atributo de la exclusividad", () => {
    funko2.exclusivo = true;
    expect(funko2.exclusivo).to.be.eql(true);
  });
  it("Existen getters y setters para el atributo de la característica especial", () => {
    funko2.caracteristicasEsp = "Brilla";
    expect(funko2.caracteristicasEsp).to.be.eql("Brilla");
  });
  it("Existen getters y setters para el atributo del precio o valor", () => {
    funko2.valor = 26.99;
    expect(funko2.valor).to.be.eql(26.99);
  });
  it("Existen un método para imprimir el funko", () => {
    expect(funko1.print()).to.be.eql(
      "ID = 1\nNombre = Goku\nDescripción = El legendario supersaiyan\nTipo = Pop!\nGénero = Animacion\nFranquicia = Dragon Ball\nNúmero de colección = 7\n¿Exlusivo? = false\nValor = 13.99"
    );
    expect(
      new Funko(
        1,
        "Goku",
        "El legendario supersaiyan",
        Tipos.Pop,
        Generos.Animacion,
        "Dragon Ball",
        7,
        false,
        undefined,
        17.99
      ).print()
    ).to.be.eql(
      "ID = 1\nNombre = Goku\nDescripción = El legendario supersaiyan\nTipo = Pop!\nGénero = Animacion\nFranquicia = Dragon Ball\nNúmero de colección = 7\n¿Exlusivo? = false\nValor = 17.99"
    );
    expect(
      new Funko(
        1,
        "Goku",
        "El legendario supersaiyan",
        Tipos.Pop,
        Generos.Animacion,
        "Dragon Ball",
        7,
        false,
        undefined,
        34.99
      ).print()
    ).to.be.eql(
      "ID = 1\nNombre = Goku\nDescripción = El legendario supersaiyan\nTipo = Pop!\nGénero = Animacion\nFranquicia = Dragon Ball\nNúmero de colección = 7\n¿Exlusivo? = false\nValor = 34.99"
    );
    expect(
      new Funko(
        1,
        "Goku",
        "El legendario supersaiyan",
        Tipos.Pop,
        Generos.Animacion,
        "Dragon Ball",
        7,
        false,
        "De Oro",
        70.99
      ).print()
    ).to.be.eql(
      "ID = 1\nNombre = Goku\nDescripción = El legendario supersaiyan\nTipo = Pop!\nGénero = Animacion\nFranquicia = Dragon Ball\nNúmero de colección = 7\n¿Exlusivo? = false\nCaracterísticas Especiales = De Oro\nValor = 70.99"
    );
  });
});

describe("Test frente a errores de Funko", () => {
  const errorVar: any = undefined;
  const funko2 = new Funko(
    2,
    "Androide 16",
    "Androide del Doctor Gero",
    Tipos.Pop,
    Generos.Animacion,
    "Dragon Ball",
    12,
    false,
    "Mueve la cabeza",
    17.99
  );
  it("Se esperan errores cuando se pasan un ID erroneo al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          -2,
          "Goku",
          "El legendario supersaiyan",
          Tipos.Pop,
          Generos.Animacion,
          "Dragon Ball",
          7,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.id = 1.5)).to.throw();
  });
  it("Se esperan errores cuando se pasan un nombre erroneo al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          errorVar,
          "El legendario supersaiyan",
          Tipos.Pop,
          Generos.Animacion,
          "Dragon Ball",
          7,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.nombre = errorVar)).to.throw();
  });
  it("Se esperan errores cuando se pasan una descripcion erronea al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          errorVar,
          Tipos.Pop,
          Generos.Animacion,
          "Dragon Ball",
          7,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.descripcion = errorVar)).to.throw();
  });
  it("Se esperan errores cuando se pasan un tipo erroneo al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          "El legendario supersaiyan",
          errorVar,
          Generos.Animacion,
          "Dragon Ball",
          7,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.tipo = errorVar)).to.throw();
  });
  it("Se esperan errores cuando se pasan un género erroneo al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          "El legendario supersaiyan",
          Tipos.Pop,
          errorVar,
          "Dragon Ball",
          7,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.genero = errorVar)).to.throw();
  });
  it("Se esperan errores cuando se pasan una franquicia erronea al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          "El legendario supersaiyan",
          Tipos.Pop,
          Generos.Animacion,
          errorVar,
          7,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.franquicia = errorVar)).to.throw();
  });
  it("Se esperan errores cuando se pasan un número erroneo al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          "El legendario supersaiyan",
          Tipos.Pop,
          Generos.Animacion,
          "Dragon Ball",
          7.3,
          false,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.numero = -3)).to.throw();
  });
  it("Se esperan errores cuando se pasan una condición de exclusividad erronea al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          "El legendario supersaiyan",
          Tipos.Pop,
          Generos.Animacion,
          "Dragon Ball",
          7,
          errorVar,
          undefined,
          1399
        )
    ).to.throw();
    expect(() => (funko2.exclusivo = errorVar)).to.throw();
  });
  it("Se esperan errores cuando se pasan un valor erroneo al constructor o a traves del setter", () => {
    expect(
      () =>
        new Funko(
          2,
          "Goku",
          "El legendario supersaiyan",
          Tipos.Pop,
          Generos.Animacion,
          "Dragon Ball",
          7,
          false,
          undefined,
          -7.86
        )
    ).to.throw();
    expect(() => (funko2.valor = errorVar)).to.throw();
  });
});
