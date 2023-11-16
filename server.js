const express = require('express');
const webserver = express()
  .use(express.static('public'))
  .listen(3000, '168.207.112.106', () => console.log(`Listening on ${3000}`));

const { WebSocketServer } = require('ws');
const sockserver = new WebSocketServer({ port: 443 });
// const bannedUsers = [];
sockserver.on('connection', (ws) => {
  console.log('New client connected!');
  sockserver.clients.forEach((client) => {
    client.send(
      JSON.stringify({ username: 'System', text: 'New Client Connected' })
    );
  });
  ws.on('close', () => {
    console.log('Client has disconnected!');
    sockserver.clients.forEach((client) => {
      client.send(
        JSON.stringify({ username: 'System', text: 'New Client Disconnected' })
      );
    });
  });
  ws.on('message', (data) => {
    const dataJson = JSON.parse(data);
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      if (dataJson.username !== 'System') {
        client.send(
          JSON.stringify({ username: dataJson.username, text: dataJson.text })
        );
      }
    });
  });
  ws.onerror = function () {
    console.log('websocket error');
  };
});
