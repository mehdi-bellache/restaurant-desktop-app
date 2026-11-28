const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendToKitchen: (order) => ipcRenderer.invoke("send-to-kitchen", order),
});
