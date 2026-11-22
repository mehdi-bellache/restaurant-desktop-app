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
  win = new BrowserWindow();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "kitchenReceipt.html"),
      protocol: "file",
      slashes: true,
    }),
  );
}

app.on("ready", createWindowForKitchenTicket);

// on doit sauvegarder toutes les imprimantes dans une variables.
// mais on est besoin de win pour pouvoir recuperer les info sur les imprimantes

// const contents = win.webContents;

// const options = {
//   silent: true,
//   printBackground: false,
//   deviceName: "kitchen-printer-1",
//   color: false,
// };

// contents
//   .getPrintersAsync()
//   .then((data) => {
//     // data will be an array of printer objects
//     data.forEach((element) => {
//       if (
//         element.name === "cuisine-printer-1" ||
//         element.name === "cuisine-printer-2"
//       ) {
//         contents.print(options, (event) => {
//           console.log(event);
//         });
//       }
//     });
//   })
//   .catch((e) => {
//     console.log("error while tryin to print");
//     // handle error here
//   });

// win.on("closed", () => {
//   win = null;
// });
