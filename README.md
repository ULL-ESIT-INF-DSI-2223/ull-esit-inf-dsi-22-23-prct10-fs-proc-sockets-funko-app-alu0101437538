# ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101437538


# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js
#### Aday Chocho Aisa

## Índice

1. Introducción
2. Ejercicios
    - Ejercicio 1
    - Ejercicio 2
    - Aplicación de FunkoPops
    - Ejercicio PE
3. Conclusiones
4. Referencias bibliográficas

## 1. Introducción
Esta práctica consiste en realizar ejercicios que empleen o utilicen la APIs asíncronas de gestión del sistema de ficheros,  la creación de procesos y la creación de sockets,  siendo uno de los ejercicios el rediseño del ejercicio de funkoPops de la semana pasada. Para ello, se utilizaran distintos modulos como Events, fs, net y child_process. Además, también se recoge en el informe el ejercicio realizado durante la sesión de clase.

En la práctica se debería emplear una metodología TDD, se documenta automáticamente con TypeDoc e incluye flujos de trabajo de GitHub Actions para llevar a cabo las pruebas, para manejar los datos de cubrimiento (Coveralls) y para el análisis de la calidad y seguridad del código (Sonar Cloud), pero por falta de tiempo no se han realizado pruebas.

## 2. Ejercicios
### 2.1. Ejercicio 1
El ejercicio consiste en hacer una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola.

```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
- La traza es la siguiente:
    - La primera función es access, la cual contiene otra función. Entra a la pila de llamadas y manda esta última que pasa al Web Api, el cual lo manda a la cola.
    - Como no hay nada más en la pila de llamadas, se ejecuta la función de dentro de access.
    - Entra a la pila de llamadas y se ejecuta el console.log de "Starting to watch file ficherosTexto/helloworld.txt"
    - Se encuentra el watcher del fichero, el cual pasa a la web API a la espera de un cambio en el fichero.
    - Entra a la pila de llamadas y se ejecuta el console.log de "File ficherosTexto/helloworld.txt is no longer watched"
    - Modificamos el fichero, se activa el manejador watcher y ejecuta el maejador de evento "change". Se manda el código a la cola, y como no hay nada en la pila de llamadas, mueve el código a la pila de llamadas y ejecuta el console.log de "File ficherosTexto/helloworld.txt has been modified somehow".
    - Cada vez que se modifique el ficher helloworld.txt, se repetirá el apartado anterior.

- Access permite comprobar el acceso al fichero o directorio especificado, así como los permisos.
- Constant es un objeto que ofrece constantes relacionadas con fs.

Como resultado, después de las dos modificaciones se ha mostrado lo siguiente por la consola:

```
Starting to watch file ficherosTexto/helloworld.txt
File ficherosTexto/helloworld.txt is no longer watched
File ficherosTexto/helloworld.txt has been modified somehow
File ficherosTexto/helloworld.txt has been modified somehow
File ficherosTexto/helloworld.txt has been modified somehow
File ficherosTexto/helloworld.txt has been modified somehow
```

### 2.2. Ejercicio 2
En este ejercicio había que escribir una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. A ella se le pasan tanto la ruta el fichero como lo que se desee ver (-l/--lines para lineas, -w/--words para las palabras y -c/--characters para caracteres, puediendo combinarse y contando con que si no hay ninguna se mostrarán todas las opciones). El ejercicio había que realizarlo de dos maneras diferentes: Haciendo uso del método pipe de un Stream y sin hacer uso del método pipe (mediante subprocesos). El código es el siguiente

```typescript
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

