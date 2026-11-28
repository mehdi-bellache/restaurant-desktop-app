const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendToKitchen: () => ipcRenderer.invoke("send-to-kitchen"),
});
