const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const path = require('path');
const url = require('url');
const initDB = require('./nedb.js');
let mainWindow;
const resourceService = require('./services/resource-service');

function createWindow() {
  // initDB.createDB();
  mainWindow = new BrowserWindow({transparent: true, width: 480, height: 768, icon: './public/images/logo.png'/*, frame: false*/});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Menu.setApplicationMenu(null);
  mainWindow.webContents.openDevTools()
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

ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  mainWindow.close();
})