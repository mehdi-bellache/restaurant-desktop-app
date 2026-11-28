import electron from "electron";
import path from "path";
import url from "url";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  win = new BrowserWindow();
  // to load a local HTML file
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

ipcMain.handle("send-to-kitchen", async () => {
  // 1. créer la fenêtre du ticket avec les données de `order`
  const window = createWindowForKitchenTicket();
  try {
    // 2. imprimer
    const result = await printKitchenTicket(window);
  } catch (e) {
    return { success: false, error: String(e) };
  } finally {
    window.close();
  }
});

async function createWindowForKitchenTicket() {
  const window = new BrowserWindow({ show: false });
  await window.loadFile("kitchenReceipt.html");
  return window;
}

async function printKitchenTicket(window) {
  const contents = window.webContents;

  return new Promise((resolve) => {
    window.webContents.print(options, (success, failureReason) => {
      resolve({ success, error: success ? undefined : failureReason });
    });
  });
}

win.on("closed", () => {
  win = null;
});
