const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
const { setMainMenu } = require('./main-menu.js')
const windows = [];

function sendWindowCount() {
    windows.forEach(win => {
        win.webContents.send('window-count', { count: windows.length });
    })
}

function createBrowserWindow(browserWindowOpts) {
    mainWindow = new BrowserWindow(Object.assign({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    }, browserWindowOpts));
    windows.push(mainWindow)
    mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
    setMainMenu(mainWindow);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.webContents.openDevTools();
    mainWindow.on('close', () => {
        windows.splice(windows.indexOf(mainWindow), 1);
        sendWindowCount();
    })
}

app.on('ready', () => {
    createBrowserWindow();
    ipcMain.on('create-window', (event, props) => createBrowserWindow(props));
    ipcMain.on('get-window-count', sendWindowCount);
})