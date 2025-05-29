const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Новый клиент подключен');
  
  ws.on('message', (message) => {
    // Ретрансляция данных рисования или очистки всем клиентам
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Клиент отключен');
  });
});

console.log('WebSocket сервер запущен на ws://localhost:8080');
