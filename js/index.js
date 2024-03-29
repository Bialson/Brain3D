const { app, BrowserWindow, Menu } = require('electron')
Menu.setApplicationMenu(false);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    icon: './assets/img/icon.ico'
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})