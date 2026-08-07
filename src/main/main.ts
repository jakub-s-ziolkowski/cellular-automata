
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';

const isDev = !app.isPackaged;
const aspectRatio = 16 / 9;

function createWindow() {

    const win = new BrowserWindow({

        width: 1280,
        height: 720,
        minWidth: 800,
        minHeight: 450,
        center: true,
        webPreferences: {

            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.setAspectRatio(aspectRatio);

    let lastValidBounds = win.getBounds();

    win.on("resize", () => {

        if (win.isMaximized() || win.isFullScreen()) {

            lastValidBounds = win.getBounds();
            return;
        }

        const bounds = win.getBounds();
        const ratio = bounds.width / bounds.height;

        if (Math.abs(ratio - aspectRatio) > .01)
            win.setBounds(lastValidBounds);

        else lastValidBounds = bounds;
    });

    if (isDev) {

        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools();
    }

    else {

        win.loadFile(path.join(__dirname, '../../dist-renderer/index.html'));
    }
}

Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin')
        app.quit();
});
