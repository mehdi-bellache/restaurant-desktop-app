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
}

app.on("ready", createWindow);

function createWindowForKitchenTicket() {
  win = new BrowserWindow({ show: false });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "kitchenReceipt.html"),
      protocol: "file",
      slashes: true,
    }),
  );
}

function printKitchenTicket() {
  const options = {
    silent: true,
    printBackground: false,
    deviceName: "kitchen-printer-1",
    color: false,
    usePrinterDefaultPageSize: true,
  };

  const contents = win.webContents;

  contents
    .getPrintersAsync()
    .then((printers) => {
      // printers will be an array of printer objects
      printers.forEach((printer) => {
        if (
          printer.name === "cuisine-printer-1" ||
          printer.name === "cuisine-printer-2"
        ) {
          printer.print(options, (success, errorTpe) => {
            if (!success) console.log(errorTpe);
          });
        }
      });
    })
    .catch((e) => {
      console.log("error while trying to print the order");
    });
}

win.on("closed", () => {
  win = null;
});
