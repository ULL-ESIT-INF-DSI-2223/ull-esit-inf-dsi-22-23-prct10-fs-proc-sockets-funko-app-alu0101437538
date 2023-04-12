import net from 'net';

if (process.argv.length < 3) {
  console.log('Por favor, inserte un comando.');
} else {
  const client = net.connect({port: 64395});

  let argumentos: string[]
  for (let i = 3; i < process.argv.length; ++i) {
    argumentos.push(process.argv[i])
  }
  client.emit('message', JSON.stringify({'command': process.argv[2], 'arg': argumentos}) + '\n');
  client.write(JSON.stringify({'command': process.argv[2], 'arg': argumentos}) + '\n')

  let datos = '';
  client.on('data', (dataChunk) => {
    datos += dataChunk;
  });

  client.on('end', () => {
    const message = JSON.parse(datos.toString());

    if (message.type === 'accept') {
      console.log('El comando se ha ejecutado correctamente.');
    } else {
      console.log(`El mensaje ${message.type} no es válido`);
    }
  });
}