```

Podemos diferenciar los dos comandos `pipeReadFile` y `subprocessReadFile`, a los cuales se le pasan como parámetros el fichero y tiene las opciones para los datos mostrados (en caso de usar otras opciones no manejadas, el yargs las ignora). Luego de esto, difiere según el método:

- `pipeReadFile`: Se almacenan los argumentos en una variable y se llama con `spawn()` al comando wc con el fichero y los argumentos, y se redirige la salida del spawn a la del proceso haciendo uso de pipe.
- `subprocessReadFile`: Se llama con `spawn()` al comando wc sin argumentos y se almacena la salida del proceso (y los errores) en dos variables (wcOutput y wcError) haciendo uso del evento `data`. Luego, según haya algo en la salida de error o no, se imprime lo deseado según las opciones empleadas o una salida que muestra que el fichero no fue encontrado.


### 2.3. Ejercicio 3 - funkoPop

A partir de lo realizado en la práctica 9, tenemos que reescribir código para que se hagan comunicaciones entre un servidor y un cliente haciendo uso de sockets. El cliente solicitará la información y la enviará al servidor, el cual ofrecerá una respuesta. Se ha conseguido implementar este proceso para casi todos los métodos (a excepción de mostrar y listar funko). Observemos el código del cliente:

```typescript
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
  
  ...

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
  
  ...

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
```

Los principales cambios que se observan es la conexión que se crea a traves del puerto 60606, así como que los comandos ahora solo se dedican a construir un mensaje en formáto JSON (y los funkos si es necesario, aunque se podrían haber pasado los parámetros al servidor y que directamente se construyera en él), el cual se enviará al servidor mediante `write()`. Finalmente observamos los eventos data, que recogen la información que llega y las guarda en una variable, y el evento end que a partir del JSON que llega de vuelta y según el mensaje sea exitoso o no (lo sabremos a partir del parámetro success), imprime el mensaje en verde o rojo.

Ahora mostraremos el código del servidor:

```typescript
import net from "net";
import { Funko } from "./Funko.js";
import { Generos } from "./Generos.js";
import { Gestor } from "./Gestor.js";
import { Tipos } from "./Tipos.js";

net
  .createServer((connection) => {
    console.log("Un cliente se ha conectado conectado.");

    connection.on("data", (datos) => {
      const message = JSON.parse(datos.toString());
      let funko2: Funko = JSON.parse(datos.toString());
      if (message.funko !== undefined) {
        funko2 = new Funko(
          message.funko._id,
          message.funko._nombre,
          message.funko._descripcion,
          message.funko._tipo as Tipos,
          message.funko._genero as Generos,
          message.funko._franquicia,
          message.funko._numero,
          message.funko._exclusivo,
          message.funko._caracteristicaEsp,
          message.funko._valor
        );
      }

      try {
        switch (message.command) {
          case "addUser":
            Gestor.addUser(message.user);
            connection.write(
              JSON.stringify({
                success: true,
                msg: `En usuario ${message.user} ha sido añadido correctamente a la base.`,
              }) + "\n"
            );
            break;
          case "deleteUser":
            Gestor.deleteUser(message.user);
            connection.write(
              JSON.stringify({
                success: true,
                msg: `En usuario ${message.user} ha sido eliminado correctamente a la base.`,
              }) + "\n"
            );
            break;
          case "listUser":
            connection.write(
              JSON.stringify({
                success: true,
                msg: Gestor.userList().join("\n") + "\n",
              }) + "\n"
            );
            break;
          case "addFunko":
            Gestor.addFunko(message.user, funko2);
            connection.write(
              JSON.stringify({
                success: true,
                msg: `El funko del usuario ${message.user} ha sido añadido.`,
              }) + "\n"
            );
            break;
          case "modFunko":
            Gestor.addFunko(message.user, funko2);
            connection.write(
              JSON.stringify({
                success: true,
                msg: `El funko del usuario ${message.user} ha sido modificado.`,
              }) + "\n"
            );
            break;
          case "deleteFunko":
            Gestor.deleteFunko(message.user, message.id);
            connection.write(
              JSON.stringify({
                success: true,
                msg: `El funko con id ${message.id} del usuario ${message.user} ha sido eliminado.`,
              }) + "\n"
            );
            break;
          default:
            break;
        }
        connection.end();
      } catch (error) {
        if (error instanceof Error) {
          connection.write(
            JSON.stringify({ success: false, msg: error.message }) + "\n"
          );
          connection.end();
        }
      }
    });

    connection.on("close", () => {
      console.log("Conexión finalizada.");
    });
  })
  .listen(60606, () => {
    console.log("Esperando a la conexión de un cliente, puerto = 60606");
  });

```

Ek servidor, el cual espera en el puerto 60606, solo muestra por consola las conexiones y desconexiones. Este contiene dos eventos:

- El evento `data`, que al recibir datos primero comprueba si tienen el parámetro funko, para reconstruirlo o no, y a continuación realizará una acción o otra según el parámetro command del JSON recibido. Cada caso se encarga  hacer su labor y reenviar una respuesta exitosa. En caso de cualquier error, el switch está situado dentro de un try que recibirá el error y mandará el mensaje no exitoso con información sobre el error.
- El evento `close` que muestra en la consola que, como se mencionó antes, muestra cuando se termina una conexión.

Comando de ejemplo:

node dist/funkoPop/funko-app.js addFunko --user Aday --id 2 --name "Androide 16" --desc "Androide del Doctor Gero" --type "Pop!" --genre Anime --franchise "Dragon Ball" --number 12 --exclusive no --special "Mueve la cabeza" --value 17.99

### 2.4. Ejercicio PE
En el ejercicio de clase dse debía de hacer un cliente y un servidor, en los que el cliente introduce un comando y se ejecuta en el servidor, devolviendo la salida al cliente. El código del cliente es el siguiente:

```typescript
import net from "net";

