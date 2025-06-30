import { app, BrowserWindow } from 'electron'
import path from 'path'

type test = string;

app.on("ready", () => { // this runs when the app starts and is ready :) so it will run the callBack function..
    const mainWindow = new BrowserWindow({}); // this can be configured such as we can add width, height etc.
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"))
})