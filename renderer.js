const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

function say_hello() {
  ipcRenderer.send('message', 'lgy');
}

function init() {
  ipcRenderer.on('get', (event, arg) => {
    alert(arg);
  })
}