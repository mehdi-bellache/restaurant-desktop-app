const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendToKitchen: (orders) => ipcRenderer.invoke("send-to-kitchen", orders),
});
