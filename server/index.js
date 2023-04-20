const WebSocket = require('ws');

// create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// handle WebSocket events
wss.on('connection', ws => {
  console.log('WebSocket client connected');

  // handle message event
  ws.on('message', data => {
    const message = JSON.parse(data);
    console.log(`Received message from ${message.name}: ${message.content}`);
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // handle close event
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});
