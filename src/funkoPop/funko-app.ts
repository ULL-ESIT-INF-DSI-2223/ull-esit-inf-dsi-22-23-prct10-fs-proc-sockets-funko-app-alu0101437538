import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import net from "net";

import { Funko } from "./Funko.js";
import { Generos } from "./Generos.js";
import { Tipos } from "./Tipos.js";

const log = console.log;
const client = net.connect({ port: 60606 });

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
      client.write(
        JSON.stringify({ command: "addUser", user: argv.user }) + "\n"
      );
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
      client.write(
        JSON.stringify({ command: "deleteUser", user: argv.user }) + "\n"
      );
    }
  )
  .command("listUser", "Lista los usuario", {}, () => {
    client.write(JSON.stringify({ command: "listUser" }) + "\n");
  })
  .command(
    "addFunko",
    "Añade un funko",
    {
      user: {
        description: "Usuario del Funko",
        type: "string",
        demandOption: true,
      },
      id: { description: "ID del Funko", type: "number", demandOption: true },
      name: {
        description: "Nombre del Funko",
        type: "string",
        demandOption: true,
      },
      desc: {
        description: "Descripción del Funko",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Tipo del Funko",
        type: "string",
        demandOption: true,
      },
      genre: {
        description: "Género del Funko",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Franquicia del Funko",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Número del Funko",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Exclusividad del Funko",
        type: "boolean",
        demandOption: true,
      },
      special: {
        description: "Características Especiales del Funko",
        type: "string",
        demandOption: false,
      },
      value: {
        description: "Valor del Funko",
        type: "number",
        demandOption: true,
      },
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
        client.write(
          JSON.stringify({
            command: "addFunko",
            user: argv.user,
            funko: funko,
          }) + "\n"
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
      user: {
        description: "Usuario del Funko",
        type: "string",
        demandOption: true,
      },
      id: { description: "ID del Funko", type: "number", demandOption: true },
      name: {
        description: "Nombre del Funko",
        type: "string",
        demandOption: true,
      },
      desc: {
        description: "Descripción del Funko",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Tipo del Funko",
        type: "string",
        demandOption: true,
      },
      genre: {
        description: "Género del Funko",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Franquicia del Funko",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Número del Funko",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Exclusividad del Funko",
        type: "boolean",
        demandOption: true,
      },
      special: {
        description: "Características Especiales del Funko",
        type: "string",
        demandOption: false,
      },
      value: {
        description: "Valor del Funko",
        type: "number",
        demandOption: true,
      },
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
        client.write(
          JSON.stringify({
            command: "modFunko",
            user: argv.user,
            funko: funko,
          }) + "\n"
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
      client.write(
        JSON.stringify({
          command: "deleteFunko",
          user: argv.user,
          id: argv.id,
        }) + "\n"
      );
    }
  )
  .help().argv;

let datos = "";
client.on("data", (dataChunk) => {
  datos += dataChunk;
});

client.on("end", () => {
  const message = JSON.parse(datos.toString());

  if (message.success) {
    log(chalk.green(message.msg + `\n`));
  } else {
    log(chalk.red((message.msg as Error) + "\n"));
  }
});
