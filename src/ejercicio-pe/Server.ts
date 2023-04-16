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
