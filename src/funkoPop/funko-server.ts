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
