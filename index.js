// const packageController = require('./controllers/packageController');
// const path = require('path')
// let data = {
//   name: 'lgy',
//   version: 'kkk'
// }

// packageController.writePackage(path.join(__dirname,'lgy.json'), data).catch(err => {
//   console.log(err);
// })

const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('message', (event, args) => {
  app.exit(0)
  event.sender.send('get', args);
});