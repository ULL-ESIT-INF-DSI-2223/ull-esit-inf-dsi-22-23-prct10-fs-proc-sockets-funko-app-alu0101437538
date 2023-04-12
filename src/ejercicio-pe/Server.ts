import net from 'net';
import {spawn} from 'child_process';


net.createServer((connection) => {
    console.log('Un cliente se ha conectado conectado.');

    let datos = '';
    connection.on('message', (dataChunk) => {
      datos += dataChunk;

      const message = JSON.parse(datos.toString());
      const command = spawn(message.command, message.arg);

      let commandOutput = '';
      command.stdout.on('data', (piece) => commandOutput += piece);

      connection.write(JSON.stringify({'type': 'accept', 'result': commandOutput}) + '\n');
      connection.end()
    });

    connection.on('close', () => {
      console.log('Conexión finalizada.');
      });

  }).listen(64395, () => {
    console.log('Esperando a la conexión de un cliente');
  }
);