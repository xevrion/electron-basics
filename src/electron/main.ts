import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

app.on("ready", () => {
  // this runs when the app starts and is ready :) so it will run the callBack function..
  const mainWindow = new BrowserWindow({}); // this can be configured such as we can add width, height etc.

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
