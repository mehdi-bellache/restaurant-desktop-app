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
  win.loadFile("index.html");
}

app.on("ready", createWindow);

const options = {
  silent: true,
  printBackground: false,
  deviceName: "Brother_QL_820NWB",
  color: false,
  usePrinterDefaultPageSize: true,
};

ipcMain.handle("send-to-kitchen", async (event, order) => {
  // 1. créer la fenêtre du ticket avec les données de `order`
  const window = createWindowForKitchenTicket();
  // 2. imprimer
  const result = await printKitchenTicket(window);
  // 3. fermer la fenêtre
  window.close();
  // 4. renvoyer { success: true } ou { success: false, error }
  result
    .then(function () {
      return { success: true };
    })
    .catch(function () {
      return { success: false };
    });
});

function createWindowForKitchenTicket() {
  const window = new BrowserWindow({ show: false });
  window.loadFile("kitchenReceipt.html");
  return window;
}

async function printKitchenTicket(window) {
  const contents = window.webContents;

  window.webContents.print(
    options,
    new Promise((resolve, reject) => {
      if (!success) resolve();
      return reject();
    }),
  );
}

win.on("closed", () => {
  win = null;
});
