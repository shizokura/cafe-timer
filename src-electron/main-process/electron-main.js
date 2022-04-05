import { app, BrowserWindow, ipcMain } from 'electron'
import axios from 'axios';

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let interval = null;

ipcMain.on('start-time', (event, arg) => 
{
    interval = setInterval(() => 
    {
        axios.post(arg.url, 
        {
            username: arg.username,
            password: arg.password
        })
        .then(res =>
        {
            mainWindow.webContents.send('update-time', res.data);
        });
    }, 
    1000);

    console.log(arg);
});

ipcMain.on('stop-time', (event, arg) => 
{
    clearInterval(interval);
    interval = null;
});