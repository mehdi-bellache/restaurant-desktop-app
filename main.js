import electron from "electron";
import path from "path";
import url from "url";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

function createWindow() {
  win = new BrowserWindow();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    }),
  );

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);