if (process.argv.length < 3) {
  console.log("Por favor, inserte un comando.");
} else {
  const client = net.connect({ port: 64395 });

  client.on("connect", () => {
    const argumentos: string[] = [];
    for (let i = 3; i < process.argv.length; ++i) {
      argumentos.push(process.argv[i].toString());
    }
    client.write(
      JSON.stringify({ command: process.argv[2], arg: argumentos }) + "\n"
    );
  });

  let datos = "";
  client.on("data", (dataChunk) => {
    datos += dataChunk;
  });

  client.on("end", () => {
    const message = JSON.parse(datos.toString());

    if (message.type === "accept") {
      console.log("El comando se ha ejecutado correctamente.");
      console.log(message.result);
    } else if (message.type === "error") {
      console.log(`Error: ${message.error}`);
    } else {
      console.log(`El mensaje ${message.type} no es válido`);
    }
  });
}
```

Se observa que lo primero que se hace es comprobrar que hayan tres o más argumentos (el tercero es teóricamente el comando). A partir de eso se busca la conexión en el puerto 64395, en la cual al conectar y mediante el evento `connect`, mete los argumentos en un array y manda el comando y los argumentos en un JSON mediante `write()`. Observamos más abajo dos manejadores de eventos: `data` que va almacenando los datos mientras llegan y `end`, que marca el final parcial del cliente. En este último, según el parámetro type del JSON recibido se maneja la respuesta.

El código del servidor es el siguiente:

```typescript
import net from "net";
import { spawn } from "child_process";

net
  .createServer((connection) => {
    console.log("Un cliente se ha conectado conectado.");

    connection.on("data", (datos) => {
      const message = JSON.parse(datos.toString());
      const comando = spawn(message.command, message.arg);

      comando.stdout.on("data", (data) => {
        connection.write(
          JSON.stringify({ type: "accept", result: data.toString() }) + "\n"
        );
        connection.end();
      });

      comando.stderr.on("error", (data) => {
        connection.write(
          JSON.stringify({ type: "error", result: data.toString() }) + "\n"
        );
        connection.end();
      });
    });

    connection.on("close", () => {
      console.log("Conexión finalizada.");
    });
  })
  .listen(64395, () => {
    console.log("Esperando a la conexión de un cliente, puerto = 64395");
  });
```

Como observamos, escucha en el puerto 64395. El manejador principal del servidor es del evento `data`, el cual al recibir los datos, ejecuta el comando con los argumentos y devuelve la salida del comando (ya sea mediante stdout o stderr) al cliente en un JSON que marca si el comando fue satisfactorio o no, junto al resultado.

## 3. Conclusiones (personales)
El temario que se ha trabajado en esta práctica es un temario complicado. No es nada facil trabajar con procesos asíncronos (además de que apenas los hemos tocado a lo largo de la carrera), pero al final muchas aplicaciones se basan en la comunicación de procesos mediante sockets, por lo que es algo importante que hay que aprender.

Como se observa a lo largo de la práctica, en mi caso ha sido un desastre: Por un lado no hay test, por otro lado hay partes incompletas, etc. Después del desastre de modificación, directamente pensé no entregar esta práctica, pero me lo planteé como un reto y conseguí sacar lo que hay aquí, pero no termino de estar contento. Hubo tiempo para hacerlo, pero la falta de ganas debido a la sobrecarga de trabajo (hay otras tantas cosas que hacer y estudiar) y la complicación del temario han hecho que mi entrega sea precaria. Pero lo hecho, hecho está, yolo me queda seguir aprendiendo para siguientes entregas.

## 4. Referencias bibliográficas
- [Guión de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct10-fs-proc-sockets-funko-app/)
- [Apuntes sobre la API proporcionada por Node.js](https://nodejs.org/docs/latest-v19.x/api/fs.html)
- [Principios Solid](https://ull-esit-inf-dsi-2223.github.io/typescript-theory/typescript-solid.html)

```typescript
```