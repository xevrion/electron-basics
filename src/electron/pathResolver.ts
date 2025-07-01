import path from "path";
import { app } from "electron";
import { isDev } from "./util.js";


export function getPreloadPath(){
    return path.join(
        app.getAppPath(),
        isDev() ? "." : "..",
        '/dist-electron/preload.cjs' // why is it called cjs? electron-builder will compile all the file into a single js.. so we will have another package and use common js..
    )
}