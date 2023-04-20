// establish WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

// DOM elements
const messagesContainer = document.querySelector('#messages');
const nameInput = document.querySelector('#name-input');
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-button');

// handle WebSocket events
socket.addEventListener('open', () => {
  console.log('WebSocket connection established');
});

socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  const { name, content } = message;
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${name}:</strong> ${content}`;
  messagesContainer.appendChild(messageElement);
});

// handle user events
sendButton.addEventListener('click', () => {
  const name = nameInput.value;
  const content = messageInput.value;
  const message = { name, content };
  socket.send(JSON.stringify(message));
  messageInput.value = '';
});

nameInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    messageInput.focus();
  }
});

messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});
