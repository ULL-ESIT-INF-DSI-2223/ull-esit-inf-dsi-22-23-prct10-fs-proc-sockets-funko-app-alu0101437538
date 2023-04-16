import { spawn } from "child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

yargs(hideBin(process.argv))
  .command(
    "pipeReadFile",
    "Permite leer los datos de un fichero mediante el uso de tuberias",
    {
      file: {
        description: "Nombre del fichero",
        type: "string",
        demandOption: true,
      },
      lines: {
        alias: "l",
        description: "Muestra el número de lineas",
        type: "boolean",
        demandOption: false,
      },
      words: {
        alias: "w",
        description: "Muestra el número de palabras",
        type: "boolean",
        demandOption: false,
      },
      characters: {
        alias: "c",
        description: "Muestra el número de caracteres",
        type: "boolean",
        demandOption: false,
      },
    },
    (argv) => {
      try {
        const opciones = [argv.file];
        if (argv.words) {
          opciones.push("-w");
        }
        if (argv.lines) {
          opciones.push("-l");
        }
        if (argv.characters) {
          opciones.push("-c");
        }
        const wc = spawn("wc", opciones);
        wc.stdout.pipe(process.stdout);
        wc.stderr.pipe(process.stdout);
      } catch (error) {
        console.log(chalk.red(error + "\n"));
      }
    }
  )
  .command(
    "subprocessReadFile",
    "Permite leer los datos de un fichero mediante subprocesos",
    {
      file: {
        description: "Nombre del fichero",
        type: "string",
        demandOption: true,
      },
      lines: {
        alias: "l",
        description: "Muestra el número de lineas",
        type: "boolean",
        demandOption: false,
      },
      words: {
        alias: "w",
        description: "Muestra el número de palabras",
        type: "boolean",
        demandOption: false,
      },
      characters: {
        alias: "c",
        description: "Muestra el número de caracteres",
        type: "boolean",
        demandOption: false,
      },
    },
    (argv) => {
      try {
        const wc = spawn("wc", [argv.file]);

        let wcOutput = "";
        let wcError = "";
        wc.stdout.on("data", (piece) => (wcOutput += piece));
        wc.stderr.on("data", (piece) => (wcError += piece));

        wc.on("close", () => {
          const wcOutputAsArray = wcOutput
            .substring(wcOutput.search(/[0-9]/))
            .split(/\s+/);
          if (wcError === "") {
            console.log(`Fichero: ${argv.file}`);
            if (argv.lines) {
              console.log(`Número de lineas: ${wcOutputAsArray[0]}`);
            }
            if (argv.words) {
              console.log(`Número de palabras: ${wcOutputAsArray[1]}`);
            }
            if (argv.characters) {
              console.log(`Número de caracteres: ${wcOutputAsArray[2]}`);
            }
            if (
              argv.characters === undefined &&
              argv.lines === undefined &&
              argv.words === undefined
            ) {
              console.log(`Número de lineas: ${wcOutputAsArray[0]}`);
              console.log(`Número de palabras: ${wcOutputAsArray[1]}`);
              console.log(`Número de caracteres: ${wcOutputAsArray[2]}`);
            }
          } else {
            console.log(`Fichero ${argv.file} no encontrado`);
          }
        });
      } catch (error) {
        console.log(chalk.red(error + "\n"));
      }
    }
  )
  .help().argv;
