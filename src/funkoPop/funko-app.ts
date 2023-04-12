import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { Funko } from "./Funko.js";
import { Gestor } from "./Gestor.js";
import { Generos } from "./Generos.js";
import { Tipos } from "./Tipos.js";

const log = console.log;

yargs(hideBin(process.argv))
  .command(
    "addUser",
    "Permite añadir un usuario",
    {
      user: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      try {
        Gestor.addUser(argv.user);
        log(
          chalk.green(
            `En usuario ${argv.user} ha sido añadido correctamente a la base.\n`
          )
        );
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .command(
    "deleteUser",
    "Elimina un usuario",
    {
      user: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      try {
        Gestor.deleteUser(argv.user);
        log(
          chalk.green(
            `En usuario ${argv.user} ha sido eliminado correctamente a la base.\n`
          )
        );
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .command("listUser", "Lista los usuario", {}, () => {
    log(chalk.blue(Gestor.userList().join("\n") + "\n"));
  })
  .command(
    "addFunko",
    "Añade un funko",
    {
      user: {description: "Usuario del Funko",type: "string",demandOption: true},
      id: {description: "ID del Funko",type: "number",demandOption: true},
      name: {description: "Nombre del Funko",type: "string",demandOption: true},
      desc: {description: "Descripción del Funko",type: "string",demandOption: true},
      type: {description: "Tipo del Funko",type: "string",demandOption: true},
      genre: {description: "Género del Funko",type: "string",demandOption: true},
      franchise: {description: "Franquicia del Funko",type: "string",demandOption: true},
      number: {description: "Número del Funko",type: "number",demandOption: true},
      exclusive: {description: "Exclusividad del Funko",type: "boolean",demandOption: true},
      special: {description: "Características Especiales del Funko",type: "string",demandOption: false},
      value: {description: "Valor del Funko",type: "number",demandOption: true},
    },
    (argv) => {
      try {
        const funko = new Funko(
          argv.id,
          argv.name,
          argv.desc,
          argv.type as Tipos,
          argv.genre as Generos,
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.special,
          argv.value
        );
        Gestor.addFunko(argv.user, funko);
        log(
          chalk.green(
            "El funko ha sido correctamente a la coleccicón del usuario " +
              argv.user +
              ".\n"
          )
        );
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .command(
    "modFunko",
    "Modifica un funko",
    {
      user: {description: "Usuario del Funko",type: "string",demandOption: true},
      id: {description: "ID del Funko",type: "number",demandOption: true},
      name: {description: "Nombre del Funko",type: "string",demandOption: true},
      desc: {description: "Descripción del Funko",type: "string",demandOption: true},
      type: {description: "Tipo del Funko",type: "string",demandOption: true},
      genre: {description: "Género del Funko",type: "string",demandOption: true},
      franchise: {description: "Franquicia del Funko",type: "string",demandOption: true},
      number: {description: "Número del Funko",type: "number",demandOption: true},
      exclusive: {description: "Exclusividad del Funko",type: "boolean",demandOption: true},
      special: {description: "Características Especiales del Funko",type: "string",demandOption: false},
      value: {description: "Valor del Funko",type: "number",demandOption: true},
    },
    (argv) => {
      try {
        const funko = new Funko(
          argv.id,
          argv.name,
          argv.desc,
          argv.type as Tipos,
          argv.genre as Generos,
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.special,
          argv.value
        );
        Gestor.modFunko(argv.user, funko);
        log(
          chalk.green(
            "El funko del usuario " + argv.user + " ha sido modificado.\n"
          )
        );
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .command(
    "deleteFunko",
    "Elimina un funko",
    {
      user: {
        description: "Usuario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      try {
        Gestor.deleteFunko(argv.user, argv.id);
        log(
          chalk.green(
            "El funko de id " +
              argv.id +
              " del usuario " +
              argv.user +
              " ha sido eliminado.\n"
          )
        );
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .command(
    "readFunko",
    "Lee un funko",
    {
      user: {
        description: "Usuario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      try {
        Gestor.readFunko(argv.user, argv.id);
        log();
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .command(
    "listFunko",
    "Lista todos los funkos de un usuario",
    {
      user: {
        description: "Usuario del Funko",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      try {
        const list = Gestor.funkoList(argv.user);
        log(chalk.blue("#====================#"));
        for (let i = 0; i < list.length; ++i) {
          Gestor.readFunko(argv.user, parseInt(list[i].replace(".json", "")));
          log(chalk.blue("#====================#"));
        }
        log();
      } catch (error) {
        log(chalk.red(error + "\n"));
      }
    }
  )
  .help().argv
