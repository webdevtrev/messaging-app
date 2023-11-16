// console.log('Test')
const webSocket = new WebSocket('ws://168.207.112.106:443/');
webSocket.onmessage = (event) => {
  console.log(event);
  const data = JSON.parse(event.data);
  const div = document.createElement('div');
  div.className = 'message message-from-' + data.username;
  div.innerHTML =
    `<span class='username ${data.username}'>${data.username}</span>: ` +
    data.text +
    '<br/>';
  document.getElementById('messages').append(div);
  div.scrollIntoView();
};
webSocket.addEventListener('open', () => {
  console.log('We are connected');
});
function sendMessage(event) {
  event?.preventDefault();
  var inputMessage = document.getElementById('message');
  var inputUsername = document.getElementById('username');
  console.log(
    JSON.stringify({ username: inputUsername.value, text: inputMessage.value })
  );
  if (inputMessage.value !== '') {
    webSocket.send(
      JSON.stringify({
        username: inputUsername.value,
        text: inputMessage.value,
      })
    );
  }
  inputMessage.value = '';
}
document.getElementById('input-form').addEventListener('submit', sendMessage);

window.addEventListener('keydown', (e) => {
  console.log(e);
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    sendMessage();
  }
});
